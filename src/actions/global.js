import {
    LOAD_GLOBAL,
    RESIZE_GLOBAL,
    SET_SECTION,
} from "../constants/action-types"

export function loadGlobal(args = { jwt: "", user: {} }) {
    return function (dispatch) {
        let json = { title: "BP React", ...args }
        dispatch({ type: LOAD_GLOBAL, payload: json })
    }
}
export function resizeGlobal(navPos = {}) {
    return function (dispatch) {
        let json = {
            height: window.innerHeight,
            width: window.innerWidth,
            navPos: navPos,
        }
        dispatch({ type: RESIZE_GLOBAL, payload: json })
    }
}
export function setSection(section) {
    section = document.getElementById(section)
    let left = section.offsetLeft
    let top = section.offsetTop
    return function (dispatch) {
        let json = {
            section: section,
            left: left,
            top: top,
        }
        dispatch({ type: SET_SECTION, payload: json })
    }
}
