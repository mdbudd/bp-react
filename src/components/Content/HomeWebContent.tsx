import React from "react"

/* eslint-disable-next-line */
const HelloWorld: React.FC = () => (
    <div className="flex-grow-1 d-flex align-items-center justify-content-center search-image-container-full">
        <div className="text">
            <h2>{process.env.APP1_NAME}</h2>
            <p className="pb-2 mb-0 large">{process.env.APP1_STRAP}</p>
        </div>
    </div>
)

export default HelloWorld
