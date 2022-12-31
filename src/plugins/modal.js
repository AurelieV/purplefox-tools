import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";
import Dialog from "/src/components/Dialog.vue";

export function useModal(id, groupId) {
    const route = useRoute();
    const router = useRouter();

    const isOpen = computed(() => {
        return groupId ? route.query[groupId] === id : !!route.query[id];
    });

    if (groupId) {
        watch(
            () => route.query[groupId],
            (value) => {
                if (value) {
                    document.body.classList.add("overflow-hidden");
                } else {
                    document.body.classList.remove("overflow-hidden");
                }
            },
            { immediate: true }
        );
    } else {
        watch(
            () => route.query[id],
            (value) => {
                if (value) {
                    document.body.classList.add("overflow-hidden");
                } else {
                    document.body.classList.remove("overflow-hidden");
                }
            },
            { immediate: true }
        );
    }

    async function close() {
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
    }

    return {
        isOpen,
        async open() {
            const query = { ...route.query, [groupId || id]: groupId ? id : "open" };
            router.push({ query });
        },
        close,
    };
}

export default function install(app) {
    app.component("Pf_Dialog", Dialog);
}
