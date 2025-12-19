<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-column">
          <h3 class="footer-title">Эпоха преобразований Петра I</h3>
          <p class="footer-text">
            Лонгрид о реформах, войне и цене модернизации России (1682–1725).
          </p>
          <div class="footer-chips">
            <span class="chip">1682–1725</span>
            <span class="chip">7 направлений</span>
            <span class="chip">Ключевые документы</span>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Навигация</h3>
          <div class="footer-links">
            <button type="button" @click="scrollToSection('timeline')">Хронология</button>
            <button type="button" @click="scrollToSection('reforms')">Реформы</button>
            <button type="button" @click="scrollToSection('docs')">Документы</button>
            <button type="button" @click="scrollToSection('debate')">Споры</button>
            <button type="button" @click="scrollToSection('sources')">Источники</button>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© 2025 • Учебный проект • Тюмгу</span>
        <span>Источники: см. раздел «Список литературы»</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
};
</script>

<style scoped>
.site-footer {
  padding: var(--space-lg) var(--space-lg) var(--space-md);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 85%, var(--color-accent)) 0%,
    color-mix(in srgb, var(--color-bg) 95%, #fff) 100%
  );
  color: var(--color-text);
}

.footer-inner {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer-top {
  display: grid;
  gap: var(--space-md);
  align-items: start;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer-title {
  margin: 0;
  font-size: var(--size-medium);
  font-weight: 700;
}

.footer-text {
  margin: 0;
  font-size: var(--size-base);
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-bg));
}

.footer-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: var(--size-small);
  padding: 6px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.footer-links button {
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  font-size: var(--size-base);
  cursor: pointer;
  color: color-mix(in srgb, var(--color-text) 80%, var(--color-bg));
}

.footer-bottom {
  border-top: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
  padding-top: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  font-size: var(--size-small);
  color: color-mix(in srgb, var(--color-text) 60%, var(--color-bg));
}

@media (min-width: 900px) {
  .footer-top {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
