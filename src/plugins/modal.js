import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";
import Dialog from "/src/components/Dialog.vue";

export function useModal(id) {
    const route = useRoute();
    const router = useRouter();

    const isOpened = computed(() => {
        return !!route.query[id];
    });
    watch(
        isOpened,
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
        isOpened,
        open() {
            const query = { ...route.query, [id]: "open" };
            router.push({ query });
        },
        async close() {
            const hasChanged = new Promise((resolve) => {
                const unsubscribe = watch(isOpened, (val) => {
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
