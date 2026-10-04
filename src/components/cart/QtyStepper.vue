<script setup>
import AppIcon from '../ui/AppIcon.vue'

// − qty + control. Going below 1 removes the item.
const props = defineProps({
  qty: { type: Number, required: true },
  name: { type: String, required: true }, // dish name, for button labels
})
const emit = defineEmits(['update'])
</script>

<template>
  <div class="stepper" role="group" :aria-label="`Quantity of ${name}`">
    <button type="button" class="stepper__btn" @click="emit('update', props.qty - 1)">
      <AppIcon :name="qty === 1 ? 'trash' : 'minus'" :size="18" />
      <span class="visually-hidden">{{ qty === 1 ? `Remove ${name}` : `One less ${name}` }}</span>
    </button>
    <span class="stepper__qty">{{ qty }}</span>
    <button type="button" class="stepper__btn" @click="emit('update', props.qty + 1)">
      <AppIcon name="plus" :size="18" />
      <span class="visually-hidden">One more {{ name }}</span>
    </button>
  </div>
</template>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  flex: none;
  border: 1.5px solid var(--action);
  border-radius: var(--radius-pill);
  background: var(--surface);
}

.stepper__btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 40px;
  border: 0;
  border-radius: var(--radius-pill);
  background: none;
  color: var(--action);
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-out);
}

@media (hover: hover) {
  .stepper__btn:hover { background: var(--surface-soft); }
}

.stepper__btn:active { transform: scale(0.94); }

.stepper__qty {
  min-width: 1.5rem;
  text-align: center;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
</style>
