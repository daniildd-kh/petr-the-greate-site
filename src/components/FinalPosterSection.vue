<template>
  <section id="finale" class="final-poster">
    <div class="final-inner">
      <h2 class="final-title">Итог: империя ценой реформ</h2>
      <div class="final-lists">
        <div class="final-column">
          <div class="final-label">
            <BadgeCheck class="label-icon" aria-hidden="true" />
            <span>что дало</span>
          </div>
          <ul class="final-list">
            <li>Армия и флот нового типа</li>
            <li>Бюрократия и управляемость</li>
            <li>Промышленность и инфраструктура</li>
            <li>Международное влияние</li>
          </ul>
        </div>
        <div class="final-column">
          <div class="final-label">
            <TriangleAlert class="label-icon" aria-hidden="true" />
            <span>чем заплатили</span>
          </div>
          <ul class="final-list">
            <li>Налоги и рекрутчина</li>
            <li>Усиление крепостничества</li>
            <li>Социальные трещины</li>
            <li>Привычка к принуждению</li>
          </ul>
        </div>
      </div>
      <blockquote class="final-quote">
        «Не приведи Бог видеть русский бунт, бессмысленный и беспощадный.»
        <span class="quote-author">— А. С. Пушкин</span>
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BadgeCheck, TriangleAlert } from "lucide-vue-next";
</script>

<style scoped>
.final-poster {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg) calc(var(--space-xl) + var(--space-lg));
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-bg) 75%, transparent) 0%,
      color-mix(in srgb, var(--color-accent) 45%, transparent) 100%
    ),
    url("../assets/images/end.webp") center / cover no-repeat;
  color: var(--color-text);
}

.final-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  text-align: center;
}

.final-title {
  margin: 0;
  font-size: clamp(2.4rem, 3.5vw, 4rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
  color: var(--color-text)
}

.final-lists {
  display: grid;
  gap: var(--space-lg);
}

.final-column {
  border-radius: 24px;
  padding: var(--space-lg);
  background: color-mix(in srgb, #fff 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 20px 40px color-mix(in srgb, var(--color-accent) 12%, transparent);
  text-align: left;
}

.final-label {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--color-text) 60%, var(--color-bg));
  margin-bottom: var(--space-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.label-icon {
  width: 1rem;
  height: 1rem;
}

.final-list {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-xs);
  font-size: var(--size-base);
}

.final-quote {
  margin: 0;
  padding: var(--space-lg);
  border-radius: 24px;
  background: color-mix(in srgb, var(--color-bg) 86%, #fff);
  border-left: 4px solid color-mix(in srgb, var(--color-primary) 60%, transparent);
  font-style: italic;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
}

.quote-author {
  display: block;
  margin-top: var(--space-sm);
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-style: normal;
  color: color-mix(in srgb, var(--color-text) 60%, var(--color-bg));
}

@media (min-width: 900px) {
  .final-lists {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
