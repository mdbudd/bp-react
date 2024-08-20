import "@testing-library/jest-dom"

import {render, screen, waitFor} from "@testing-library/react"

import renderer from "react-test-renderer"
import React from "react"
import {store} from "../app/store"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import {Provider} from "react-redux"

import {Login, LogRegSub, Register, LogReg} from "../components/Authentication"
import {Counter} from "../components/Counter"

describe("Login Component tests", () => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
    })
    it("Login renders without error", () => {
        renderer.create(
            <Provider store={store}>
                <Login />
            </Provider>,
        )
    })
    it("LogRegSub renders without error", () => {
        renderer.create(
            <Provider store={store}>
                <LogRegSub />
            </Provider>,
        )
    })
    it("Register renders without error", () => {
        renderer.create(
            <Provider store={store}>
                <Register />
            </Provider>,
        )
    })
    it("LogReg renders without error", () => {
        renderer.create(
            <Provider store={store}>
                <Counter />
            </Provider>,
        )
    })
})
