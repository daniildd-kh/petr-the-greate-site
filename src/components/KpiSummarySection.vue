<template>
  <section id="kpi" class="kpi-summary">
    <div class="kpi-inner">
      <header class="kpi-header">
        <h2 class="kpi-title">{{ kpiSummary.title }}</h2>
        <p class="kpi-subtitle">{{ kpiSummary.subtitle }}</p>
      </header>

      <div class="kpi-grid">
        <button
          v-for="card in kpiSummary.cards"
          :key="card.id"
          class="kpi-card"
          type="button"
          @click="scrollToSection(card.targetId)"
        >
          <div class="kpi-top">
            <component v-if="iconFor(card.icon)" :is="iconFor(card.icon)" class="kpi-icon" aria-hidden="true" />
            <div class="kpi-value">{{ card.value }}</div>
          </div>
          <div class="kpi-card-title">{{ card.title }}</div>
          <p class="kpi-text">{{ card.text }}</p>
          <div class="kpi-footer">
            <span class="kpi-tag">{{ card.tag }}</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { kpiSummary } from "../data/kpi";
import { Crown, Landmark, Ship, Swords } from "lucide-vue-next";

const iconMap = {
  Crown,
  Landmark,
  Ship,
  Swords,
};

const iconFor = (name?: string) => {
  if (!name) return null;
  return iconMap[name as keyof typeof iconMap] ?? null;
};

const scrollToSection = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped>
.kpi-summary {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 92%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 82%, var(--color-second)) 100%
  );
  color: var(--color-text);
}

.kpi-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.kpi-header {
  max-width: 720px;
}

.kpi-title {
  margin: 0 0 var(--space-sm);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.kpi-subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.kpi-grid {
  display: grid;
  gap: var(--space-md);
}

.kpi-card {
  border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
  border-radius: 24px;
  padding: var(--space-lg);
  text-align: left;
  background: color-mix(in srgb, #fff 85%, transparent);
  box-shadow: 0 24px 45px color-mix(in srgb, var(--color-accent) 16%, transparent);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 55px color-mix(in srgb, var(--color-accent) 22%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.kpi-top {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.kpi-icon {
  width: 1.6rem;
  height: 1.6rem;
}

.kpi-value {
  font-size: clamp(1.3rem, 1.6vw, 1.8rem);
  font-weight: 700;
  color: var(--color-accent);
}

.kpi-card-title {
  font-size: var(--size-base);
  font-weight: 600;
}

.kpi-text {
  margin: 0;
  font-size: var(--size-small);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
  line-height: 1.6;
}

.kpi-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.kpi-tag {
  align-self: flex-start;
  font-size: var(--size-small);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-accent);
  font-weight: 600;
}

@media (min-width: 900px) {
  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
