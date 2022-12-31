<template>
    <div role="radiogroup" class="flex justify-center mt-3">
        <div
            v-for="option in options"
            :key="option.label"
            role="radio"
            :aria-selected="option.value === modelValue"
            class="px-3 py-2 transition-colors border rounded cursor-pointer border-purple"
            :class="option.value === modelValue ? 'text-purple' : 'bg-purple text-white'"
            @click="$emit('update:modelValue', option.value)"
        >
            {{ option.label }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: { type: Array, required: true },
        // eslint-disable-next-line vue/require-prop-types
        modelValue: { required: true },
    },
    emits: ["update:modelValue"],
};
</script>
