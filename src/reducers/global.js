import {
    LOAD_GLOBAL,
    RESIZE_GLOBAL,
    SET_SECTION,
} from "../constants/action-types"

const initialState = () => {
    return {
        title: "Personal site",
        jwt: undefined,
        user: { name: undefined, role: undefined },
        nav: {
            main: [
                {
                    title: " ",
                    type: "home",
                    link: "/",
                    public: true,
                },
                {
                    title: " ",
                    type: "about",
                    link: "/about",
                    anim: true,
                    public: true,
                },
                {
                    title: " ",
                    type: "cv",
                    link: "/cv",
                    anim: true,
                    public: true,
                },
                {
                    title: " ",
                    type: "work",
                    link: "/work",
                    anim: true,
                    public: true,
                },
                {
                    title: " ",
                    type: "close",
                    link: "/logout",
                    anim: true,
                    public: false,
                },
                // {
                //   title: "Exp",
                //   type: 'apps',
                //   link: "/available-apps",
                //   anim: true
                // },
            ],
        },

        width: window.innerWidth,
        height: window.innerHeight,
        navPos: JSON.parse(localStorage.getItem("navPos")) || {},
    }
}

export function globalReducer(state = initialState(), action) {
    switch (action.type) {
        case LOAD_GLOBAL: {
            const search = {
                ...state,
                title: action.payload.title || state.title,
                jwt: action.payload.jwt || state.jwt,
                user: action.payload.user || state.user,
                nav: action.payload.nav || state.nav,
            }
            return search
        }
        case RESIZE_GLOBAL: {
            const global = {
                ...state,
                width: action.payload.width,
                height: action.payload.height,
                navPos: action.payload.navPos,
            }
            return global
        }
        case SET_SECTION: {
            const global = {
                ...state,
                section: action.payload.section,
                top: action.payload.top,
                left: action.payload.left,
            }
            return global
        }
        default: {
            return state
        }
    }
}
