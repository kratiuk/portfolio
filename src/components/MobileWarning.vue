<script setup>
import { useI18n } from "vue-i18n";

import noMobileIcon from "@assets/icons/no-mobile.svg";

const { t } = useI18n();
</script>

<template>
  <div class="mobile-warning">
    <img :src="noMobileIcon" alt="No Mobile" />
    <h1>{{ t('mobileWarning.title') }}</h1>
    <p>{{ t('mobileWarning.description') }}</p>
  </div>
</template>

<style scoped>
.mobile-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-align: center;
  z-index: 9999;
  font-family: 'Space Mono', monospace, system-ui;
}

.mobile-warning img {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  filter: var(--warning-icon-filter, invert(1));
}

.mobile-warning h1 {
  font-size: 1.5rem;
  color: var(--warning-text, #fff);
  margin: 0 0 0.75rem 0;
  padding: 0 1.5rem;
}

.mobile-warning p {
  font-size: 0.95rem;
  color: var(--warning-text-muted, rgba(255, 255, 255, 0.7));
  max-width: 350px;
  margin: 0;
  padding: 0 1.5rem;
}
</style>
