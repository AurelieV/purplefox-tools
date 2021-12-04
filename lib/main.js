import NotificationsPlugin from "/src/plugins/NotificationsPlugin.js";
import ModalPlugin, { useModal } from "/src/plugins/modal";
import ResponsivePlugin from "/src/plugins/responsive.js";
import IconPlugin from "/src/plugins/icon.js";
import AuthPlugin, { useAuth } from "/src/plugins/auth.js";
import SubmitButton from "/src/components/SubmitButton.vue";

import "/src/style/index.css";

export {
    NotificationsPlugin,
    useModal,
    ModalPlugin,
    ResponsivePlugin,
    IconPlugin,
    AuthPlugin,
    useAuth,
    SubmitButton as Pf_SubmitButton,
};
