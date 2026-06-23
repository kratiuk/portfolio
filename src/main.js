import { createApp } from "vue";
import de from "@locales/de.js";
import en from "@locales/en.js";
import { createI18n } from "vue-i18n";

import App from "@app";

import "./style.css";

const res = await fetch(window.location.href, { method: "HEAD" });

// dev only: localhost/de forces German locale for testing
const locale = (import.meta.env.DEV && window.location.pathname.startsWith("/de"))
  ? "de"
  : res.headers.get("X-Site-Locale");

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages: { en, de },
});

createApp(App).use(i18n).mount("#app");
