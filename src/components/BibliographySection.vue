<template>
  <section id="sources" class="bibliography-section">
    <div class="bibliography-inner">
      <header class="bibliography-header">
        <h2 class="bibliography-title">{{ bibliographySection.title }}</h2>
        <p class="bibliography-subtitle">{{ bibliographySection.subtitle }}</p>
      </header>

      <button class="toggle-all" type="button" @click="toggleAll">
        {{ allOpen ? "Свернуть все" : "Развернуть все" }}
      </button>

      <div class="accordion-list">
        <article v-for="group in bibliographySection.groups" :key="group.id" class="accordion-item">
          <button class="accordion-head" type="button" @click="toggleGroup(group.id)">
            <span class="head-left">
              <component v-if="iconForGroup(group.id)" :is="iconForGroup(group.id)" class="head-icon" aria-hidden="true" />
              <span class="head-title">{{ group.title }}</span>
            </span>
            <span class="head-meta">
              <span class="head-count">({{ group.items.length }})</span>
              <span class="head-toggle">{{ isOpen(group.id) ? "−" : "+" }}</span>
            </span>
          </button>
          <div class="accordion-body" :class="{ open: isOpen(group.id) }">
            <div class="accordion-inner">
              <ol>
                <li v-for="item in group.items" :key="item.n">
                  {{ item.text }}
                </li>
              </ol>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Book, Globe, ScrollText } from "lucide-vue-next";
import { bibliographySection } from "../data/bibliography";

const openGroups = ref<string[]>(bibliographySection.groups.filter((group) => group.defaultOpen).map((group) => group.id));

const isOpen = (id: string) => openGroups.value.includes(id);

const toggleGroup = (id: string) => {
  if (isOpen(id)) {
    openGroups.value = openGroups.value.filter((groupId) => groupId !== id);
  } else {
    openGroups.value = [...openGroups.value, id];
  }
};

const allOpen = computed(() => openGroups.value.length === bibliographySection.groups.length);

const toggleAll = () => {
  if (allOpen.value) {
    openGroups.value = [];
  } else {
    openGroups.value = bibliographySection.groups.map((group) => group.id);
  }
};

const iconForGroup = (id: string) => {
  if (id === "historians") return Book;
  if (id === "docs") return ScrollText;
  return Globe;
};
</script>

<style scoped>
.bibliography-section {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 94%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 78%, var(--color-primary)) 100%
  );
  color: var(--color-text);
}

.bibliography-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.bibliography-header {
  max-width: 720px;
}

.bibliography-title {
  margin: 0 0 var(--space-sm);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.bibliography-subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.toggle-all {
  align-self: flex-start;
  border: 1px solid color-mix(in srgb, var(--color-text) 20%, transparent);
  background: color-mix(in srgb, #fff 70%, transparent);
  border-radius: 999px;
  padding: var(--space-xs) var(--space-md);
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  cursor: pointer;
}

.accordion-list {
  display: grid;
  gap: var(--space-md);
}

.accordion-item {
  border-radius: 20px;
  background: color-mix(in srgb, #fff 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  overflow: hidden;
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 12%, transparent);
}

.accordion-head {
  width: 100%;
  border: none;
  background: transparent;
  padding: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  font-size: var(--size-base);
  cursor: pointer;
}

.head-left {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.head-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.head-title {
  font-weight: 700;
}

.head-meta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--size-small);
  color: color-mix(in srgb, var(--color-text) 60%, var(--color-bg));
}

.head-toggle {
  font-size: 1.4rem;
}

.accordion-body {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  border-top: 1px dashed color-mix(in srgb, var(--color-text) 16%, transparent);
}

.accordion-body.open {
  max-height: 600px;
  opacity: 1;
}

.accordion-inner {
  padding: var(--space-md);
}

.accordion-inner ol {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-xs);
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}
</style>
