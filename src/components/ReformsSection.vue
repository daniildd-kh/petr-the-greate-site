<template>
  <section id="reforms" class="reforms-section">
    <div class="reforms-inner">
      <header class="reforms-header">
        <h2 class="reforms-title">{{ reformsSection.title }}</h2>
        <p class="reforms-subtitle">{{ reformsSection.subtitle }}</p>
      </header>

      <div class="reforms-tabs">
        <button
          v-for="tab in reformsSection.tabs"
          :key="tab.id"
          class="reforms-tab"
          :class="{ active: activeTabId === tab.id }"
          type="button"
          @click="activeTabId = tab.id"
        >
          <component v-if="iconFor(tab.icon)" :is="iconFor(tab.icon)" class="tab-icon" aria-hidden="true" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <div v-if="activeTab" class="reforms-content">
        <div class="reforms-main">
          <div class="reforms-theses">
            <h3 class="reforms-block-title">Тезисы</h3>
            <ul class="theses-list">
              <li v-for="thesis in activeTab.theses" :key="thesis">{{ thesis }}</li>
            </ul>
          </div>
          <div class="reforms-docs">
            <h3 class="reforms-block-title">Документы и цитаты</h3>
            <div class="docs-grid">
              <article v-for="doc in activeTab.docs" :key="doc.title" class="doc-card">
                <div class="doc-header">
                  <span class="doc-badge">{{ doc.badge }}</span>
                  <span class="doc-year">{{ doc.year }}</span>
                </div>
                <div class="doc-title">{{ doc.title }}</div>
                <p class="doc-text">{{ doc.snippet }}</p>
              </article>
            </div>
          </div>
        </div>

        <div class="reforms-bottom">
          <div class="reforms-price">
            <div class="price-title">{{ activeTab.price.title }}</div>
            <ul class="price-list">
              <li v-for="item in activeTab.price.bullets" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="reforms-accordion">
            <button class="accordion-toggle" type="button" @click="detailsOpen = !detailsOpen">
              <span>{{ activeTab.details.title }}</span>
              <span class="accordion-icon">{{ detailsOpen ? "−" : "+" }}</span>
            </button>
            <div v-if="detailsOpen" class="accordion-body">
              {{ activeTab.details.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Cog, Compass, Landmark, Scale, Ship, Theater, Users } from "lucide-vue-next";
import { reformsSection } from "../data/reforms";

type ReformTab = (typeof reformsSection.tabs)[number];

const activeTabId = ref<ReformTab["id"]>(reformsSection.tabs[0]?.id ?? "");
const detailsOpen = ref(false);

const iconMap = {
  Cog,
  Compass,
  Landmark,
  Scale,
  Ship,
  Theater,
  Users,
};

const iconFor = (name?: string) => {
  if (!name) return null;
  return iconMap[name as keyof typeof iconMap] ?? null;
};

const activeTab = computed(() => {
  return reformsSection.tabs.find((tab) => tab.id === activeTabId.value) ?? null;
});

watch(
  () => activeTabId.value,
  () => {
    detailsOpen.value = false;
  }
);
</script>

<style scoped>
.reforms-section {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 92%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 78%, var(--color-primary)) 100%
  );
  color: var(--color-text);
}

.reforms-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.reforms-header {
  max-width: 760px;
}

.reforms-title {
  margin: 0 0 var(--space-sm);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.reforms-subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.reforms-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.reforms-tab {
  border: 1px solid color-mix(in srgb, var(--color-text) 18%, transparent);
  border-radius: 999px;
  padding: calc(var(--space-xs) + 0.1rem) calc(var(--space-md) + 0.1rem);
  background: color-mix(in srgb, #fff 70%, transparent);
  font-size: var(--size-base);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  transition: all 0.2s ease;
}

.reforms-tab.active {
  background: var(--color-accent);
  color: var(--color-bg);
  border-color: var(--color-accent);
  box-shadow: 0 12px 24px color-mix(in srgb, var(--color-accent) 35%, transparent);
}

.reforms-tab:hover:not(.active) {
  border-color: var(--color-primary);
  color: var(--color-accent);
}

.tab-icon {
  width: 1rem;
  height: 1rem;
}

.reforms-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.reforms-main {
  display: grid;
  gap: var(--space-lg);
}

.reforms-block-title {
  margin: 0 0 var(--space-sm);
  font-size: var(--size-medium);
  font-weight: 700;
}

.reforms-theses,
.reforms-docs {
  background: color-mix(in srgb, #fff 80%, transparent);
  border-radius: 20px;
  padding: calc(var(--space-lg) + var(--space-xs));
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 14%, transparent);
}

.theses-list {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-xs);
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
}

.docs-grid {
  display: grid;
  gap: var(--space-sm);
}

.doc-card {
  border-radius: 16px;
  padding: var(--space-md);
  background: color-mix(in srgb, var(--color-bg) 90%, #fff);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  display: grid;
  gap: var(--space-xs);
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.doc-badge {
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-accent);
  font-weight: 600;
}

.doc-title {
  font-size: var(--size-base);
  font-weight: 600;
}

.doc-text {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
  line-height: 1.55;
}

.reforms-bottom {
  display: grid;
  gap: var(--space-lg);
  align-items: start;
}

.reforms-price {
  border-radius: 20px;
  padding: calc(var(--space-lg) + var(--space-xs));
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary) 20%, transparent),
    color-mix(in srgb, var(--color-bg) 85%, #fff)
  );
  border: 1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.price-title {
  font-size: var(--size-medium);
  font-weight: 700;
  margin-bottom: var(--space-sm);
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.price-list {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-xs);
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
}

.reforms-accordion {
  border-radius: 20px;
  background: color-mix(in srgb, #fff 85%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  overflow: hidden;
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 12%, transparent);
  align-self: start;
}

.accordion-toggle {
  width: 100%;
  border: none;
  background: transparent;
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--size-base);
  font-weight: 700;
  cursor: pointer;
}

.accordion-icon {
  font-size: 1.4rem;
}

.accordion-body {
  padding: 0 var(--space-md) var(--space-md);
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
  line-height: 1.6;
}

@media (min-width: 900px) {
  .reforms-main {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  }

  .reforms-bottom {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  }
}
</style>
