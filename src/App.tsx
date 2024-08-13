import React, {useEffect, useState} from "react"
import {default as AppRoutes} from "./app/Routes"
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"

let gqluri = `${process.env.SERVER_DEV}/graphql`
if (process.env.NODE_ENV === "production") {
    gqluri = `${process.env.SERVER_PROD}/graphql`
}

const App: React.FC = () => {
    const appClient = new ApolloClient({
        uri: gqluri,

        cache: new InMemoryCache(),
    })

    const [client, setClient] = useState(appClient || undefined)

    useEffect(() => {
        setClient(appClient)
        /* eslint-disable-next-line */
    }, [])

    return client ? (
        <ApolloProvider client={client}>
            <AppRoutes />
        </ApolloProvider>
    ) : (
        <>loading</>
    )
}

export default App
