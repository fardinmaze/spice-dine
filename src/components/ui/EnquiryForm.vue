<script setup>
import { computed, nextTick, reactive, ref, useId } from 'vue'
import BaseButton from './BaseButton.vue'
import { site } from '../../config/site'
import { dateIn } from '../../utils/hours'

// Generic validated form: labels always visible, validation on blur and submit,
// error summary focused on a failed submit, then loading → success | error.
const props = defineProps({
  form: { type: Object, required: true }, // { fields, summary, submit, success, error } from data/forms.js
  send: { type: Function, required: true }, // async (payload) => void, throws on failure
})
const emit = defineEmits(['sent'])

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s()-]{5,}$/

const uid = useId()
const fieldId = (field) => `${uid}-${field.id}`
const fields = props.form.fields

const minDate = (field) => (field.minDays != null ? dateIn(site.timezone, field.minDays) : undefined)

const values = reactive(Object.fromEntries(fields.map((f) => [f.id, f.type === 'select' ? f.options[0] : ''])))
const errors = reactive({})
const touched = reactive({})
const status = ref('idle') // idle | invalid | loading | success | error
const summary = ref(null)
const done = ref(null)

function check(field) {
  const v = String(values[field.id] ?? '').trim()
  const m = field.messages ?? {}
  if (!v) return field.required ? m.required : ''
  if (field.type === 'email' && !EMAIL.test(v)) return m.invalid
  if (field.type === 'tel' && !PHONE.test(v)) return m.invalid
  if (field.type === 'number' && !(/^\d+$/.test(v) && Number(v) >= (field.min ?? 0))) return m.invalid
  if (field.type === 'date' && field.minDays != null && v < minDate(field)) return m.invalid
  if (field.minLength && v.length < field.minLength) return m.short
  return ''
}

function validate(field) {
  errors[field.id] = check(field)
  return !errors[field.id]
}

function onBlur(field) {
  touched[field.id] = true
  validate(field)
}

function onInput(field) {
  if (touched[field.id]) validate(field)
}

const errorList = computed(() => fields.filter((field) => errors[field.id]))

function describedBy(field) {
  const ids = []
  if (field.hint) ids.push(`${fieldId(field)}-hint`)
  if (errors[field.id]) ids.push(`${fieldId(field)}-error`)
  return ids.join(' ') || undefined
}

function focusField(field) {
  document.getElementById(fieldId(field))?.focus()
}

async function submit() {
  fields.forEach((field) => (touched[field.id] = true))
  const valid = fields.map(validate).every(Boolean)

  if (!valid) {
    status.value = 'invalid'
    await nextTick()
    summary.value?.focus()
    return
  }

  status.value = 'loading'
  try {
    await props.send({ ...values })
    status.value = 'success'
    emit('sent')
    await nextTick()
    done.value?.focus()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="enquiry">
    <div v-if="status === 'success'" ref="done" class="enquiry__done" tabindex="-1" role="status">
      <p>{{ form.success }}</p>
      <slot name="done" />
    </div>

    <form v-else novalidate @submit.prevent="submit">
      <div v-if="status === 'invalid' && errorList.length" ref="summary" class="enquiry__summary" tabindex="-1" role="alert">
        <p>{{ form.summary }}</p>
        <ul>
          <li v-for="field in errorList" :key="field.id">
            <a :href="`#${fieldId(field)}`" @click.prevent="focusField(field)">{{ errors[field.id] }}</a>
          </li>
        </ul>
      </div>

      <div class="enquiry__fields">
        <div v-for="field in fields" :key="field.id" class="field" :class="{ 'has-error': errors[field.id], 'field--half': field.half }">
          <label :for="fieldId(field)">{{ field.label }}</label>
          <p v-if="field.hint" :id="`${fieldId(field)}-hint`" class="field__hint">{{ field.hint }}</p>

          <select
            v-if="field.type === 'select'"
            :id="fieldId(field)"
            v-model="values[field.id]"
            :name="field.id"
          >
            <option v-for="option in field.options" :key="option">{{ option }}</option>
          </select>
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="fieldId(field)"
            v-model="values[field.id]"
            :name="field.id"
            rows="5"
            :required="field.required || undefined"
            :aria-invalid="errors[field.id] ? 'true' : undefined"
            :aria-describedby="describedBy(field)"
            @blur="onBlur(field)"
            @input="onInput(field)"
          />
          <input
            v-else
            :id="fieldId(field)"
            v-model="values[field.id]"
            :name="field.id"
            :type="field.type"
            :autocomplete="field.autocomplete"
            :inputmode="field.type === 'number' ? 'numeric' : undefined"
            :min="field.type === 'date' ? minDate(field) : field.min"
            :required="field.required || undefined"
            :aria-invalid="errors[field.id] ? 'true' : undefined"
            :aria-describedby="describedBy(field)"
            @blur="onBlur(field)"
            @input="onInput(field)"
          />
          <p v-if="errors[field.id]" :id="`${fieldId(field)}-error`" class="field__error">{{ errors[field.id] }}</p>
        </div>
      </div>

      <p v-if="status === 'error'" class="enquiry__error" role="alert">{{ form.error }}</p>

      <BaseButton :label="form.submit" type="submit" icon="arrow" size="lg" :loading="status === 'loading'" />
    </form>
  </div>
</template>

<style scoped>
form {
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}

.enquiry__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6) var(--space-4);
  width: 100%;
}

.field {
  grid-column: 1 / -1;
  display: grid;
  align-content: start;
  gap: var(--space-2);
}

@media (min-width: 520px) {
  .field--half { grid-column: span 1; }
}

label {
  font-weight: 600;
}

.field__hint {
  margin-top: calc(var(--space-1) * -1);
  font-size: var(--fs-small);
  color: var(--text-muted);
}

input,
textarea,
select {
  width: 100%;
  min-height: 52px;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--c-muted);
  border-radius: var(--radius-sm);
  background: var(--surface);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}

select {
  appearance: none;
  padding-right: 2.75rem;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235E4B4E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 1rem center / 18px,
    var(--surface);
  cursor: pointer;
}

textarea {
  resize: vertical;
  min-height: 8rem;
}

input:focus,
textarea:focus,
select:focus {
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

.enquiry__summary,
.enquiry__error {
  width: 100%;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  border: 1.5px solid color-mix(in srgb, var(--action) 35%, transparent);
}

.enquiry__summary p {
  font-weight: 700;
}

.enquiry__summary ul {
  margin: var(--space-2) 0 0;
  padding-left: 1.25rem;
}

.enquiry__summary a {
  color: var(--action);
  font-weight: 600;
}

.enquiry__error {
  font-weight: 600;
}

.enquiry__done {
  display: grid;
  justify-items: start;
  gap: var(--space-6);
  padding: var(--space-8);
  border-radius: var(--radius-card);
  background: var(--surface-soft);
  font-size: var(--fs-h3);
  font-weight: 600;
}
</style>
