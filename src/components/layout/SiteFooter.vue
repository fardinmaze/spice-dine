<script setup>
import BaseButton from '../ui/BaseButton.vue'
import { nav, site } from '../../config/site'
import { copy } from '../../data/copy'
import { summariseHours } from '../../utils/hours'

const hours = summariseHours(site.hours)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer" data-actionbar-hide>
    <svg class="footer__blob" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 80V46C160 14 320 0 520 18s360 52 560 40S1320 6 1440 22v58Z" />
    </svg>

    <div class="container footer__inner">
      <p class="footer__statement">{{ copy.footer.statement }}</p>

      <div class="footer__grid">
        <div class="footer__info">
          <p class="footer__brand">{{ site.name }}</p>
          <address>
            <a :href="site.mapsUrl" target="_blank" rel="noopener">{{ site.address }}<span class="visually-hidden"> (opens in a new tab)</span></a><br />
            <a :href="site.phoneHref">{{ site.phone }}</a>
          </address>
          <div>
            <p class="footer__label">{{ copy.footer.hours }}</p>
            <!-- PLACEHOLDER hours, see config/site.js -->
            <dl class="footer__hours">
              <div v-for="row in hours" :key="row.days">
                <dt>{{ row.days }}</dt>
                <dd>{{ row.range }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <nav class="footer__col" :aria-label="copy.footer.columns.nav">
          <p class="footer__label">{{ copy.footer.columns.nav }}</p>
          <ul role="list">
            <li v-for="item in nav" :key="item.label">
              <RouterLink :to="item.to">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="footer__col">
          <p class="footer__label">{{ copy.footer.columns.order }}</p>
          <ul role="list">
            <li>
              <a :href="site.orderUrl" target="_blank" rel="noopener">{{ copy.cta.order }}<span class="visually-hidden"> (opens in a new tab)</span></a>
            </li>
            <li><a :href="site.phoneHref">{{ copy.cta.call }}</a></li>
            <li>
              <a :href="site.mapsUrl" target="_blank" rel="noopener">{{ copy.cta.directions }}<span class="visually-hidden"> (opens in a new tab)</span></a>
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <p class="footer__label">{{ copy.footer.columns.social }}</p>
          <!-- PLACEHOLDER social links -->
          <ul role="list">
            <li v-for="s in site.socials" :key="s.label"><a :href="s.href">{{ s.label }}</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <BaseButton :label="copy.cta.order" :href="site.orderUrl" external size="sm" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: 64px;
  padding-block: var(--space-12) var(--space-8);
  background: var(--surface-soft);
}

/* Soft blob that rises above the footer's top edge */
.footer__blob {
  position: absolute;
  left: 0;
  bottom: calc(100% - 1px);
  width: 100%;
  height: 64px;
  fill: var(--surface-soft);
}

.footer__inner {
  display: grid;
  gap: var(--space-12);
}

.footer__statement {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 1.2rem + 4.4vw, 5rem);
  line-height: 1.02;
  color: var(--action);
  max-width: 16ch;
  text-wrap: balance;
}

.footer__grid {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.footer__info {
  display: grid;
  gap: var(--space-4);
  align-content: start;
  grid-column: 1 / -1;
}

.footer__brand {
  font-weight: 700;
  font-size: var(--fs-h3);
}

address {
  font-style: normal;
}

.footer__label {
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.footer__hours {
  margin: 0;
  display: grid;
  gap: var(--space-1);
  color: var(--text-muted);
}

.footer__hours div {
  display: flex;
  gap: var(--space-3);
}

.footer__hours dt {
  min-width: 4.5rem;
  font-weight: 600;
  color: var(--text);
}

.footer__hours dd {
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.footer__col ul {
  margin: 0;
  display: grid;
  gap: var(--space-1);
}

.footer a:not(.btn) {
  display: inline-block;
  padding-block: var(--space-1);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
}

@media (hover: hover) {
  .footer a:not(.btn):hover { color: var(--action); text-decoration-color: currentColor; }
}

.footer__col a:not(.btn) {
  text-decoration: none;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--line);
  font-size: var(--fs-small);
  color: var(--text-muted);
}

@media (min-width: 810px) {
  .footer__grid { grid-template-columns: 1.6fr repeat(3, 1fr); }
  .footer__info { grid-column: auto; }
}
</style>
