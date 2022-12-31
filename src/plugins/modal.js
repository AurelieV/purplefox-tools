import { useRoute, useRouter } from "vue-router";
import { computed, watch, onScopeDispose } from "vue";
import Dialog from "/src/components/Dialog.vue";

const groups = {};

export function useModal(id, groupId) {
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

    if (groupId) {
        if (!groups[groupId]) {
            groups[groupId] = [];
        }
        groups[groupId].push({ id, fn: close });
        onScopeDispose(() => {
            groups[groupId] = groups[groupId].filter((modal) => modal.id !== id);
        });
    }

    return {
        isOpen,
        async open() {
            if (groupId) {
                // First close all other modals from this group
                await Promise.all(groups[groupId].filter((modal) => modal.id !== id).map(({ fn }) => fn()));
            }
            const query = { ...route.query, [id]: "open" };
            router.push({ query });
        },
        close,
    };
}

export default function install(app) {
    app.component("Pf_Dialog", Dialog);
}
