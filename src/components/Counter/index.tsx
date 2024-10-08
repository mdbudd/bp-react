import React from "react"
// import {Main} from "../Navigation"

import {useAppSelector, useAppDispatch} from "../../app/hooks"

import {decrement, increment} from "../../features/counter/counterSlice"

export function Counter() {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <div>
            {/* <Main /> */}
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    )
}
