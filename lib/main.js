import NotificationsPlugin, { useNotification } from "/src/plugins/NotificationsPlugin.js";
import ModalPlugin, { useModal } from "/src/plugins/modal";
import ResponsivePlugin from "/src/plugins/responsive.js";
import IconPlugin from "/src/plugins/icon.js";
import AuthPlugin, { useAuth } from "/src/plugins/auth.js";
import SubmitButton from "/src/components/SubmitButton.vue";
import Footer from "/src/components/Footer.vue";
import ExpandTransition from "/src/components/ExpandTransition.vue";
import RadioButtons from "/src/components/RadioButtons.vue";
import Pf_Spinner from "/src/components/Pf_Spinner.vue";

import "/src/style/index.css";

export {
    NotificationsPlugin,
    useNotification,
    useModal,
    ModalPlugin,
    ResponsivePlugin,
    IconPlugin,
    AuthPlugin,
    useAuth,
    SubmitButton as Pf_SubmitButton,
    Footer as Pf_Footer,
    ExpandTransition as Pf_ExpandTransition,
    RadioButtons as Pf_RadioButtons,
    Pf_Spinner,
};
