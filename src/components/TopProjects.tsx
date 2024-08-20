import React from "react"
import {useQuery, gql} from "@apollo/client"

export const TOP_PROJECTS = gql`
    query SearchTopProjects($queryString: String!) {
        search(query: $queryString, type: REPOSITORY, first: 10) {
            edges {
                node {
                    ... on Repository {
                        name
                        description
                        stargazers {
                            totalCount
                        }
                    }
                }
            }
        }
    }
`

export function TopProjects() {
    const {loading, error, data} = useQuery(TOP_PROJECTS, {
        variables: {
            queryString: "javascript",
        },
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Oh no!</p>
    }

    return (
        <ul>
            {data.search.edges.map(({node}) => (
                <li key={node.name}>
                    {node.description} | {node.stargazers.totalCount} Stars
                </li>
            ))}
        </ul>
    )
}
