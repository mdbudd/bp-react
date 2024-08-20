import React from "react"
import {render, waitFor} from "@testing-library/react"
import {MockedProvider} from "@apollo/client/testing"
import {TopProjects, TOP_PROJECTS} from "../components/TopProjects"

function createRepo(name, description, stars) {
    return {
        node: {
            name,
            description,
            stargazers: {
                totalCount: stars,
                __typename: "StargazerConnection",
            },
            __typename: "Repository",
        },
        __typename: "SearchResultItemEdge",
    }
}

const mocks = [
    {
        request: {
            query: TOP_PROJECTS,
            variables: {
                queryString: "javascript",
            },
        },
        result: {
            data: {
                search: {
                    edges: [
                        createRepo("js-stuff", "Some JS stuff", 1000000),
                        createRepo("jsdoc", "Make docs for JS", "900000"),
                        createRepo("anotherexample", "Some othre description", "20000"),
                    ],
                    __typename: "SearchResultItemConnection",
                },
            },
        },
    },
]

test("renders learn react link", () => {
    const {container, getByText} = render(
        <MockedProvider mocks={mocks}>
            <TopProjects />
        </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
})

test("renders top project list", async () => {
    const {container} = render(
        <MockedProvider mocks={mocks}>
            <TopProjects />
        </MockedProvider>,
    )

    await waitFor(() => new Promise((res) => setTimeout(res, 0)))

    expect(container).toMatchSnapshot()
})
