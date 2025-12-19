import { onMounted, ref, watch } from "vue";

type ThemeMode = "light" | "dark";

const theme = ref<ThemeMode>("light");
const compact = ref(false);
const initialized = ref(false);

const applyPreferences = () => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme.value;
  document.documentElement.dataset.compact = compact.value ? "true" : "false";
};

const persistPreferences = () => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("theme", theme.value);
  localStorage.setItem("compact", compact.value ? "true" : "false");
};

const initPreferences = () => {
  if (initialized.value) return;
  initialized.value = true;
  if (typeof localStorage !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const savedCompact = localStorage.getItem("compact");
    if (savedTheme === "light" || savedTheme === "dark") {
      theme.value = savedTheme;
    } else if (typeof window !== "undefined") {
      theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (savedCompact !== null) {
      compact.value = savedCompact === "true";
    }
  }
  applyPreferences();
};

watch([theme, compact], () => {
  applyPreferences();
  persistPreferences();
});

export const useUiPreferences = () => {
  onMounted(() => {
    initPreferences();
  });

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const toggleCompact = () => {
    compact.value = !compact.value;
  };

  return {
    theme,
    compact,
    toggleTheme,
    toggleCompact,
  };
};
