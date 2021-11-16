import { ref, reactive, readonly } from "vue";
import { v4 as uuid } from "uuid";

import TheNotifications from "/src/components/TheNotifications.vue";

const _notifications = ref([]);
const notifications = readonly(_notifications);

function pushNotification(type, message, actions) {
    const id = uuid();
    _notifications.value = [..._notifications.value, { type, message, actions, id }];
    setTimeout(() => {
        _notifications.value = _notifications.value.filter((notif) => notif.id !== id);
    }, 2000);
}

function error(...args) {
    pushNotification("error", ...args);
}
function warn(...args) {
    pushNotification("warn", ...args);
}
function info(...args) {
    pushNotification("info", ...args);
}
function success(...args) {
    pushNotification("success", ...args);
}

export default function install(app) {
    app.config.globalProperties.$notif = reactive({
        list: notifications,
        push: pushNotification,
        error,
        warn,
        info,
        success,
    });
    app.component("Pf_TheNotifications", TheNotifications);
}
