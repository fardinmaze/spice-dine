import { site } from '../config/site'

// Field definitions and wording for the site's two forms (rendered by EnquiryForm.vue).
// type: text | email | tel | date | number | select | textarea
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
  success: "Message sent. We'll reply within one business day.",
  error: `Couldn't send your message. Check your connection and try again, or call us on ${site.phone}.`,
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
  success: "Thanks! We've got your catering enquiry and will call or email you within one business day.",
  error: `Couldn't send your enquiry. Check your connection and try again, or call us on ${site.phone}.`,
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
      id: 'details', type: 'textarea', required: true, minLength: 10, label: 'What would you like?',
      hint: 'Dishes, dietary needs, spice level, budget, anything that helps us quote.',
      messages: { required: 'Tell us a little about what you need.', short: 'Add a few more details (at least 10 characters).' },
    },
  ],
}
