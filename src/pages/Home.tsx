import React, {useState, useEffect, useRef, useCallback} from "react"
import {gsap} from "gsap"
import {animFadeInPage, animFadeOutUp, animFadeOutDown} from "../common/animations"
import {useNavigate} from "react-router-dom"
import {HomeContent} from "../components/Content"
import {NavApp} from "../components/Navigation"
import {useAppSelector, useAppDispatch} from "../app/hooks"
import {resizeGlobal} from "../features/global/globalSlice"

const duration = 0.4

const Anim = (props) => {
    const [transition, setTransition] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [url, setUrl] = useState("/")
    const globalState = useAppSelector((state) => state.global)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const app = useRef<HTMLDivElement>(null)
    const tl = useRef<GSAPTimeline>()

    const resizeReset = useCallback(() => {
        dispatch(
            resizeGlobal({
                top: (typeof window.innerHeight == "number" && window.innerHeight / 2.7 + 140) || 0,
                height: (typeof window.innerHeight == "number" && window.innerHeight) || 0,
                right: 500,
                bottom: "auto",
                left: (typeof window.innerWidth == "number" && window.innerWidth / 2 - 70) || 0,

                navPos: {
                    top:
                        (typeof window.innerHeight == "number" && window.innerHeight / 2.7 + 140) ||
                        0,
                    right: "auto",
                    bottom: "auto",
                    left: (typeof window.innerWidth == "number" && window.innerWidth / 2 - 70) || 0,
                },
            }),
        )
    }, [dispatch])

    useEffect(() => {
        resizeReset()
        document.title = props.pageTitle || globalState.title
        window.addEventListener("resize", resizeReset)
        window.addEventListener("load", resizeReset)

        const ctx = gsap.context(() => {
            animFadeInPage([".content"], duration).eventCallback("onComplete", () => {
                animFadeInPage([".nav"], duration).eventCallback("onComplete", () => {
                    return
                })
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
            // tl.current = gsap
            //     .timeline()
            //     // .to(".content", {opacity: 1, duration: 1})
            //     .to([".content", ".nav"], fadeInOne)
            //     .call(funky, ["interlude!"])
            //     // .to(".square2", {x: 200, duration: 1})
        }, app)
        return () => {
            resizeReset()
            window.removeEventListener("resize", resizeReset)
            ctx.revert()
        }
        /* eslint-disable-next-line */
    }, [])
    useEffect(() => {
        if (transition) {
            animFadeOutUp([".content"], 0.3).eventCallback("onComplete", () => {
                setRedirect(true)
                setUrl(localStorage.getItem("navState") || "")
            })
        }
    }, [transition])

    useEffect(() => {
        if (redirect) {
            navigate(url)
        }
    }, [redirect, navigate, url])

    const navClick = () => {
        setTransition(true)
    }
    const navPos = globalState.navPos

    return (
        <div
            className="selected homeme dark app"
            id="home"
            ref={app}
            style={{height: globalState.height}}
        >
            <div className="inner">
                <div className="content">
                    <div style={{opacity: 0}} className="content">
                        <div
                            className="gallery-text"
                            style={{
                                paddingTop: globalState?.height && globalState?.height / 2.7,
                            }}
                        >
                            <HomeContent />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="r d-inline nav"
                style={{
                    left: (typeof navPos?.left == "number" && navPos?.left - 20) || 0,
                    right: navPos?.right,
                    top: navPos?.top,
                    bottom: navPos?.bottom,
                    opacity: 0,
                }}
            >
                <NavApp items={globalState.nav || []} navClick={navClick} />
            </div>
        </div>
    )
}
export default Anim
