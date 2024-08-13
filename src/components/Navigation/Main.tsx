import React from "react"
import {Link} from "react-router-dom"

const Main: React.FC = () => (
    <>
        <Link to={"/"}>Home</Link>
        <Link to={"/counter"}>Counter</Link>
        <Link to={"/home"}>Alt</Link>
    </>
)

export default Main
