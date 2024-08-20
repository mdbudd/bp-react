import "@testing-library/react/dont-cleanup-after-each"

import {configure} from "@testing-library/react"

process.env.APP_NAME = "App Name"
process.env.APP_STRAP = "App Strap"
process.env.APP1_NAME = "App1 Name"
process.env.APP1_STRAP = "App1 Strap"

configure({
    testIdAttribute: "data-automationid",
})
