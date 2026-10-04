<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppDialog from '../ui/AppDialog.vue'
import BaseButton from '../ui/BaseButton.vue'
import QtyStepper from './QtyStepper.vue'
import { useCart } from '../../composables/useCart'
import { overlays, closeOverlays } from '../../composables/useOverlays'
import { formatPrice, isOnDemand } from '../../data/menu'
import { site } from '../../config/site'
import { copy } from '../../data/copy'

const t = copy.cart
const router = useRouter()
const { items, count, subtotal, pricesPending, hasOnDemand, setQty, clear } = useCart()

// 'cart' = review the list; 'checkout' = how to place the order.
// Checkout on this site isn't live yet, so "Proceed" offers online ordering or a phone call.
// When a checkout exists, wire it in at proceed().
const step = ref('cart')
watch(() => overlays.cart, (open) => open && (step.value = 'cart'))

const proceed = () => (step.value = 'checkout')

function browseMenu() {
  closeOverlays()
  router.push({ path: '/', hash: '#menu' })
}
</script>

<template>
  <AppDialog :open="overlays.cart" :title="step === 'cart' ? t.title : t.checkout.title" variant="drawer" @close="overlays.cart = false">
    <template v-if="step === 'cart'">
      <div v-if="!count" class="empty">
        <p>{{ t.empty }}</p>
        <BaseButton :label="copy.cta.menu" icon="arrow" variant="secondary" @click="browseMenu" />
      </div>

      <template v-else>
        <p v-if="hasOnDemand" class="notice">
          <strong>{{ copy.home.menu.onDemand.title }}.</strong> {{ t.onDemandNote }}
        </p>

        <ul class="lines" role="list">
          <li v-for="item in items" :key="item.id" class="line">
            <div class="line__info">
              <p class="line__name">{{ item.dish.name }}</p>
              <p class="line__meta">
                <span>{{ formatPrice(item.dish.price) }}</span>
                <span v-if="isOnDemand(item.dish)" class="line__ready">{{ t.onDemandLine }}</span>
              </p>
            </div>
            <QtyStepper :qty="item.qty" :name="item.dish.name" @update="setQty(item.id, $event)" />
          </li>
        </ul>

        <button type="button" class="clear" @click="clear">{{ t.clear }}</button>
      </template>
    </template>

    <div v-else class="checkout">
      <p>{{ t.checkout.body }}</p>
      <div class="checkout__option">
        <p>{{ t.checkout.online }}</p>
        <BaseButton :label="copy.cta.order" :href="site.orderUrl" external block />
      </div>
      <div class="checkout__option">
        <p>{{ t.checkout.phone }}</p>
        <BaseButton :label="`${copy.cta.call} ${site.phone}`" :href="site.phoneHref" icon="phone" variant="secondary" block />
      </div>
      <p v-if="hasOnDemand" class="notice">
        <strong>{{ copy.home.menu.onDemand.title }}.</strong> {{ t.onDemandNote }}
      </p>
      <BaseButton :label="t.back" variant="ghost-link" @click="step = 'cart'" />
    </div>

    <template v-if="step === 'cart' && count" #footer>
      <p class="total">
        <span>{{ t.subtotal }} · {{ count }} {{ count === 1 ? 'item' : 'items' }}</span>
        <strong>{{ pricesPending ? t.pricesPending : formatPrice(subtotal) }}</strong>
      </p>
      <BaseButton :label="t.proceed" icon="arrow" size="lg" block @click="proceed" />
    </template>
  </AppDialog>
</template>

<style scoped>
.empty {
  display: grid;
  justify-items: start;
  gap: var(--space-6);
  color: var(--text-muted);
}

.notice {
  margin-bottom: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--highlight) 22%, var(--surface));
  font-size: var(--fs-small);
}

.lines {
  margin: 0;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--line);
}

.line__name {
  font-weight: 600;
  line-height: 1.35;
}

.line__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-3);
  font-size: var(--fs-small);
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.line__ready {
  font-weight: 600;
  color: var(--action);
}

.clear {
  margin-top: var(--space-4);
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  font-size: var(--fs-small);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.total {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  font-size: var(--fs-small);
}

.total strong {
  font-size: var(--fs-body);
}

.checkout {
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}

.checkout__option {
  display: grid;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-6);
  border-radius: var(--radius-card);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.checkout__option p {
  color: var(--text-muted);
}

.checkout .notice {
  margin: 0;
}
</style>
