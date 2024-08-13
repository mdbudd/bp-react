import React from "react"
import {hydrateRoot} from "react-dom/client"
import {store} from "./app/store"
import {Provider} from "react-redux"
import App from "./App"
import "../scss/main.scss"

const domNode = document.getElementById("react-root")
hydrateRoot(
    domNode as HTMLElement,
    <Provider store={store}>
        <App />
    </Provider>,
)
