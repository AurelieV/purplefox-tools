<template>
    <!-- We need an additional span to handle SSR. Maybe punish later for it -->
    <span class="flex items-center justify-center">
        <Icon v-bind="$attrs"></Icon>
    </span>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
    components: { Icon },
    inheritAttrs: false,
};
</script>
