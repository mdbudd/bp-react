import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import type {RootState} from "../../app/store"
import nav from "../../../data/nav.json"
import info from "../../../data/info.json"

// Define a type for the slice state
interface GlobalState {
    title?: string
    jwt?: string | undefined
    user?: {name: string | undefined; role: string | undefined}
    nav?: object
    width?: number
    height?: number
    navPos?: {left: string | number; right: string | number; top: string | number; bottom: string | number}
    top?: string | number
    left?: string | number
    right?: string | number
    bottom?: string | number
    section?: string
}
const initialState: GlobalState = {
    title: info.title,
    jwt: undefined,
    user: {name: undefined, role: undefined},
    nav,
    width: (typeof window !== "undefined" && window?.innerWidth) || 0,
    height: (typeof window !== "undefined" && window?.innerHeight) || 0,
    navPos:  typeof localStorage !== "undefined"
    ? JSON.parse(
          localStorage.getItem("navPos") ||
              '{"top":496.5,"right":"auto","bottom":"auto","left":889}',
      )
    : {},
    top: 0,
    left: "auto",
    right: "auto",
    bottom: 0,
    section: "",
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        loadGlobal: (state, action: PayloadAction<GlobalState>) => {
            state.title = action.payload.title || state.title
            state.jwt = action.payload.jwt || state.jwt
            state.user = action.payload.user || state.user
            state.nav = action.payload.nav || state.nav
        },
        resizeGlobal: (state, action: PayloadAction<GlobalState>) => {
            state.width = window.innerWidth || state.width
            state.height = window.innerHeight || state.width
            state.navPos = action.payload.navPos || state.navPos
        },
        setGlobal: (state, action: PayloadAction<GlobalState>) => {
            state.section = action.payload.section
            state.top = action.payload.top
            state.left = action.payload.left
        },
    },
})

export const {loadGlobal, resizeGlobal, setGlobal} = globalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGlobal = (state: RootState) => state.global

export default globalSlice.reducer
