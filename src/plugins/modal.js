import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";
import Dialog from "/src/components/Dialog.vue";

export function useModal(id) {
    const route = useRoute();
    const router = useRouter();

    const isOpen = computed(() => {
        return !!route.query[id];
    });
    watch(
        isOpen,
        (value) => {
            if (value) {
                document.body.classList.add("overflow-hidden");
            } else {
                document.body.classList.remove("overflow-hidden");
            }
        },
        { immediate: true }
    );

    return {
        isOpen,
        open() {
            const query = { ...route.query, [id]: "open" };
            router.push({ query });
        },
        async close() {
            const hasChanged = new Promise((resolve) => {
                const unsubscribe = watch(isOpen, (val) => {
                    if (!val) {
                        resolve();
                        unsubscribe();
                    }
                });
            });
            const query = { ...route.query };
            delete query[id];
            router.replace({ query });
            return hasChanged;
        },
    };
}

export default function install(app) {
    app.component("Pf_Dialog", Dialog);
}
