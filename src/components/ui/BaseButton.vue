<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'

// The label is a prop (not a slot) so the rolled copy is always identical to the resting label.
const props = defineProps({
  label: { type: String, required: true },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'on-brand', 'on-brand-outline', 'ghost-link'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  external: { type: Boolean, default: false },
  icon: { type: String, default: null }, // AppIcon name; external links default to ↗
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
const iconName = computed(() => props.icon ?? (props.external ? 'external' : null))
const isLink = computed(() => props.variant === 'ghost-link')

const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return {
      href: props.disabled ? undefined : props.href,
      'aria-disabled': props.disabled || undefined,
      ...(props.external ? { target: '_blank', rel: 'noopener' } : {}),
    }
  }
  return { type: props.type, disabled: props.disabled || props.loading }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block, 'btn--icon': iconName && !isLink, 'is-loading': loading }]"
    :aria-busy="loading || undefined"
  >
    <span class="btn__roll">
      <span class="btn__roll-inner">
        <span>{{ label }}</span>
        <span v-if="!isLink" aria-hidden="true">{{ label }}</span>
      </span>
    </span>
    <span v-if="external" class="visually-hidden">(opens in a new tab)</span>
    <span v-if="iconName" class="btn__icon" :class="`btn__icon--${iconName}`">
      <AppIcon :name="iconName" :size="size === 'sm' ? 16 : 18" />
    </span>
    <span v-if="loading" class="btn__spinner spinner" aria-hidden="true" />
  </component>
</template>

<style scoped>
.btn {
  --btn-h: 52px;
  --btn-bg: transparent;
  --btn-fg: var(--action);
  --btn-border: transparent;
  --btn-icon-bg: color-mix(in srgb, currentColor 12%, transparent);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  min-height: var(--btn-h);
  padding: 0 1.5rem;
  border: 1.5px solid var(--btn-border);
  border-radius: var(--radius-pill);
  background: var(--btn-bg);
  color: var(--btn-fg);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.btn--sm { --btn-h: 40px; padding-inline: 1.125rem; font-size: 0.9375rem; }
.btn--lg { --btn-h: 60px; padding-inline: 1.875rem; font-size: 1.0625rem; }
.btn--icon { padding-right: 6px; }
.btn--block { width: 100%; }

/* 40px buttons still get a 44px tap target */
.btn--sm::before {
  content: '';
  position: absolute;
  inset: -2px 0;
}

.btn--primary { --btn-bg: var(--action); --btn-fg: var(--text-on-brand); --btn-icon-bg: rgb(255 255 255 / 0.15); }
.btn--secondary { --btn-border: var(--action); }
.btn--on-brand { --btn-bg: var(--c-white); --btn-fg: var(--c-royal); --btn-icon-bg: var(--c-royal-50); }
.btn--on-brand-outline { --btn-border: rgb(255 255 255 / 0.7); --btn-fg: var(--c-white); --btn-icon-bg: rgb(255 255 255 / 0.15); }

.btn__roll {
  display: block;
  height: 1.25em;
  line-height: 1.25em;
  overflow: hidden;
}

.btn__roll-inner {
  display: flex;
  flex-direction: column;
  transition: transform var(--dur-base) var(--ease-out);
}

.btn__icon {
  display: grid;
  place-items: center;
  width: calc(var(--btn-h) - 14px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--btn-icon-bg);
}

.btn__icon :deep(svg) {
  transition: transform var(--dur-base) var(--ease-out);
}

.btn:active { transform: scale(0.97); }

@media (hover: hover) {
  .btn:not(:disabled, [aria-disabled='true'], .is-loading):hover .btn__roll-inner { transform: translateY(-50%); }
  .btn:not(:disabled, [aria-disabled='true']):hover .btn__icon :deep(svg) { transform: translateX(3px); }
  .btn:not(:disabled, [aria-disabled='true']):hover .btn__icon--external :deep(svg) { transform: translate(2px, -2px); }

  .btn--primary:not(:disabled, [aria-disabled='true']):hover { --btn-bg: var(--action-hover); }
  .btn--secondary:not(:disabled, [aria-disabled='true']):hover { --btn-bg: var(--action); --btn-fg: var(--text-on-brand); --btn-icon-bg: rgb(255 255 255 / 0.15); }
  .btn--on-brand:not(:disabled, [aria-disabled='true']):hover { --btn-bg: var(--c-royal-50); }
  .btn--on-brand-outline:not(:disabled, [aria-disabled='true']):hover { --btn-bg: var(--c-white); --btn-fg: var(--c-royal); --btn-icon-bg: var(--c-royal-50); }
}

/* Ghost link: underlined text, underline retracts to the right on hover */
.btn--ghost-link {
  min-height: 44px;
  padding: 0;
  border: 0;
  border-radius: 0;
  gap: var(--space-2);
}

.btn--ghost-link .btn__roll {
  height: auto;
  padding-bottom: 4px;
  background: linear-gradient(currentColor, currentColor) no-repeat 100% 100% / 100% 1.5px;
  transition: background-size var(--dur-base) var(--ease-out);
}

@media (hover: hover) {
  .btn--ghost-link:hover .btn__roll { background-size: 0 1.5px; }
}

.btn:disabled,
.btn[aria-disabled='true'] {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.btn.is-loading {
  opacity: 1;
  cursor: progress;
}

.btn.is-loading .btn__roll,
.btn.is-loading .btn__icon {
  visibility: hidden;
}

.btn__spinner {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 22px;
  height: 22px;
  border: 2.5px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
