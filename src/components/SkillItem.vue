<script setup>
import { computed } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: "",
    },
    icons: {
        type: Array,
        default: () => [],
    },
    invertOnDark: {
        type: Boolean,
        default: false,
    },
});

const iconsToRender = computed(() => {
    if (props.icons && props.icons.length > 0) {
        return props.icons;
    }
    return props.icon ? [props.icon] : [];
});
</script>

<template>
    <div class="skill-item">
        <div class="skill-icons">
            <img v-for="iconSrc in iconsToRender" :key="iconSrc" :src="iconSrc" :alt="name" class="skill-icon"
                :class="{ 'invert-on-dark': invertOnDark }" />
        </div>
        <span class="skill-name">{{ name }}</span>
    </div>
</template>

<style scoped>
.skill-item {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    font-size: 0.9rem;
    transition: all 0.3s;
}

body.light-theme .skill-item {
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #1a1a1a;
}

.skill-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.2);
}

body.light-theme .skill-item:hover {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
}

.skill-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 36px;
}

.skill-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.skill-icon.invert-on-dark {
    filter: invert(1);
}

body.light-theme .skill-icon.invert-on-dark {
    filter: invert(0);
}

.skill-name {
    font-weight: 500;
}
</style>
