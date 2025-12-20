<template>
    <section id="hero" class="hero">
        <div class="hero-grid">
            <div class="hero-left">
                <div class="eyebrow">
                    Россия • <a class="eyebrow-link" href="#timeline">1682–1725</a>
                </div>
                <h1 class="title">Пётр I: эпоха преобразований</h1>
                <p class="subheadline">
                    Как реформы, война и создание флота изменили государство — и чем это обернулось для общества.
                </p>
                <p class="lead">
                    За четыре десятилетия Россия изменила управление, армию, экономику и повседневные привычки. Пётр
                    строил государство как механизм: создавал институты, вводил правила, требовал результата. Но быстрые
                    перемены почти всегда имеют цену — и в этой эпохе она была высокой.
                </p>
                <ul class="inside-list">
                    <li>20 ключевых дат — от первых реформ до 1721 года</li>
                    <li>7 направлений реформ: управление, экономика, армия и флот, культура</li>
                    <li>Споры об эпохе: модернизация vs. ломка традиций</li>
                </ul>
                <div class="cta">
                    <a class="btn primary" href="#timeline">Смотреть хронологию</a>
                    <a class="btn secondary" href="#reforms">7 направлений реформ</a>
                </div>
                <div class="cta-hint">Прокрутка вниз — материал построен как история по шагам</div>
                <div class="meta-chips">
                    <span class="chip">≈ 10–12 минут чтения</span>
                    <span class="chip">7 блоков</span>
                    <span class="chip">Документы и термины</span>
                </div>
            </div>
            <div class="hero-right">
                <div class="visual">
                    <div class="visual-plate" aria-hidden="true"></div>
                    <img class="hero-photo" :src="heroPhoto" alt="Портрет Петра I" />
                    <div class="thesis-card">
                        <div class="thesis-label">Тезис эпохи</div>
                        <div class="thesis-text">Модернизация шла сверху — быстро, жёстко и системно.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import heroPhoto from "../assets/images/petr-1.webp";
</script>

<style scoped>
.hero {
    --hero-ink: var(--color-text);
    --hero-muted: color-mix(in srgb, var(--color-text) 55%, var(--color-bg));
    --hero-accent: var(--color-primary);
    --hero-accent-dark: var(--color-accent);
    --hero-deep: var(--color-accent);

    padding: calc(var(--space-xl) + var(--space-sm)) var(--space-lg)
        calc(var(--space-xl) + var(--space-md));
    background:
        radial-gradient(
            1200px 600px at 15% -10%,
            color-mix(in srgb, var(--color-primary) 18%, transparent) 0%,
            transparent 60%
        ),
        radial-gradient(
            900px 500px at 85% 10%,
            color-mix(in srgb, var(--color-second) 18%, transparent) 0%,
            transparent 55%
        ),
        linear-gradient(
            180deg,
            var(--color-bg) 0%,
            color-mix(in srgb, var(--color-bg) 80%, var(--color-primary)) 100%
        );
    color: var(--hero-ink);
}

.hero-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: var(--space-xl);
}

.hero-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    font-family: "Manrope", "Helvetica Neue", "Arial", sans-serif;
}

.eyebrow {
    font-size: var(--size-small);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--hero-muted);
    font-weight: 600;
}

.eyebrow-link {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(90, 85, 80, 0.4);
    transition: border-color 0.2s ease, color 0.2s ease;
}

.eyebrow-link:hover {
    color: var(--hero-accent);
    border-color: var(--hero-accent);
}

.title {
    font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
    font-size: clamp(2.25rem, 4.4vw, 4rem);
    line-height: 1.05;
    margin: 0;
}

.subheadline {
    font-size: var(--size-medium);
    color: var(--hero-deep);
    margin: 0;
    max-width: 560px;
}

.lead {
    font-size: var(--size-base);
    line-height: 1.6;
    color: var(--hero-muted);
    margin: 0;
    max-width: 620px;
}

.inside-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: var(--space-xs);
    color: var(--hero-deep);
    font-size: var(--size-base);
}

.inside-list li {
    position: relative;
    padding-left: 20px;
}

.inside-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: linear-gradient(
        135deg,
        var(--hero-accent),
        color-mix(in srgb, var(--hero-accent) 60%, #fff)
    );
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--hero-accent) 20%, transparent);
}

.cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-xs);
}

