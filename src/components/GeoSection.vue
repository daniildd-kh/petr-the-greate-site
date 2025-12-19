<template>
  <section id="geo" class="geo-section">
    <div class="geo-inner">
      <header class="geo-header">
        <h2 class="geo-title">{{ geoSection.title }}</h2>
        <p class="geo-subtitle">{{ geoSection.subtitle }}</p>
      </header>

      <div class="geo-grid">
        <div class="geo-map">
          <div class="geo-hint">Нажми на метку — появится карточка с пояснением.</div>
          <div class="map-canvas">
            <img class="map-image" :src="mapImage" alt="Историческая карта Российской империи" />

            <button
              v-for="marker in geoSection.map.markers"
              :key="marker.id"
              class="map-marker"
              :class="{ active: activeMarkerId === marker.id }"
              type="button"
              :style="{ left: marker.coords.x + '%', top: marker.coords.y + '%' }"
              @click="activeMarkerId = marker.id"
            >
              <component v-if="iconFor(marker.icon)" :is="iconFor(marker.icon)" class="marker-icon" aria-hidden="true" />
              <span class="marker-dot"></span>
            </button>
          </div>

          <div v-if="activeMarker" class="marker-card">
            <div class="marker-head">
              <span class="marker-title">
                <component v-if="iconFor(activeMarker.icon)" :is="iconFor(activeMarker.icon)" class="marker-title-icon" aria-hidden="true" />
                {{ activeMarker.label }}
              </span>
              <span class="marker-year">{{ activeMarker.year }}</span>
            </div>
            <div class="marker-short">{{ activeMarker.short }}</div>
            <p class="marker-text">{{ activeMarker.text }}</p>
          </div>
        </div>

        <div class="geo-changes">
          <h3 class="changes-title">{{ geoSection.changesColumn.title }}</h3>
          <div class="changes-grid">
            <article v-for="item in geoSection.changesColumn.items" :key="item.id" class="change-card">
              <component v-if="iconFor(item.icon)" :is="iconFor(item.icon)" class="change-icon" aria-hidden="true" />
              <div class="change-title">{{ item.title }}</div>
              <p class="change-text">{{ item.text }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Anchor, Building2, Compass, DraftingCompass, Waves } from "lucide-vue-next";
import mapImage from "../assets/images/map.png";
import { geoSection } from "../data/geo";

type Marker = (typeof geoSection.map.markers)[number];

const activeMarkerId = ref<Marker["id"]>(geoSection.map.markers[0]?.id ?? "");

const iconMap = {
  Anchor,
  Building2,
  Compass,
  DraftingCompass,
  Waves,
};

const iconFor = (name?: string) => {
  if (!name) return null;
  return iconMap[name as keyof typeof iconMap] ?? null;
};

const activeMarker = computed(() => {
  return geoSection.map.markers.find((marker) => marker.id === activeMarkerId.value) ?? null;
});

</script>

<style scoped>
.geo-section {
  padding: calc(var(--space-xl) + var(--space-md)) var(--space-lg);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 92%, #fff) 0%,
    color-mix(in srgb, var(--color-bg) 78%, var(--color-primary)) 100%
  );
  color: var(--color-text);
}

.geo-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.geo-header {
  max-width: 720px;
}

.geo-title {
  margin: 0 0 var(--space-sm);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
}

.geo-subtitle {
  margin: 0;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
}

.geo-grid {
  display: grid;
  gap: var(--space-lg);
}

.geo-map {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.geo-hint {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.map-canvas {
  position: relative;
  border-radius: 24px;
  min-height: 360px;
  background: color-mix(in srgb, #fff 92%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--color-accent) 12%, transparent);
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
  gap: 4px;
}

.marker-icon {
  width: 1.7rem;
  height: 1.7rem;
  color: #fff;
  filter: drop-shadow(0 2px 4px color-mix(in srgb, #000 35%, transparent));
}

.marker-title {
  font-weight: 700;
  font-size: var(--size-base);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.marker-title-icon {
  width: 1.4rem;
  height: 1.4rem;
  color: #fff;
}

.marker-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #fff;
  box-shadow:
    0 0 0 8px color-mix(in srgb, var(--color-accent) 35%, transparent),
    0 2px 6px color-mix(in srgb, #000 35%, transparent);
}

.map-marker.active .marker-dot {
  background: var(--color-primary);
  box-shadow:
    0 0 0 12px color-mix(in srgb, var(--color-primary) 45%, transparent),
    0 4px 10px color-mix(in srgb, #000 35%, transparent);
}

.marker-card {
  border-radius: 18px;
  padding: var(--space-md);
  background: color-mix(in srgb, #fff 85%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 12%, transparent);
  display: grid;
  gap: var(--space-xs);
}

.marker-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.marker-year {
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.marker-short {
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}

.marker-text {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-bg));
  line-height: 1.6;
}

.geo-changes {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.changes-title {
  margin: 0;
  font-size: var(--size-medium);
  font-weight: 700;
}

.changes-grid {
  display: grid;
  gap: var(--space-sm);
}

.change-card {
  border-radius: 18px;
  padding: var(--space-md);
  background: color-mix(in srgb, #fff 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  box-shadow: 0 18px 36px color-mix(in srgb, var(--color-accent) 12%, transparent);
  display: grid;
  gap: var(--space-xs);
}

.change-icon {
  width: 1.4rem;
  height: 1.4rem;
  color: var(--color-accent);
}

.change-title {
  font-size: var(--size-base);
  font-weight: 600;
}

.change-text {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
  line-height: 1.5;
}

@media (min-width: 960px) {
  .geo-grid {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: start;
  }

  .map-canvas {
    min-height: 420px;
  }
}
</style>
