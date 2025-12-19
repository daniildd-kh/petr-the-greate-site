<template>
    <header ref="headerRef" class="sticky">
        <div class="header-inner">
            <button class="brand" type="button" @click="scrollToSection('hero')">
                <img class="logo" :src="logo" alt="Логотип проекта" />
                <span class="brand-text">
                    <span class="brand-title">Эпоха преобразований</span>
                    <span class="brand-meta">1682–1725</span>
                </span>
            </button>

            <nav class="nav">
                <button
                    v-for="item in nav"
                    :key="item.id"
                    class="nav-link"
                    :class="{ active: activeId === item.id }"
                    :aria-current="activeId === item.id ? 'page' : undefined"
                    type="button"
                    @click="scrollToSection(item.id)"
                >
                    {{ item.label }}
                </button>
            </nav>

            <div class="actions">
                <button class="menu-toggle" type="button" @click="isMenuOpen = true">Меню</button>
            </div>
        </div>

        <div class="progress">
            <span class="progress-bar" :style="{ width: progress + '%' }"></span>
        </div>

        <div v-if="isMenuOpen" class="drawer" @click.self="isMenuOpen = false">
            <div class="drawer-panel" role="dialog" aria-modal="true">
                <button class="drawer-close" type="button" @click="isMenuOpen = false">Закрыть</button>
                <div class="drawer-nav">
                    <button
                        v-for="item in nav"
                        :key="item.id"
                        class="drawer-link"
                        :class="{ active: activeId === item.id }"
                        type="button"
                        @click="scrollToSection(item.id)"
                    >
                        {{ item.label }}
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import logo from "../assets/images/logo.jpeg";

const nav = [
    { id: "timeline", label: "Хронология" },
    { id: "kpi", label: "Суть эпохи" },
    { id: "reforms", label: "Реформы" },
    { id: "docs", label: "Документы" },
    { id: "debate", label: "Споры" },
    { id: "geo", label: "География" },
    { id: "sources", label: "Источники" },
];

const headerRef = ref<HTMLElement | null>(null);
const activeId = ref<string>(nav[0]?.id ?? "");
const progress = ref(0);
const isMenuOpen = ref(false);

const getHeaderOffset = () => (headerRef.value?.offsetHeight ?? 0) + 8;

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top, behavior: "smooth" });
    isMenuOpen.value = false;
};

const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0;
};

const updateActive = () => {
    const offset = getHeaderOffset();
    let current = nav[0]?.id ?? "";
    for (const item of nav) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 0) {
            current = item.id;
        }
    }
    activeId.value = current;
};

let ticking = false;
const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
        updateProgress();
        updateActive();
        ticking = false;
    });
};

const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        isMenuOpen.value = false;
    }
};

onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKeyDown);
    nextTick(() => {
        updateProgress();
        updateActive();
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("keydown", onKeyDown);
});

watch(isMenuOpen, (open) => {
    document.body.style.overflow = open ? "hidden" : "";
});
</script>

<style scoped>
.sticky {
    position: sticky;
    top: 0;
    z-index: 120;
    backdrop-filter: blur(12px);
    background: color-mix(in srgb, var(--color-bg) 85%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
}

.header-inner {
    margin: 0 auto;
    padding: 12px var(--space-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
}

.logo {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
}

.brand-text {
    display: grid;
}

.brand-title {
    font-size: var(--size-base);
    font-weight: 700;
}

.brand-meta {
    font-size: var(--size-small);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
}

.nav {
    display: flex;
    gap: var(--space-xs);
}

.nav-link {
    border: none;
    background: transparent;
    font-size: var(--size-small);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: color-mix(in srgb, var(--color-text) 65%, var(--color-bg));
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-link.active,
.nav-link:hover {
    color: var(--color-bg);
    background: var(--color-accent);
}

.actions {
    display: flex;
    gap: var(--space-xs);
    align-items: center;
}

.menu-toggle {
    border: none;
    background: var(--color-accent);
    color: var(--color-bg);
    padding: 8px 12px;
    border-radius: 999px;
    font-size: var(--size-small);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    cursor: pointer;
}

.progress {
    height: 3px;
    background: color-mix(in srgb, var(--color-text) 10%, transparent);
}

.progress-bar {
    display: block;
    height: 100%;
    background: var(--color-primary);
    width: 0;
    transition: width 0.1s linear;
}

.drawer {
    position: fixed;
    inset: 0;
    background: rgba(10, 15, 20, 0.4);
    display: grid;
    place-items: end;
    z-index: 200;
}

.drawer-panel {
    width: min(360px, 100%);
    height: 100%;
    background: color-mix(in srgb, var(--color-bg) 94%, #fff);
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    box-shadow: -20px 0 40px rgba(10, 15, 20, 0.2);
}

.drawer-close {
    align-self: flex-end;
    border: none;
    background: transparent;
    font-size: var(--size-small);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    cursor: pointer;
}

.drawer-nav {
    display: grid;
    gap: var(--space-xs);
}

.drawer-link {
    border: none;
    background: color-mix(in srgb, #fff 80%, transparent);
    padding: 10px 14px;
    border-radius: 14px;
    text-align: left;
    font-size: var(--size-base);
    font-weight: 600;
    cursor: pointer;
}

.drawer-link.active {
    background: var(--color-accent);
    color: var(--color-bg);
}

@media (max-width: 1024px) {
    .nav {
        display: none;
    }

    .menu-toggle {
        display: inline-flex;
    }
}
</style>
