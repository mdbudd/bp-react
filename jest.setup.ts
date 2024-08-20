import "@testing-library/react/dont-cleanup-after-each"

import {configure} from "@testing-library/react"

process.env.APP_NAME = "App Name"
process.env.APP_STRAP = "App Strap"

configure({
    testIdAttribute: "data-automationid",
})
