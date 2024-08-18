import React from "react"
import {createRoot} from "react-dom/client"
import {store} from "./app/store"
import {Provider} from "react-redux"
import App from "./App"
import "../scss/main.scss"

const domNode = document.getElementById("react-root")
const root = createRoot(domNode)
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
)
