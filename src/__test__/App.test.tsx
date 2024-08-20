import {render, screen, waitFor, fireEvent} from "@testing-library/react"
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

    it("should contain the switch button text", () => {
        const button: HTMLElement = screen.getByText(/App Switch/i)
        expect(button).toBeInTheDocument()
    })

    it("should contain different app name between switches", () => {
        const h2: HTMLElement | null = container.querySelector("h2")
        expect(h2).not.toBeNull()
        h2 && expect(h2.textContent).toBe("App Name")
        const button = screen.getByText(/App Switch/i)
        fireEvent.click(button)
        const h2Clicked: HTMLElement | null = container.querySelector("h2")
        expect(h2Clicked).not.toBeNull()
        h2Clicked && expect(h2Clicked.textContent).toBe("App1 Name")
    })
})
