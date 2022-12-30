import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages"

export default () => {
    const [pageTitle, setPageTitle] = useState("")
    const currState = useSelector(state => state)

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            console.info("GLOBAL STATE:", currState)
        }
    }, [currState])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home pageTitle={pageTitle} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
