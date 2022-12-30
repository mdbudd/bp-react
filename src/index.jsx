import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import configureStore from "./store/configureStore"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import Routes from "./routes"

let gqluri = "http://localhost:9000/graphql"
if (process.env.NODE_ENV === "production") {
    gqluri = "https://example.co.uk/graphql"
}

const client = new ApolloClient({
    uri: gqluri,
})

const store = configureStore()

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Routes />
        </Provider>
    </ApolloProvider>,
)
