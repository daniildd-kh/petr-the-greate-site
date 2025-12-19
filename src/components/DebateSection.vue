<template>
  <section id="debate" class="debate-section">
    <div class="debate-inner">
      <header class="debate-header">
        <h2 class="debate-title">{{ debateSection.title }}</h2>
        <p class="debate-subtitle">{{ debateSection.subtitle }}</p>
      </header>

      <div class="debate-toggle" role="tablist" aria-label="Режимы просмотра">
        <button
          v-for="(label, key) in debateSection.toggle.labels"
          :key="key"
          class="toggle-btn"
          :class="{ active: mode === key }"
          type="button"
          @click="mode = key as DebateMode"
        >
          {{ label }}
        </button>
      </div>

      <div class="debate-grid">
        <article class="debate-side">
          <div class="side-header">
            <component v-if="iconFor(leftSide.icon)" :is="iconFor(leftSide.icon)" class="side-icon" aria-hidden="true" />
            <div>
              <h3 class="side-title">{{ leftSide.title }}</h3>
              <div class="side-subtitle">{{ leftSide.subtitle }}</div>
              <div class="side-authors">{{ leftSide.authors.join(", ") }}</div>
            </div>
          </div>

          <div v-if="mode === 'academic'" class="side-block">
            <h4 class="block-title">{{ leftSide.academic.heading }}</h4>
            <ul class="thesis-list">
              <li v-for="thesis in leftSide.academic.theses" :key="thesis">{{ thesis }}</li>
            </ul>
            <div class="quote-grid">
              <div v-for="quote in leftSide.academic.quoteCards" :key="quote.by" class="quote-card">
                <div class="quote-by">{{ quote.by }}</div>
                <div class="quote-text">{{ quote.quote }}</div>
                <div class="quote-label">{{ quote.label }}</div>
              </div>
            </div>
            <div class="takeaway">
              <div class="takeaway-title">{{ leftSide.academic.takeawayTitle }}</div>
              <p class="takeaway-text">{{ leftSide.academic.takeawayText }}</p>
            </div>
          </div>

          <div v-else class="side-block">
            <h4 class="block-title">{{ leftSide.emotional.heading }}</h4>
            <p class="emotional-lead">{{ leftSide.emotional.lead }}</p>
            <div class="quote-grid">
              <div v-for="quote in leftSide.emotional.bigQuoteCards" :key="quote.by" class="quote-card big">
                <div class="quote-by">{{ quote.by }}</div>
                <div class="quote-text">{{ quote.quote }}</div>
              </div>
            </div>
            <div class="emotion-bullets">
              <div class="emotion-title">{{ leftSide.emotional.emotionBulletsTitle }}</div>
              <ul>
                <li v-for="item in leftSide.emotional.bullets" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="emotion-footer">{{ leftSide.emotional.footerNote }}</div>
          </div>
        </article>

        <article class="debate-side right">
          <div class="side-header">
            <component v-if="iconFor(rightSide.icon)" :is="iconFor(rightSide.icon)" class="side-icon" aria-hidden="true" />
            <div>
              <h3 class="side-title">{{ rightSide.title }}</h3>
              <div class="side-subtitle">{{ rightSide.subtitle }}</div>
              <div class="side-authors">{{ rightSide.authors.join(", ") }}</div>
            </div>
          </div>

          <div v-if="mode === 'academic'" class="side-block">
            <h4 class="block-title">{{ rightSide.academic.heading }}</h4>
            <ul class="thesis-list">
              <li v-for="thesis in rightSide.academic.theses" :key="thesis">{{ thesis }}</li>
            </ul>
            <div class="quote-grid">
              <div v-for="quote in rightSide.academic.quoteCards" :key="quote.by" class="quote-card">
                <div class="quote-by">{{ quote.by }}</div>
                <div class="quote-text">{{ quote.quote }}</div>
                <div class="quote-label">{{ quote.label }}</div>
              </div>
            </div>
            <div class="takeaway">
              <div class="takeaway-title">{{ rightSide.academic.takeawayTitle }}</div>
              <p class="takeaway-text">{{ rightSide.academic.takeawayText }}</p>
            </div>
          </div>

          <div v-else class="side-block">
            <h4 class="block-title">{{ rightSide.emotional.heading }}</h4>
            <p class="emotional-lead">{{ rightSide.emotional.lead }}</p>
            <div class="quote-grid">
              <div v-for="quote in rightSide.emotional.bigQuoteCards" :key="quote.by" class="quote-card big">
                <div class="quote-by">{{ quote.by }}</div>
                <div class="quote-text">{{ quote.quote }}</div>
              </div>
            </div>
            <div class="emotion-bullets">
              <div class="emotion-title">{{ rightSide.emotional.emotionBulletsTitle }}</div>
              <ul>
                <li v-for="item in rightSide.emotional.bullets" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="emotion-footer">{{ rightSide.emotional.footerNote }}</div>
          </div>
        </article>
      </div>

      <div class="bottom-note">
        <div class="bottom-title">{{ debateSection.bottomNote.title }}</div>
        <p class="bottom-text">{{ debateSection.bottomNote.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowDown, ArrowUp } from "lucide-vue-next";
import { debateSection } from "../data/debate";

type DebateMode = keyof typeof debateSection.toggle.labels;

const mode = ref<DebateMode>(debateSection.toggle.defaultMode as DebateMode);

const iconMap = {
  ArrowDown,
  ArrowUp,
};

const iconFor = (name?: string) => {
  if (!name) return null;
  return iconMap[name as keyof typeof iconMap] ?? null;
};

const leftSide = computed(() => debateSection.sides[0]!);
const rightSide = computed(() => debateSection.sides[1]!);
</script>

<style scoped>
.debate-section {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 94%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 78%, var(--color-second)) 100%
  );
  color: var(--color-text);
}

