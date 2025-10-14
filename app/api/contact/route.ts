import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactFormSchema.parse(body)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@brettwhite.io>',
      to: ['hello@brettwhite.io'],
      replyTo: validatedData.email,
      subject: `Contact Form: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br />')}</p>
      `,
      text: `
New Contact Form Submission

From: ${validatedData.name} (${validatedData.email})
Subject: ${validatedData.subject}

Message:
${validatedData.message}
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
