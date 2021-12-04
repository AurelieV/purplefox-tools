<template>
    <button class="pf-btn -primary flex relative" type="submit" v-bind="$attrs" :disabled="internalDisabled">
        <slot></slot>
        <div v-if="loading" name="loading" class="absolute inset-0 bg-white flex items-center justify-center">
            <Spinner class="h-4 w-4"></Spinner>
        </div>
    </button>
</template>

<script>
import Spinner from "/src/components/Spinner.vue";

export default {
    components: { Spinner },
    inheritAttrs: false,
    props: {
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
    },
    computed: {
        internalDisabled() {
            return this.loading && this.disabled;
        },
    },
};
</script>
