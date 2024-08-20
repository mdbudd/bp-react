import "@testing-library/jest-dom"

import {render, screen, waitFor} from "@testing-library/react"

import renderer from "react-test-renderer"
import React from "react"

import {MockedProvider} from "@apollo/client/testing"

// The component AND the query need to be exported
import {GET_DOG_QUERY, Dog} from "../components/Dog"

const mocks = [
    {
        request: {
            query: GET_DOG_QUERY,
            variables: {
                name: "Buck",
            },
        },
        result: () => {
            // do something, such as recording that this function has been called
            // ...
            return {
                data: {
                    dog: {id: "1", name: "Buck", breed: "bulldog"},
                },
            }
        },
    },
]

describe("Dog Component tests", () => {
    it("renders without error", () => {
        renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Dog name="Buck" />
            </MockedProvider>,
        )
    })

    // it("should render loading state initially", () => {
    //     const component = renderer.create(
    //         <MockedProvider mocks={[]}>
    //             <Dog name="Jim" />
    //         </MockedProvider>,
    //     )

    //     const tree = component.toJSON()
    //     expect(tree.children).toContain("Loading...")
    // })

    it("should render dog", async () => {
        const dogMock = [
            {
                request: {
                    query: GET_DOG_QUERY,
                    variables: {name: "Buck"},
                },
                result: {
                    data: {dog: {id: 1, name: "Buck", breed: "poodle"}},
                },
            },
        ]

        const {container} = render(
            <MockedProvider mocks={dogMock} addTypename={false}>
                <Dog name="Buck" />
            </MockedProvider>,
        )

        await waitFor(() => new Promise((res) => setTimeout(res, 0)))

        // const p = component.root.findByType("p")
        const p: HTMLElement | null = container.querySelector("p")
        // expect(container).toMatchSnapshot()
        expect(p).not.toBeNull()
        p && expect(p.textContent).toBe("Buck is a poodle")
    })
})
