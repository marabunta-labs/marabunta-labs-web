'use server'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function subscribeToKit(formData: FormData) {
  const email = formData.get('email')

  if (!email || typeof email !== 'string') {
    return { success: false, message: 'Email is required.' }
  }

  const trimmedEmail = email.trim().toLowerCase()

  if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 254) {
    return { success: false, message: 'Invalid email address.' }
  }

  const apiKey = process.env.KIT_API_KEY
  const formId = process.env.KIT_FORM_ID

  if (!apiKey || !formId) {
    console.error('Missing KIT_API_KEY or KIT_FORM_ID environment variables')
    return { success: false, message: 'Server configuration error.' }
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        email: trimmedEmail,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Kit API error:', data)
      return { success: false, message: 'Subscription failed. Please try again.' }
    }

    return { success: true, message: 'Subscribed! Check your email to confirm.' }
  } catch (error) {
    console.error('Kit connection error:', error)
    return { success: false, message: 'Connection error. Please try again.' }
  }
}