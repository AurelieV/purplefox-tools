<template>
    <teleport to="body">
        <transition-group
            tag="div"
            name="pf-list"
            class="fixed w-2/3 space-y-2 transition-all sm:w-1/4 bottom-2 left-2"
        >
            <div
                v-for="notif in $notif.list"
                :key="notif.id"
                class="flex items-center p-4 transition bg-white rounded shadow-sm"
            >
                <Icon :class="colors[notif.type]" :icon="icons[notif.type]" inline class="text-xl"></Icon>
                <p class="ml-4 leading-tight">{{ notif.message }}</p>
            </div>
        </transition-group>
    </teleport>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
    components: { Icon },
    setup() {
        return {
            icons: {
                error: "mdi:alert",
                warning: "mdi:alert-circle",
                info: "mdi:information",
                success: "mdi:check-bold",
            },
            colors: {
                error: "text-red",
                warning: "text-orange",
                info: "text-purple",
                success: "text-green",
            },
        };
    },
};
</script>
