<template>
    <div role="radiogroup" class="flex text-center" :class="vertical ? 'flex-col space-y-2' : 'space-x-2'">
        <div
            v-for="option in options"
            :key="option.label"
            role="radio"
            :aria-selected="option.value === modelValue"
            class="px-3 py-2 transition-colors border rounded cursor-pointer border-purple"
            :class="[
                option.value === modelValue
                    ? 'bg-purple text-white'
                    : 'text-purple hover:bg-purple-700 hover:text-white focus:bg-purple-700 focus:text-white',
                { 'flex-1': fluid },
            ]"
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
        vertical: { type: Boolean, default: false },
        fluid: { type: Boolean, default: false },
    },
    emits: ["update:modelValue"],
};
</script>
