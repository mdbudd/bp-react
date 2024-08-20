import {render, screen, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"

import React from "react"
import {store} from "../app/store"
import {Provider} from "react-redux"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import {default as AppRoutes} from "../app/Routes"

describe("App tests", () => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
    })

    const {container} = render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AppRoutes />
            </ApolloProvider>
        </Provider>,
    )

    it("should contain the switch button text", async () => {
        const button: HTMLElement = screen.getByText(/App Switch/i)
        expect(button).toBeInTheDocument()
    })

    it("should contain the main app name from env variable", () => {
        const h2: HTMLElement | null = container.querySelector("h2")
        expect(h2).not.toBeNull()
        h2 && expect(h2.textContent).toBe("App Name")
    })
})
