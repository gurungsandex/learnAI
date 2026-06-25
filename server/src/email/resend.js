const RESEND_API_URL = 'https://api.resend.com/emails'

// Reset link points at the frontend's reset page, which collects the new
// password and calls POST /auth/password-reset/confirm with this token.
export async function sendPasswordResetEmail(toEmail, rawToken) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  const appUrl = process.env.APP_URL

  if (!apiKey || !from || !appUrl) {
    console.warn('Password reset email not sent: RESEND_API_KEY/EMAIL_FROM/APP_URL not configured')
    return
  }

  const resetUrl = `${appUrl}/reset-password?token=${rawToken}`
  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: toEmail,
      subject: 'Reset your LearnAI password',
      html: `<p>We received a request to reset your LearnAI password.</p>
             <p><a href="${resetUrl}">Click here to choose a new password</a>. This link expires in 1 hour.</p>
             <p>If you didn't request this, you can safely ignore this email.</p>`,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(`Resend API error: ${res.status} ${text}`)
  }
}
