<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <h2 class="section-title">
        {{ title }}
    </h2>
</template>

<style>
@font-face {
    font-family: 'RubikDoodleShadow';
    src: url('../assets/fonts/RubikDoodleShadow-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

.section-title {
    font-family: 'RubikDoodleShadow', sans-serif;
    font-size: 2.5rem;
    margin: 0 0 2.5rem 0;
    color: #fff;
    margin-top: 2rem;
}

body.light-theme .section-title {
    color: #1a1a1a;
}
</style>
