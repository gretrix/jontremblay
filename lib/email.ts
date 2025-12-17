import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  inquiryPurpose: string
  message: string
}

export async function sendAutoResponseEmail(formData: ContactFormData) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: formData.email,
    subject: 'Thank You for Reaching Out - Jonathan Tremblay',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          .signature { margin-top: 30px; font-style: italic; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out!</h1>
          </div>
          <div class="content">
            <p>Hi ${formData.name},</p>
            
            <p>Thank you for taking the time to reach out to me through my website. I've received your message and wanted to confirm that it's arrived safely.</p>
            
            <p>I appreciate your interest in connecting, and I'll review your message carefully. You can expect to hear back from me within 1-2 business days.</p>
            
            <p>In the meantime, if you have any urgent matters or additional information to share, feel free to reply directly to this email or call me at <strong>404-374-9322</strong>.</p>
            
            <div class="signature">
              <p><strong>"Build things that matter. Build people who grow. Honor God in everything."</strong></p>
              <p>— Jonathan Tremblay</p>
            </div>
          </div>
          <div class="footer">
            <p>Jonathan Tremblay<br>
            Entrepreneur, Technologist & Faith-Driven Leader<br>
            <a href="mailto:jtremblay@jontremblay.com">jtremblay@jontremblay.com</a> | 404-374-9322</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendAdminNotificationEmail(formData: ContactFormData) {
  const inquiryPurposeLabels: Record<string, string> = {
    business: 'Business',
    partnership: 'Partnership',
    speaking: 'Speaking',
    'church-community': 'Church/Community',
    personal: 'Personal',
    other: 'Other',
  }

  // Get site name from environment variable or use domain
  const siteName = process.env.SITE_NAME || 'JonathanTremblay.com'

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `[${siteName}] New Contact Form - ${formData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #667eea; }
          .message-box { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Contact Form Submission</h2>
            <p style="margin: 10px 0 0 0; font-size: 18px; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px;">
              📍 From: <strong>${siteName}</strong>
            </p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            
            ${formData.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
            </div>
            ` : ''}
            
            ${formData.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${formData.company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Inquiry Purpose:</div>
              <div class="value">${inquiryPurposeLabels[formData.inquiryPurpose] || formData.inquiryPurpose}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
              This submission was received on ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}

