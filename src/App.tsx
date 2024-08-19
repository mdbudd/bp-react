import React, {useEffect, useState} from "react"

import {store} from "./app/store"
import {Provider} from "react-redux"

import {default as AppRoutes} from "./app/Routes"
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"

let gqluri = `${process.env.SERVER_DEV}/graphql`
if (process.env.NODE_ENV === "production") {
    gqluri = `${process.env.SERVER_PROD}/graphql`
}
const appClient = new ApolloClient({
    uri: gqluri,

    cache: new InMemoryCache(),
})

const App: React.FC = (props) => {
    const [client, setClient] = useState(appClient || undefined)

    useEffect(() => {
        setClient(appClient)
        /* eslint-disable-next-line */
    }, [])

    return client ? (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AppRoutes />
            </ApolloProvider>
        </Provider>
    ) : (
        <>loading</>
    )
}

export default App
