import { site } from '../config/site'

// Field definitions and wording for the site's two forms (rendered by EnquiryForm.vue).
// Both forms send through WhatsApp (services/contact.js), so the wording says so.
// type: text | email | tel | date | number | select | textarea
// waLabel: optional label used in the WhatsApp message instead of the on-screen label
const shared = {
  summary: 'Please fix the following before sending:',
  name: { id: 'name', type: 'text', autocomplete: 'name', required: true, label: 'Name', messages: { required: 'Enter your name.' } },
  email: {
    id: 'email', type: 'email', autocomplete: 'email', required: true, label: 'Email',
    messages: { required: 'Enter your email address.', invalid: 'Enter an email address like name@example.com.' },
  },
}

export const contactForm = {
  summary: shared.summary,
  submit: 'Send message',
  note: 'Opens WhatsApp with your message ready. Just tap send.',
  success: "WhatsApp has opened with your message. Tap send there and we'll get back to you within one business day.",
  retryLead: "WhatsApp didn't open?",
  retry: 'Open WhatsApp',
  error: `Couldn't open WhatsApp. Try again, or call us on ${site.phone}.`,
  fields: [
    shared.name,
    shared.email,
    { id: 'phone', type: 'tel', autocomplete: 'tel', label: 'Phone (optional)', messages: { invalid: 'Enter a phone number using digits, spaces or +.' } },
    {
      id: 'message', type: 'textarea', required: true, minLength: 10, label: 'Message',
      messages: { required: 'Enter a message.', short: 'Your message needs at least 10 characters.' },
    },
  ],
}

export const cateringForm = {
  summary: shared.summary,
  submit: 'Send enquiry',
  note: 'Opens WhatsApp with your enquiry ready. Just tap send.',
  success: "WhatsApp has opened with your enquiry. Tap send there and we'll get back to you with a quote within one business day.",
  retryLead: "WhatsApp didn't open?",
  retry: 'Open WhatsApp',
  error: `Couldn't open WhatsApp. Try again, or call us on ${site.phone}.`,
  fields: [
    shared.name,
    {
      id: 'phone', type: 'tel', autocomplete: 'tel', required: true, label: 'Phone',
      messages: { required: 'Enter a phone number so we can call you back.', invalid: 'Enter a phone number using digits, spaces or +.' },
    },
    shared.email,
    {
      id: 'date', type: 'date', required: true, minDays: 1, label: 'Event date', half: true,
      messages: { required: 'Choose the date of your event.', invalid: 'Choose a date from tomorrow onwards.' },
    },
    {
      id: 'guests', type: 'number', required: true, min: 1, label: 'Number of guests', half: true,
      messages: { required: 'Enter roughly how many people.', invalid: 'Enter a whole number, like 25.' },
    },
    {
      id: 'service', type: 'select', label: 'Pickup or delivery', options: ['Pickup', 'Delivery', 'Not sure yet'],
    },
    {
      id: 'details', type: 'textarea', required: true, minLength: 10, label: 'What would you like?', waLabel: 'Order details',
      hint: 'Dishes, dietary needs, spice level, budget, anything that helps us quote.',
      messages: { required: 'Tell us a little about what you need.', short: 'Add a few more details (at least 10 characters).' },
    },
  ],
}