.debate-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.debate-header {
  max-width: 760px;
}

.debate-title {
  margin: 0 0 var(--space-sm);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.debate-subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.debate-toggle {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  align-self: flex-start;
}

.toggle-btn {
  border: none;
  background: transparent;
  padding: var(--space-xs) var(--space-md);
  border-radius: 999px;
  font-size: var(--size-base);
  font-weight: 600;
  cursor: pointer;
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: var(--color-accent);
  color: var(--color-bg);
  box-shadow: 0 12px 24px color-mix(in srgb, var(--color-accent) 35%, transparent);
}

.debate-grid {
  display: grid;
  gap: var(--space-lg);
  align-items: start;
}

.debate-side {
  border-radius: 24px;
  padding: calc(var(--space-lg) + var(--space-xs));
  background: color-mix(in srgb, #fff 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 12%, transparent);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.debate-side.right {
  background: color-mix(in srgb, #fff 84%, transparent);
}

.side-header {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.side-icon {
  width: 1.8rem;
  height: 1.8rem;
}

.side-title {
  margin: 0;
  font-size: var(--size-medium);
}

.side-subtitle {
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}

.side-authors {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.block-title {
  margin: 0 0 var(--space-sm);
  font-size: var(--size-base);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-text) 65%, var(--color-bg));
}

.thesis-list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: var(--space-xs);
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
}

.side-block {
  display: grid;
  gap: var(--space-sm);
}

.quote-grid {
  display: grid;
  gap: var(--space-md);
  margin-top: var(--space-sm);
}

.quote-card {
  border-radius: 16px;
  padding: var(--space-sm) var(--space-md);
  background: color-mix(in srgb, var(--color-bg) 90%, #fff);
  border-left: 3px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
  display: grid;
  gap: 6px;
}

.quote-card.big .quote-text {
  font-size: var(--size-medium);
}

.quote-by {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.quote-text {
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
}

.quote-label {
  font-size: var(--size-small);
  font-weight: 600;
  color: var(--color-accent);
}

.takeaway {
  padding: var(--space-sm);
  border-radius: 14px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  margin-top: var(--space-sm);
}

.takeaway-title {
  font-weight: 700;
  font-size: var(--size-base);
  margin-bottom: var(--space-xs);
}

.takeaway-text {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}

.emotional-lead {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
}

.emotion-bullets {
  border-top: 1px dashed color-mix(in srgb, var(--color-text) 20%, transparent);
  padding-top: var(--space-sm);
  display: grid;
  gap: var(--space-xs);
}

.emotion-title {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.emotion-bullets ul {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: var(--space-xs);
}

.emotion-footer {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.bottom-note {
  border-radius: 18px;
  padding: var(--space-md);
  background: color-mix(in srgb, var(--color-bg) 90%, #fff);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}

.bottom-title {
  font-size: var(--size-base);
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.bottom-text {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}

@media (min-width: 1024px) {
  .debate-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
</style>
