<script setup>
import { onBeforeUnmount, ref, useId, watch } from 'vue'
import AppIcon from './AppIcon.vue'

// Native <dialog> (modal: focus trap, Esc, top layer). `drawer` slides in from the right;
// `sheet` is a centred panel on desktop and a bottom sheet on phones.
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  variant: { type: String, default: 'sheet', validator: (v) => ['sheet', 'drawer'].includes(v) },
})
const emit = defineEmits(['close'])

const dialog = ref(null)
const titleId = useId()

function sync(open) {
  const el = dialog.value
  if (!el) return
  if (open && !el.open) {
    el.showModal()
    document.documentElement.style.overflow = 'hidden'
  } else if (!open && el.open) {
    el.close()
  }
}

// Fires for Esc, the close button and programmatic closes alike
function onClosed() {
  document.documentElement.style.overflow = ''
  emit('close')
}

// Click on the backdrop (the dialog element itself, outside the panel) closes it
function onClick(event) {
  if (event.target === dialog.value) dialog.value.close()
}

watch(() => props.open, sync, { flush: 'post' })
onBeforeUnmount(() => (document.documentElement.style.overflow = ''))
</script>

<template>
  <dialog ref="dialog" class="dialog" :class="`dialog--${variant}`" :aria-labelledby="titleId" @close="onClosed" @click="onClick">
    <div class="dialog__panel">
      <header class="dialog__head">
        <h2 :id="titleId" class="dialog__title">{{ title }}</h2>
        <button type="button" class="dialog__close" @click="dialog.close()">
          <AppIcon name="close" :size="22" />
          <span class="visually-hidden">Close</span>
        </button>
      </header>
      <div class="dialog__body">
        <slot />
      </div>
      <footer v-if="$slots.footer" class="dialog__foot">
        <slot name="footer" />
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text);
  max-width: none;
  max-height: none;
}

.dialog::backdrop {
  background: rgb(34 20 22 / 0.5);
}

.dialog__panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
}

.dialog__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--line);
}

.dialog__title {
  font-size: clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem);
  line-height: 1.1;
  color: var(--action);
}

.dialog__close {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--action);
  cursor: pointer;
}

.dialog__body {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-6);
}

.dialog__foot {
  padding: var(--space-4) var(--space-6) calc(var(--space-4) + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  background: var(--surface);
}

/* Drawer: full height on the right */
.dialog--drawer {
  inset: 0 0 0 auto;
  width: min(100%, 28rem);
  height: 100dvh;
  margin: 0;
}

.dialog--drawer[open] .dialog__panel {
  animation: slide-in var(--dur-base) var(--ease-out);
}

/* Sheet: bottom sheet on phones, centred panel from 640px */
.dialog--sheet {
  inset: auto 0 0;
  width: 100%;
  max-height: 92dvh;
  margin: 0;
}

.dialog--sheet .dialog__panel {
  max-height: 92dvh;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  overflow: hidden;
}

.dialog--sheet[open] .dialog__panel {
  animation: rise var(--dur-base) var(--ease-out);
}

@media (min-width: 640px) {
  .dialog--sheet {
    inset: 0;
    width: min(100% - 2 * var(--gutter), 40rem);
    max-height: min(90dvh, 52rem);
    margin: auto;
  }

  .dialog--sheet .dialog__panel {
    max-height: min(90dvh, 52rem);
    border-radius: var(--radius-card);
  }
}

@keyframes slide-in {
  from { transform: translateX(100%); }
}

@keyframes rise {
  from { transform: translateY(24px); opacity: 0; }
}
</style>
