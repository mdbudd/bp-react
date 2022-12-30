import React, { useEffect } from "react"

export default props => {
    useEffect(() => {
        document.title = props.pageTitle
    }, [])

    return "Welcome Home!"
}
