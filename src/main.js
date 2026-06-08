import { createApp } from "vue";
import de from "@locales/de.js";
import en from "@locales/en.js";
import { createI18n } from "vue-i18n";

import App from "@app";

import "./style.css";

const res = await fetch(window.location.href, { method: "HEAD" });
const locale = res.headers.get("X-Site-Locale") ?? "en";

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages: { en, de },
});

createApp(App).use(i18n).mount("#app");
