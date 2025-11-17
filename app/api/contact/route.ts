import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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

    // FOR TESTING: Just log to console
    console.log('📧 FORM SUBMISSION RECEIVED:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Name:', validatedData.name)
    console.log('Email:', validatedData.email)
    console.log('Phone:', validatedData.phone || 'N/A')
    console.log('Company:', validatedData.company || 'N/A')
    console.log('Purpose:', validatedData.inquiryPurpose)
    console.log('Message:', validatedData.message)
    console.log('Time:', new Date().toLocaleString())
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ Form submission successful (TEST MODE - not saved to database)')

    return NextResponse.json(
      { 
        success: true, 
        message: 'Test mode: Form received! Check your terminal/console for details.',
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
      { error: 'Failed to process your request.' },
      { status: 500 }
    )
  }
}

