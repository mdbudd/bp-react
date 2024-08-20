import React, {useEffect, useState} from "react"
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import {Home, HomeWeb, NotFound} from "../pages"
import {user} from "../components/Authentication/Login"
import {useAppDispatch} from "./hooks"
import {loadGlobal} from "../features/global/globalSlice"

const RouteComponent: React.FC = () => {
    const [pageTitle, setPageTitle] = useState("")
    const [site, setSite] = useState("matt")
    const dispatch = useAppDispatch()

    const Logout = () => {
        const navigate = useNavigate()

        useEffect(() => {
            if (localStorage.getItem("x-access-token")) {
                localStorage.removeItem("x-access-token")
                console.info("logged out")
                dispatch(
                    loadGlobal({
                        jwt: undefined,
                        user: {name: undefined, role: undefined},
                    }),
                )
                navigate("/")
            }
        }, [navigate])
        return <></>
    }

    const siteSwitch = () => {
        const currSite = localStorage.getItem("site")
        let name = "matt"
        if (currSite == null) {
            name = "web"
        }
        if (currSite == "matt") {
            name = "web"
        }
        if (currSite == "web") {
            name = "matt"
        }
        localStorage.setItem("site", name)
        setSite(name)
    }

    useEffect(() => {
        const token = localStorage.getItem("x-access-token")
        const exp = localStorage.getItem("x-access-token-expiration")
        const isAuth = token && exp && exp > Date.now().toString()

        isAuth &&
            user(token)
                .then((currUser) => {
                    dispatch(
                        loadGlobal({
                            jwt: currUser.token,
                            user: {
                                name: currUser.user.name,
                                role: currUser.user.role,
                            },
                        }),
                    )
                })
                .catch((err) => alert(err))

        const {host} = window.location
        const web = host.includes("domain.co.uk")
        const local = host.includes("localhost")
        const siteStore = localStorage.getItem("site")
        if (web && !local) {
            setSite("web")
        } else if (!web && !local) {
            setSite("matt")
        }

        if (siteStore && local) {
            setSite(siteStore)
        }
        /* eslint-disable-next-line */
    }, [])

    useEffect(() => {
        let fav = ""
        const {host} = window.location
        const title = [process.env.APP_TITLE, process.env.APP1_TITLE]
        if (site == "web") {
            fav = "/assets/favicon/favicon2.ico"
            setPageTitle(title[1] || "")
        } else {
            fav = "/assets/favicon/favicon1.ico"
            setPageTitle(title[0] || "")
        }
        let link = document.querySelector("link[rel~='icon']")
        if (!link) {
            link = document.createElement("link")
            link["rel"] = "icon"
            document.getElementsByTagName("head")[0].appendChild(link)
        }
        link["href"] = `${location.protocol}//${host}${fav}`
    }, [site])

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    return (
        <BrowserRouter>
            {window.location.host.includes("localhost") && (
                <button
                    onClick={siteSwitch}
                    style={{
                        position: "fixed",
                        zIndex: 3000,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    App Switch
                </button>
            )}
            {site == "matt" && (
                <Routes>
                    <Route path="/" element={<Home pageTitle={pageTitle} location={location} />} />

                    <Route path={`/logout`} element={<Logout />} />
                    <Route path={`/*`} element={<NotFound />} />
                </Routes>
            )}
            {site == "web" && (
                <Routes>
                    <Route
                        path="/"
                        element={<HomeWeb pageTitle={pageTitle} location={location} />}
                    />
                    <Route path={`/logout`} element={<Logout />} />
                    <Route path={`/*`} element={<NotFound />} />
                </Routes>
            )}
        </BrowserRouter>
    )
}

export default RouteComponent
