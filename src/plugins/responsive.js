import { reactive } from "vue";

const breakpoints = reactive({});

export default function install(app) {
    app.config.globalProperties.$responsive = reactive({
        breakpoints,
        init() {
            const mediaQueryLists = [
                { breakpoint: "sm", mediaQueryList: window.matchMedia("(min-width: 640px)") },
                { breakpoint: "md", mediaQueryList: window.matchMedia("(min-width: 768px)") },
                { breakpoint: "lg", mediaQueryList: window.matchMedia("(min-width: 1024px)") },
                { breakpoint: "xl", mediaQueryList: window.matchMedia("(min-width: 1280px)") },
                { breakpoint: "2xl", mediaQueryList: window.matchMedia("(min-width: 1536px)") },
            ];
            mediaQueryLists.forEach(({ breakpoint, mediaQueryList }) => {
                function onMediaQueryListChange(evt) {
                    breakpoints[breakpoint] = evt.matches;
                }

                mediaQueryList.addListener(onMediaQueryListChange);

                // We define the initial state because mediaQuery listeners will not be called until one value changes
                breakpoints[breakpoint] = mediaQueryList.matches;
            });
        },
    });
}
