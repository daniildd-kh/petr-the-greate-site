<template>
  <section id="timeline" class="timeline-section">
    <div class="timeline-inner">
      <header class="timeline-header">
        <h2 class="timeline-title">Ключевые даты: как менялась Россия</h2>
        <p class="timeline-subtitle">
          От первых походов и “Великого посольства” — до империи, новых институтов и социальной перестройки. Нажми на
          точку, чтобы увидеть короткую справку.
        </p>
      </header>

      <div class="timeline-filters">
        <button
          v-for="filter in timelineFilters"
          :key="filter.id"
          class="filter-chip"
          :class="{ active: activeFilter === filter.id }"
          type="button"
          @click="activeFilter = filter.id"
        >
          <component v-if="iconFor(filter.icon)" :is="iconFor(filter.icon)" class="filter-icon" aria-hidden="true" />
          <span>{{ filter.label }}</span>
        </button>
      </div>

      <div class="timeline-body">
        <div class="timeline-list-wrap">
          <ol class="timeline-list">
            <li v-for="event in visibleEvents" :key="event.id" class="timeline-item">
              <button
                type="button"
                class="timeline-point"
                :class="{ active: activeEventId === event.id }"
                @click="activeEventId = event.id"
              >
              <component v-if="iconFor(event.icon)" :is="iconFor(event.icon)" class="point-icon" aria-hidden="true" />
              <span class="point-date">{{ event.dateLabel }}</span>
                <span class="point-title">{{ event.titleShort }}</span>
              </button>
            </li>
          </ol>
          <button class="timeline-toggle" type="button" @click="isListOpen = !isListOpen">
            {{ isListOpen ? "Свернуть список" : "Показать все" }}
          </button>
        </div>

        <aside v-if="activeEvent" class="timeline-card">
          <div class="card-date">{{ activeEvent.dateLabel }}</div>
          <div class="card-title">{{ activeEvent.title }}</div>
          <p class="card-text">{{ activeEvent.text }}</p>
          <span class="card-chip">
            <component v-if="iconFor(activeEvent.icon)" :is="iconFor(activeEvent.icon)" class="card-chip-icon" aria-hidden="true" />
            <span>{{ categoryLabel(activeEvent.filter) }}</span>
          </span>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { timelineEvents, timelineFilters } from "../data/timeline";
import { Landmark, Swords, Theater, Users, Waves } from "lucide-vue-next";

type TimelineFilter = (typeof timelineFilters)[number];
type TimelineEvent = (typeof timelineEvents)[number];

const activeFilter = ref<TimelineFilter["id"]>("all");
const activeEventId = ref<TimelineEvent["id"]>(timelineEvents[0]?.id ?? "");
const isListOpen = ref(false);

const iconMap = {
  Landmark,
  Swords,
  Theater,
  Users,
  Waves,
};

const iconFor = (name?: string) => {
  if (!name) return null;
  return iconMap[name as keyof typeof iconMap] ?? null;
};

const visibleEvents = computed(() => {
  return isListOpen.value ? filteredEvents.value : filteredEvents.value.slice(0, 5);
});

const sortedEvents = computed(() => {
  return [...timelineEvents].sort((a, b) => a.sort - b.sort);
});

const filteredEvents = computed(() => {
  if (activeFilter.value === "all") {
    return sortedEvents.value;
  }
  return sortedEvents.value.filter((event) => event.filter === activeFilter.value);
});

const activeEvent = computed(() => {
  return filteredEvents.value.find((event) => event.id === activeEventId.value) ?? filteredEvents.value[0] ?? null;
});

const categoryLabel = (id: TimelineFilter["id"]) => {
  return timelineFilters.find((filter) => filter.id === id)?.label ?? "";
};

watch(
  () => activeFilter.value,
  () => {
    activeEventId.value = filteredEvents.value[0]?.id ?? "";
  }
);
</script>

<style scoped>
.timeline-section {
  padding: var(--space-xl) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 96%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 85%, var(--color-primary)) 100%
  );
  color: var(--color-text);
}

.timeline-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.timeline-header {
  max-width: 720px;
}

.timeline-title {
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  margin: 0 0 var(--space-sm);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.timeline-subtitle {
  margin: 0;
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.timeline-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.filter-chip {
  border: 1px solid color-mix(in srgb, var(--color-text) 18%, transparent);
  border-radius: 999px;
  padding: calc(var(--space-xs) + 0.1rem) calc(var(--space-md) + 0.1rem);
  background: color-mix(in srgb, #fff 65%, transparent);
  font-size: var(--size-base);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip.active {
  background: var(--color-accent);
  color: var(--color-bg);
  border-color: var(--color-accent);
  box-shadow: 0 12px 24px color-mix(in srgb, var(--color-accent) 35%, transparent);
}

.filter-chip:hover:not(.active) {
  border-color: var(--color-primary);
  color: var(--color-accent);
}

.filter-icon {
  width: 1rem;
  height: 1rem;
}

.timeline-body {
  display: grid;
  gap: var(--space-lg);
}

.timeline-list-wrap {
  display: grid;
  gap: var(--space-sm);
}

.timeline-toggle {
  align-self: flex-start;
  border: 1px solid color-mix(in srgb, var(--color-text) 18%, transparent);
  background: color-mix(in srgb, #fff 70%, transparent);
  border-radius: 999px;
  padding: var(--space-xs) var(--space-md);
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  cursor: pointer;
}

.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-md);
  position: relative;
}

.timeline-list::before {
  content: "";
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: color-mix(in srgb, var(--color-text) 12%, transparent);
}

.timeline-item {
  position: relative;
  padding-left: calc(var(--space-lg) + 0.25rem);
}

.timeline-point {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: var(--space-md) calc(var(--space-md) + 0.25rem);
  border-radius: 16px;
  display: grid;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.timeline-point::before {
  content: "";
  position: absolute;
  left: -26px;
  top: 22px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 18%, transparent);
}

.timeline-point.active {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  box-shadow: 0 16px 30px color-mix(in srgb, var(--color-primary) 18%, transparent);
}

.timeline-point.active::before {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.point-icon {
  width: 1.15rem;
  height: 1.15rem;
}

.point-date {
  font-size: var(--size-base);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 60%, var(--color-bg));
}

.point-title {
  font-size: var(--size-medium);
  font-weight: 600;
}

.timeline-card {
  background: color-mix(in srgb, #fff 85%, transparent);
  border-radius: 20px;
  padding: calc(var(--space-lg) + var(--space-sm));
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--color-accent) 18%, transparent);
}

.card-date {
  font-size: var(--size-base);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.card-title {
  font-size: clamp(1.3rem, 1.6vw, 1.6rem);
  font-weight: 600;
  margin-top: var(--space-xs);
}

.card-text {
  margin: var(--space-sm) 0 var(--space-md);
  font-size: var(--size-medium);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
  line-height: 1.6;
}

.card-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--size-base);
  padding: calc(var(--space-xs) + 0.1rem) calc(var(--space-sm) + 0.1rem);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  color: var(--color-accent);
  font-weight: 600;
}

.card-chip-icon {
  width: 1.15rem;
  height: 1.15rem;
}

@media (min-width: 900px) {
  .timeline-body {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
    align-items: start;
  }

  .timeline-card {
    position: sticky;
    top: 90px;
  }
}
</style>
