import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { sendAutoResponseEmail, sendAdminNotificationEmail } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  inquiryPurpose: z.enum(['business', 'partnership', 'speaking', 'church-community', 'personal', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
  website: z.string().optional(), // Honeypot field
})

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  
  if (!secretKey) {
    console.error('❌ RECAPTCHA_SECRET_KEY not configured')
    return false
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    
    console.log('🔒 reCAPTCHA verification:', {
      success: data.success,
      score: data.score,
      action: data.action,
    })

    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // Increased threshold to 0.7 for stricter bot detection
    return data.success && data.score >= 0.7
  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error)
    return false
  }
}

// Additional bot detection: Check for spam patterns
function detectSpamPatterns(data: {
  name: string
  email: string
  message: string
  company?: string
}): { isSpam: boolean; reason?: string } {
  // Check for random character patterns (like "GGROvpcJAUpoDyOvIxKwd")
  const randomPattern = /^[A-Za-z]{15,}$/
  if (randomPattern.test(data.name.replace(/\s/g, ''))) {
    return { isSpam: true, reason: 'Random character name detected' }
  }

  // Check for gibberish in message (consecutive random letters)
  const gibberishPattern = /[A-Z]{10,}|[a-z]{15,}/
  if (gibberishPattern.test(data.message.replace(/\s/g, ''))) {
    return { isSpam: true, reason: 'Gibberish message detected' }
  }

  // Check for common spam email domains
  const spamDomains = ['naturalretreats.com', 'baxterautoparts.com']
  const emailDomain = data.email.split('@')[1]?.toLowerCase()
  if (emailDomain && spamDomains.includes(emailDomain)) {
    return { isSpam: true, reason: `Known spam domain: ${emailDomain}` }
  }

  // Check if company name is also random characters
  if (data.company && randomPattern.test(data.company.replace(/\s/g, ''))) {
    return { isSpam: true, reason: 'Random character company name detected' }
  }

  // Check for very short messages with random characters
  if (data.message.length < 30 && /^[A-Za-z]{10,}$/.test(data.message.replace(/\s/g, ''))) {
    return { isSpam: true, reason: 'Short random message detected' }
  }

  return { isSpam: false }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Check honeypot field - if filled, it's a bot
    if (validatedData.website && validatedData.website.trim() !== '') {
      console.log('🍯 HONEYPOT TRIGGERED - Bot filled hidden field:', validatedData.website)
      return NextResponse.json(
        { error: 'Invalid submission.' },
        { status: 403 }
      )
    }

    // Verify reCAPTCHA token
    const isHuman = await verifyRecaptcha(validatedData.recaptchaToken)
    
    if (!isHuman) {
      console.log('🤖 BOT DETECTED (reCAPTCHA) - Form submission blocked')
      return NextResponse.json(
        { error: 'Bot detection failed. Please try again.' },
        { status: 403 }
      )
    }

    // Additional spam pattern detection
    const spamCheck = detectSpamPatterns({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      company: validatedData.company,
    })

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED:', spamCheck.reason)
      console.log('Blocked submission:', {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        message: validatedData.message.substring(0, 50),
      })
      return NextResponse.json(
        { error: 'Your submission appears to be spam. Please contact us directly if this is an error.' },
        { status: 403 }
      )
    }

    // Log to console for monitoring
    console.log('📧 FORM SUBMISSION RECEIVED (✅ Human verified + Spam check passed):')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Name:', validatedData.name)
    console.log('Email:', validatedData.email)
    console.log('Phone:', validatedData.phone || 'N/A')
    console.log('Company:', validatedData.company || 'N/A')
    console.log('Purpose:', validatedData.inquiryPurpose)
    console.log('Message:', validatedData.message)
    console.log('Time:', new Date().toLocaleString())

    // Save to database (exclude recaptchaToken and honeypot)
    const { recaptchaToken, website, ...dataToSave } = validatedData
    const submission = await prisma.contactSubmission.create({
      data: {
        name: dataToSave.name,
        email: dataToSave.email,
        phone: dataToSave.phone || null,
        company: dataToSave.company || null,
        inquiryPurpose: dataToSave.inquiryPurpose,
        message: dataToSave.message,
      },
    })

    console.log('✅ Saved to database with ID:', submission.id)

    // Send auto-response email to the submitter
    try {
      await sendAutoResponseEmail(dataToSave)
      console.log('✅ Auto-response email sent to:', dataToSave.email)
    } catch (emailError) {
      console.error('⚠️  Failed to send auto-response email:', emailError)
      // Continue even if email fails - we still saved to DB
    }

    // Send notification email to admin
    try {
      await sendAdminNotificationEmail(dataToSave)
      console.log('✅ Admin notification email sent to:', process.env.ADMIN_EMAIL)
    } catch (emailError) {
      console.error('⚠️  Failed to send admin notification email:', emailError)
      // Continue even if email fails - we still saved to DB
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received. Check your email for confirmation.',
        id: submission.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process your request. Please try again or contact me directly.' },
      { status: 500 }
    )
  }
}

