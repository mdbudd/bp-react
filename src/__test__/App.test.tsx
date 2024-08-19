import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"

import React from "react"
import {store} from "../app/store"
import {Provider} from "react-redux"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import {default as AppRoutes} from "../app/Routes"

describe("App tests", () => {
    it("should contains the switch button", () => {
        const client = new ApolloClient({
            cache: new InMemoryCache(),
        })

        render(
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <AppRoutes />
                </ApolloProvider>
            </Provider>,
        )

        const heading: HTMLElement = screen.getByText(/App Switch/i)
        expect(heading).toBeInTheDocument()
    })
})
