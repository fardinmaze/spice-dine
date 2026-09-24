<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import { sendContactMessage } from '../../services/contact'
import { copy } from '../../data/copy'

const f = copy.contact.form
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s()-]{5,}$/

const fields = [
  { id: 'name', type: 'text', autocomplete: 'name', required: true },
  { id: 'email', type: 'email', autocomplete: 'email', required: true },
  { id: 'phone', type: 'tel', autocomplete: 'tel', required: false },
  { id: 'message', type: 'textarea', required: true },
]

const values = reactive({ name: '', email: '', phone: '', message: '' })
const errors = reactive({})
const touched = reactive({})
const status = ref('idle') // idle | invalid | loading | success | error
const summary = ref(null)
const done = ref(null)

function validate(id) {
  const v = values[id].trim()
  const msgs = f.fields[id]
  let error = ''
  if (id === 'name' && !v) error = msgs.required
  if (id === 'email') error = !v ? msgs.required : !EMAIL.test(v) ? msgs.invalid : ''
  if (id === 'phone' && v && !PHONE.test(v)) error = msgs.invalid
  if (id === 'message') error = !v ? msgs.required : v.length < 10 ? msgs.short : ''
  errors[id] = error
  return !error
}

function onBlur(id) {
  touched[id] = true
  validate(id)
}

function onInput(id) {
  if (touched[id]) validate(id)
}

const errorList = computed(() => fields.filter((field) => errors[field.id]))

async function submit() {
  fields.forEach((field) => (touched[field.id] = true))
  const valid = fields.map((field) => validate(field.id)).every(Boolean)

  if (!valid) {
    status.value = 'invalid'
    await nextTick()
    summary.value?.focus()
    return
  }

  status.value = 'loading'
  try {
    await sendContactMessage({ ...values })
    status.value = 'success'
    await nextTick()
    done.value?.focus()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="contact-form">
    <div v-if="status === 'success'" ref="done" class="contact-form__done" tabindex="-1" role="status">
      <p>{{ f.success }}</p>
    </div>

    <form v-else novalidate @submit.prevent="submit">
      <div v-if="status === 'invalid' && errorList.length" ref="summary" class="contact-form__summary" tabindex="-1" role="alert">
        <p>{{ f.summary }}</p>
        <ul>
          <li v-for="field in errorList" :key="field.id">
            <a :href="`#cf-${field.id}`">{{ errors[field.id] }}</a>
          </li>
        </ul>
      </div>

      <div v-for="field in fields" :key="field.id" class="field" :class="{ 'has-error': errors[field.id] }">
        <label :for="`cf-${field.id}`">{{ f.fields[field.id].label }}</label>
        <component
          :is="field.type === 'textarea' ? 'textarea' : 'input'"
          :id="`cf-${field.id}`"
          v-model="values[field.id]"
          :name="field.id"
          :type="field.type === 'textarea' ? undefined : field.type"
          :rows="field.type === 'textarea' ? 6 : undefined"
          :autocomplete="field.autocomplete"
          :required="field.required || undefined"
          :aria-invalid="errors[field.id] ? 'true' : undefined"
          :aria-describedby="errors[field.id] ? `cf-${field.id}-error` : undefined"
          @blur="onBlur(field.id)"
          @input="onInput(field.id)"
        />
        <p v-if="errors[field.id]" :id="`cf-${field.id}-error`" class="field__error">{{ errors[field.id] }}</p>
      </div>

      <p v-if="status === 'error'" class="contact-form__error" role="alert">{{ f.error }}</p>

      <BaseButton :label="f.submit" type="submit" icon="arrow" size="lg" :loading="status === 'loading'" />
    </form>
  </div>
</template>

<style scoped>
form {
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}

.field {
  display: grid;
  gap: var(--space-2);
  width: 100%;
}

label {
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  min-height: 52px;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--c-muted);
  border-radius: var(--radius-sm);
  background: var(--surface);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}

textarea {
  resize: vertical;
  min-height: 9rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--action);
  box-shadow: 0 0 0 3px var(--c-royal-50);
}

.has-error input,
.has-error textarea {
  border-color: var(--action);
}

.field__error {
  display: flex;
  gap: var(--space-2);
  color: var(--action);
  font-size: var(--fs-small);
  font-weight: 600;
}

.field__error::before {
  content: '!';
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  border-radius: 50%;
  background: var(--action);
  color: var(--text-on-brand);
  font-size: 0.75rem;
}

.contact-form__summary,
.contact-form__error {
  width: 100%;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  border-left: 4px solid var(--action);
}

.contact-form__summary p {
  font-weight: 700;
}

.contact-form__summary ul {
  margin: var(--space-2) 0 0;
  padding-left: 1.25rem;
}

.contact-form__summary a {
  color: var(--action);
  font-weight: 600;
}

.contact-form__error {
  font-weight: 600;
}

.contact-form__done {
  padding: var(--space-8);
  border-radius: var(--radius-card);
  background: var(--surface-soft);
  font-size: var(--fs-h3);
  font-weight: 600;
}
</style>
