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
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Log to console for monitoring
    console.log('📧 FORM SUBMISSION RECEIVED:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Name:', validatedData.name)
    console.log('Email:', validatedData.email)
    console.log('Phone:', validatedData.phone || 'N/A')
    console.log('Company:', validatedData.company || 'N/A')
    console.log('Purpose:', validatedData.inquiryPurpose)
    console.log('Message:', validatedData.message)
    console.log('Time:', new Date().toLocaleString())

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        inquiryPurpose: validatedData.inquiryPurpose,
        message: validatedData.message,
      },
    })

    console.log('✅ Saved to database with ID:', submission.id)

    // Send auto-response email to the submitter
    try {
      await sendAutoResponseEmail(validatedData)
      console.log('✅ Auto-response email sent to:', validatedData.email)
    } catch (emailError) {
      console.error('⚠️  Failed to send auto-response email:', emailError)
      // Continue even if email fails - we still saved to DB
    }

    // Send notification email to admin
    try {
      await sendAdminNotificationEmail(validatedData)
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

