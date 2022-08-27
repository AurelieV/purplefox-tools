<template>
    <!-- We need an additional span to handle SSR. Maybe punish later for it -->
    <span v-if="!pfNoPrerender" class="flex items-center justify-center">
        <Icon v-bind="$attrs"></Icon>
    </span>
    <Icon v-else v-bind="$attrs"></Icon>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
    components: { Icon },
    inject: { pfNoPrerender: { default: false } },
    inheritAttrs: false,
};
</script>
