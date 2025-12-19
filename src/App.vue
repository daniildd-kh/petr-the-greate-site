<script setup lang="ts">
import StickyHeader from './components/StickyHeader.vue';
import Hero from './components/Hero.vue';
import TimelineSection from './components/TimelineSection.vue';
import KpiSummarySection from './components/KpiSummarySection.vue';
import ReformsSection from './components/ReformsSection.vue';
import DocumentsSection from './components/DocumentsSection.vue';
import DebateSection from './components/DebateSection.vue';
import GeoSection from './components/GeoSection.vue';
import FinalPosterSection from './components/FinalPosterSection.vue';
import BibliographySection from './components/BibliographySection.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <StickyHeader />
  <main class="main">
    <Hero />
    <TimelineSection />
    <KpiSummarySection />
    <ReformsSection />
    <DocumentsSection />
    <DebateSection />
    <GeoSection />
    <FinalPosterSection />
    <BibliographySection />
  </main>
  <SiteFooter />
</template>

<style scoped>
.main{
  min-height: 100vh;
}
</style>
