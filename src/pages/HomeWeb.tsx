import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {Transition} from "react-transition-group"
import {animFadeInPage, animFadeOutUp, animFadeOutDown} from "../common/animations"
import Box from "@mui/material/Box"
import {HomeWebContent} from "../components/Content"
import {Drawer} from "../components/Drawer"
import {gsap} from "gsap"
import {useAppSelector, useAppDispatch} from "../app/hooks"
import {resizeGlobal} from "../features/global/globalSlice"
import {theme} from "../common/theme-mui"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
// import {useQuery, useMutation, gql} from "@apollo/client"

const egg = {
    width: "400px",
    height: "400px",
    transform: "rotate(8deg) translate(-50%,0)",
    marginTop: "-145px",
    position: "absolute",
    opacity: 0.1,
    left: "50%",
    backgroundSize: "cover",
}

// const CREATE_HIT = gql`
//     mutation createHit($title: String, $ref: String, $lat: String, $lon: String, $date: String) {
//         createHit(title: $title, ref: $ref, lat: $lat, lon: $lon, date: $date) {
//             title
//             ref
//             lat
//             lon
//             date
//         }
//     }
// `

/* eslint-disable-next-line */
export default (props) => {
    const duration = 0.4
    const [anim] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const [url, setUrl] = useState("/")
    const globalState = useAppSelector((state) => state.global)
    const dispatch = useAppDispatch()
    // const [, createHit] = useMutation(CREATE_HIT)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = props.pageTitle
        window.addEventListener("resize", resizeReset)
        window.addEventListener("load", resizeReset)
        resizeReset()
        dispatch(
            resizeGlobal({
                top: window.innerHeight / 2.7 + 140,
                right: "auto",
                bottom: "auto",
                left: window.innerWidth / 2 - 70,
            }),
        )
        // $(".btn-nav a").on("click", () => {
        //     setAnim(false)
        // })
        return () => {
            resizeReset()
            window.removeEventListener("resize", resizeReset)
        }
        /* eslint-disable-next-line */
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await hitCreator("Web View")
    //         data && createHit(data)
    //     }

    //     fetchData().catch(console.error)
    // }, [])

    const resizeReset = () => {
        dispatch(
            resizeGlobal({
                top: window.innerHeight / 2.7 + 140,
                right: "auto",
                bottom: "auto",
                left: window.innerWidth / 2 - 70,
            }),
        )
    }

    const {navPos} = globalState

    // if (redirect) {
    //     navigate(url) //figure out sending to right endpoint
    // } else {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <div
                    className="selected homeme dark app1"
                    id="home"
                    data-rel="Matt"
                    style={{height: globalState.height}}
                >
                    <Drawer />
                    <div className="inner">
                        <div className="content">
                            <Transition<undefined>
                                in={anim}
                                timeout={duration * 3}
                                appear
                                mountOnEnter
                                // unmountOnExit
                                enter
                                exit
                                onEntered={(n, done) => {
                                    if (anim) {
                                        animFadeInPage(n, duration).eventCallback(
                                            "onComplete",
                                            () => {
                                                return
                                            },
                                        )
                                    } else {
                                        gsap.to(n, {
                                            opacity: 0,
                                            // onComplete: done,
                                            duration,
                                        })
                                    }
                                }}
                                onExiting={(n: HTMLElement) => {
                                    if (!anim) {
                                        // add "active" class and yoyo back and forth. Open Dev Tools to watch the class attribute.

                                        animFadeOutUp(n, 0.3).eventCallback("onComplete", () => {
                                            setRedirect(true)
                                            setUrl(localStorage.getItem("navState"))
                                        })
                                    }
                                }}
                                addEndListener={(node: HTMLElement, done: () => void) => {
                                    node.addEventListener("transitionend", done, false)
                                }}
                            >
                                <div style={{opacity: 0}}>
                                    <div
                                        className="gallery-text"
                                        style={{
                                            paddingTop: globalState.height / 2.7 || 0,
                                        }}
                                    >
                                        <Box sx={egg}></Box>
                                        <HomeWebContent />
                                        {/* <Students /> */}
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                    <Transition<undefined>
                        in={anim}
                        timeout={duration}
                        appear
                        mountOnEnter
                        unmountOnExit={false}
                        enter
                        exit
                        onEntered={(n /*, done*/) => {
                            // console.info(done)
                            if (anim) {
                                animFadeInPage(n, duration).eventCallback("onComplete", () => {
                                    return
                                })

                                localStorage.setItem(
                                    "navPos",
                                    JSON.stringify({
                                        top: window.innerHeight / 2,
                                        right: "auto",
                                        bottom: "auto",
                                        left: window.innerWidth / 2 - 70,
                                    }),
                                )
                            }
                        }}
                        onExiting={(n: HTMLElement) => {
                            // console.info(done)
                            gsap.to("#home", {
                                className: "-=dark",
                                ease: "power1.inOut",
                                duration: 0.3,
                            }).eventCallback("onComplete", () => {
                                animFadeOutUp(n, 0.3).eventCallback("onComplete", () => {
                                    setRedirect(true)
                                    setUrl(localStorage.getItem("navState"))
                                })
                            })

                            animFadeOutDown(
                                n,
                                duration - 150,
                                null,
                                null,
                                null,
                                null,
                            ).eventCallback("onComplete", () => {
                                // setRedirect(true)
                                setUrl(localStorage.getItem("navState"))
                            })
                        }}
                        addEndListener={(node: HTMLElement, done: () => void) => {
                            node.addEventListener("transitionend", done, false)
                        }}
                    >
                        <div
                            className="r d-inline"
                            style={{
                                left: typeof navPos.left == "number" && navPos.left - 20,
                                right: navPos.right,
                                top: navPos.top,
                                bottom: navPos.bottom,
                                zIndex: 1200,
                            }}
                        >
                            {/* <NavApp items={globalState.nav || []} /> */}
                            {/* {console.info(globalState?.user.role)} */}
                        </div>
                    </Transition>
                </div>
            </ThemeProvider>
        )
    // }
}
