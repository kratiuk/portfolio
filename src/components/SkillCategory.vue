<script setup>
import SkillItem from "./SkillItem.vue";

defineProps({
    title: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="skill-category">
        <h3 class="category-title">{{ title }}</h3>
        <div class="skills-grid">
            <!-- Generates skill widgets in a grid for the category -->
            <SkillItem v-for="skill in skills" :key="skill.name" :name="skill.name" :icon="skill.icon"
                :invertOnDark="skill.invertOnDark" />
        </div>
    </div>
</template>

<style scoped>
.skill-category {
    flex: 1;
    min-width: 0;
}

.category-title {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.75rem;
    text-align: center;
}

body.light-theme .category-title {
    color: rgba(26, 26, 26, 0.7);
}

.skills-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    min-height: 120px;
}
</style>
