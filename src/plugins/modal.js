import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";
import Dialog from "/src/components/Dialog.vue";

export function useModal(id, { groupId, withChildren } = {}) {
    const route = useRoute();
    const router = useRouter();

    const isOpen = computed(() => {
        return groupId ? route.query[groupId] === id : !!route.query[id];
    });

    let openedChild;
    if (withChildren) {
        openedChild = computed(() => (!route.query[id] || route.query[id] === "_pfOpen" ? null : route.query[id]));
    }

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
        if (groupId) {
            delete query[groupId];
        } else {
            delete query[id];
        }

        router.replace({ query });
        return hasChanged;
    }

    return {
        isOpen,
        async open() {
            const query = { ...route.query, [groupId || id]: groupId ? id : "_pfOpen" };
            router.push({ query });
        },
        close,
        ...(withChildren
            ? {
                  openedChild,
                  openChild(child) {
                      const query = { ...route.query, [id]: child };
                      router.push({ query });
                  },
                  closeChild() {
                      const query = { ...route.query, [id]: "_pfOpen" };
                      router.push({ query });
                  },
              }
            : {}),
    };
}

export default function install(app) {
    app.component("Pf_Dialog", Dialog);
}
