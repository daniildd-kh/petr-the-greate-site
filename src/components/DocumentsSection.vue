<template>
  <section id="docs" class="documents-section">
    <div class="documents-inner">
      <header class="documents-header">
        <h2 class="documents-title">{{ documentsSection.title }}</h2>
        <p class="documents-subtitle">{{ documentsSection.subtitle }}</p>
      </header>

      <div class="documents-grid">
        <button
          v-for="item in documentsSection.items"
          :key="item.id"
          class="document-card"
          type="button"
          @click="openModal(item)"
        >
          <span class="stamp">{{ item.year }}</span>
          <div class="doc-title">{{ item.title }}</div>
          <div class="doc-year">{{ item.year }}</div>
          <div class="doc-line">{{ item.oneLiner }}</div>
          <span v-if="item.category" class="doc-tag">{{ item.category }}</span>
        </button>
      </div>
    </div>

    <div v-if="activeItem" class="document-modal" @click.self="closeModal">
      <div class="modal-panel" role="dialog" aria-modal="true">
        <button class="modal-close" type="button" @click="closeModal">Закрыть</button>
        <h3 class="modal-title">{{ activeItem.title }}</h3>
        <div class="modal-meta">
          <span>{{ activeItem.year }}</span>
          <span v-if="activeItem.category">• {{ activeItem.category }}</span>
        </div>
        <p class="modal-text">{{ activeItem.modal.intro }}</p>
        <div class="modal-quote">{{ activeItem.modal.miniQuote }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { documentsSection } from "../data/documents";

type DocumentItem = (typeof documentsSection.items)[number];

const activeItem = ref<DocumentItem | null>(null);

const openModal = (item: DocumentItem) => {
  activeItem.value = item;
};

const closeModal = () => {
  activeItem.value = null;
};

</script>

<style scoped>
.documents-section {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 94%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 80%, var(--color-primary)) 100%
  );
  color: var(--color-text);
}

.documents-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.documents-header {
  max-width: 720px;
}

.documents-title {
  margin: 0 0 var(--space-sm);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.documents-subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.documents-grid {
  display: grid;
  gap: var(--space-md);
}

.document-card {
  position: relative;
  border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
  border-radius: 20px;
  padding: calc(var(--space-lg) + var(--space-xs));
  text-align: left;
  background: linear-gradient(
    150deg,
    color-mix(in srgb, #fff 85%, transparent),
    color-mix(in srgb, var(--color-bg) 90%, #fff)
  );
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 12%, transparent);
  display: grid;
  gap: var(--space-xs);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.document-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  box-shadow: 0 22px 44px color-mix(in srgb, var(--color-accent) 18%, transparent);
}

.stamp {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  padding: 4px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-accent);
  border: 1px dashed color-mix(in srgb, var(--color-primary) 45%, transparent);
}

.doc-title {
  font-size: var(--size-medium);
  font-weight: 700;
}

.doc-year {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--color-text) 60%, var(--color-bg));
}

.doc-line {
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}

.doc-tag {
  align-self: flex-start;
  font-size: var(--size-small);
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-accent);
  font-weight: 600;
}

.document-modal {
  position: fixed;
  inset: 0;
  background: rgba(13, 17, 24, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-lg);
  z-index: 200;
}

.modal-panel {
  width: min(520px, 100%);
  background: color-mix(in srgb, #fff 100%, transparent);
  border-radius: 24px;
  padding: calc(var(--space-lg) + var(--space-sm));
  box-shadow: 0 30px 60px rgba(15, 19, 30, 0.35);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  display: grid;
  gap: var(--space-sm);
}

.modal-close {
  justify-self: end;
  border: none;
  background: transparent;
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  cursor: pointer;
  color: color-mix(in srgb, var(--color-text) 65%, var(--color-bg));
}

.modal-title {
  margin: 0;
  font-size: var(--size-medium);
  font-weight: 700;
}

.modal-meta {
  font-size: var(--size-small);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.modal-text {
  margin: 0;
  font-size: var(--size-base);
  line-height: 1.6;
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
}

.modal-quote {
  padding: var(--space-sm);
  border-left: 3px solid color-mix(in srgb, var(--color-primary) 55%, transparent);
  background: color-mix(in srgb, var(--color-bg) 85%, #fff);
  font-style: italic;
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

@media (min-width: 800px) {
  .documents-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .documents-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
