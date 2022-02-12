<template>
    <!-- We need an additional span to handle SSR. Maybe punish later for it -->
    <span>
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