.btn {
    padding: var(--space-sm) calc(var(--space-md) + var(--space-xs));
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn.primary {
    background: linear-gradient(
        135deg,
        var(--hero-accent),
        color-mix(in srgb, var(--hero-accent) 65%, #fff)
    );
    color: #fff;
    box-shadow: 0 12px 24px color-mix(in srgb, var(--hero-accent) 40%, transparent);
}

.btn.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 30px color-mix(in srgb, var(--hero-accent) 50%, transparent);
}

.btn.secondary {
    border: 1px solid color-mix(in srgb, var(--hero-deep) 20%, transparent);
    color: var(--hero-deep);
    background: color-mix(in srgb, #fff 60%, transparent);
}

.btn.secondary:hover {
    border-color: var(--hero-accent);
    color: var(--hero-accent-dark);
}

.cta-hint {
    font-size: var(--size-small);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--hero-muted);
}

.meta-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: var(--space-xs);
}

.chip {
    font-size: var(--size-small);
    padding: var(--space-xs) var(--space-sm);
    border-radius: 999px;
    background: color-mix(in srgb, #fff 65%, transparent);
    border: 1px solid color-mix(in srgb, var(--hero-deep) 12%, transparent);
    color: var(--hero-deep);
}

.hero-right {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
}

.visual {
    position: relative;
    width: 100%;
    min-height: 420px;
    border-radius: 24px;
    background:
        linear-gradient(
            140deg,
            color-mix(in srgb, var(--hero-deep) 12%, transparent),
            color-mix(in srgb, #fff 20%, transparent)
        ),
        radial-gradient(
            200px 220px at 70% 30%,
            color-mix(in srgb, var(--hero-accent) 25%, transparent),
            transparent 65%
        ),
        linear-gradient(
            180deg,
            color-mix(in srgb, var(--color-bg) 85%, var(--hero-accent)) 0%,
            color-mix(in srgb, var(--color-bg) 70%, var(--hero-accent)) 60%,
            color-mix(in srgb, var(--color-bg) 60%, var(--hero-accent)) 100%
        );
    overflow: hidden;
    box-shadow: 0 30px 60px color-mix(in srgb, var(--hero-deep) 25%, transparent);
}

.visual-plate {
    position: absolute;
    inset: 20% 12% 24% 12%;
    border-radius: 999px 999px 140px 140px;
    border: 2px solid color-mix(in srgb, #fff 60%, transparent);
    background:
        radial-gradient(
            140px 120px at 30% 40%,
            color-mix(in srgb, #fff 50%, transparent),
            transparent 60%
        ),
        linear-gradient(
            160deg,
            color-mix(in srgb, #fff 35%, transparent),
            color-mix(in srgb, #fff 0%, transparent)
        );
    transform: rotate(-4deg);
}

.hero-photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    border: 1px solid color-mix(in srgb, #fff 60%, transparent);
}

.visual::before,
.visual::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    opacity: 0.6;
    filter: blur(0.2px);
}

.visual::before {
    width: 180px;
    height: 180px;
    background: radial-gradient(
        circle,
        color-mix(in srgb, var(--hero-accent) 45%, transparent),
        transparent 70%
    );
    top: 10%;
    left: 8%;
}

.visual::after {
    width: 140px;
    height: 140px;
    background: radial-gradient(
        circle,
        color-mix(in srgb, var(--hero-deep) 35%, transparent),
        transparent 70%
    );
    bottom: 16%;
    right: 12%;
}

.thesis-card {
    position: absolute;
    right: 12%;
    bottom: 12%;
    background: color-mix(in srgb, #fff 92%, transparent);
    border-radius: 18px;
    padding: var(--space-sm) calc(var(--space-md) + var(--space-xs));
    width: min(280px, 80%);
    box-shadow: 0 18px 40px color-mix(in srgb, var(--hero-deep) 25%, transparent);
    border: 1px solid color-mix(in srgb, var(--hero-deep) 12%, transparent);
    animation: rise 0.6s ease-out both;
}

.thesis-label {
    font-size: var(--size-small);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hero-muted);
}

.thesis-text {
    margin: 8px 0;
    font-family: "Cormorant Garamond", "EB Garamond", "Georgia", serif;
    font-size: var(--size-medium);
    color: var(--hero-deep);
}

.thesis-meta {
    font-size: var(--size-small);
    color: var(--hero-muted);
}

.visual-caption {
    font-size: var(--size-small);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--hero-muted);
}

@keyframes rise {
    from {
        transform: translateY(18px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@media (min-width: 768px) {
    .hero {
        padding: calc(var(--space-xl) + var(--space-lg)) var(--space-xl)
            calc(var(--space-xl) + var(--space-lg));
    }

    .hero-grid {
        gap: calc(var(--space-xl) + var(--space-sm));
    }
}

@media (min-width: 1024px) {
    .hero-grid {
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        align-items: center;
    }

    .hero-right {
        align-items: stretch;
    }

    .visual {
        min-height: 520px;
    }
}
</style>
