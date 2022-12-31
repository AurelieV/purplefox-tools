<template>
    <teleport to="body">
        <div class="fixed inset-0 bg-gray-200" @click="$emit(child ? 'close-child' : 'close')">
            <div class="p-2 m-auto mt-2 bg-white rounded-md shadow-md sm:mt-4 top-2 pf-dialog" @click.stop>
                <div class="flex items-start">
                    <div class="flex-1 overflow-hidden title overflow-ellipsis">{{ title }}</div>
                    <button class="ml-2 pf-icon-btn" @click="$emit(child ? 'close-child' : 'close')">
                        <Icon icon="mdi:close" class="text-purple"></Icon>
                    </button>
                </div>
                <div class="overflow-auto content">
                    <slot v-if="child" :name="child"></slot>
                    <slot v-else></slot>
                </div>
                <div v-if="$slots.footer" class="py-2">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    components: { Icon },
    props: {
        title: { type: String, default: null },
        child: { type: String, default: null },
    },
    emits: ["close", "close-child"],
};
</script>

<style>
.pf-dialog {
    width: min(500px, 90vw);
    .content {
        max-height: min(600px, 80vh);
    }
}
</style>
