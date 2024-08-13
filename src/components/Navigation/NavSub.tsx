import React, {Fragment, useState} from "react"
import {Link} from "react-router-dom"
import {Icon} from "../Icons"
// import { PersonImg } from "./results"
// import { isAuthenticated } from "../components/login"

export const NavSub = (props) => {
    return (
        <div className="navigation-sub">
            <div className="row no-gutters">
                <nav className="navbar navbar-expand-lg navbar-light w-100">
                    <div className="collapse navbar-collapse h-100" id="navbarText">
                        {props.getItems(props.data)}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export const NavButt = (props) => {
    const {type, active, to, redirect = false, navClick} = props
    let {buttonText} = props

    const [, setLight] = useState(0)
    // console.log(useState(9))
    const setOff = () => setLight(0)
    const setOn = () => setLight(1)
    // let fillColor = light === 1 ? "#ffbb73" : "#000000"

    buttonText = buttonText !== undefined ? buttonText : type
    const activeClass = active ? " active" : ""
    const disClass = active ? " disabled" : ""
    const onClick = (e) => {
        e.preventDefault()
        localStorage.setItem("navState", to)
        navClick()
    }
    const noClick = (e) => {
        e.preventDefault()
        localStorage.setItem("navState", to)
        navClick()
    }
    return (
        <div className={`btn btn-nav btn-inline ${activeClass} ${disClass}`}>
            <Link
                to={to}
                onClick={redirect ? onClick : noClick}
                onMouseOver={setOn}
                onMouseOut={setOff}
            >
                <div className="d-inline-block">
                    <Icon type={type} vb="0 0 184 184" />
                </div>
                <p>
                    {buttonText}
                    {/* {useContext(JediContext)} */}
                    {/* {fillColor} */}
                </p>
            </Link>
        </div>
    )
}

export const NavMain = (props) => {
    const {cat} = props
    let {term} = props
    term = term || localStorage.getItem("searchTerm")
    let browseUrl = cat != undefined ? `/search/${cat}/${term}` : ""
    browseUrl = term != "" ? browseUrl : ""
    const activeA = props.apps != undefined ? false : true
    const activeB = !activeA
    return (
        <Fragment>
            <NavButt to={browseUrl} type={"portal"} buttonText={"Browse"} active={activeA} />
            <NavButt to={`/available-apps`} type={"apps"} buttonText={"Hub"} active={activeB} />
            <div className="d-inline-block align-middle pl-3 pt-1">
                {/* <PersonImg racf={racf} /> */}
            </div>
        </Fragment>
    )
}

export const NavApp = (props) => {
    const getNavLinkClass = (path) => {
        return location.pathname === path ? true : false
    }
    const links = props.items.main.map((item, index) => {
        // console.log(((location.pathname == '/') && (item.link == '/')))
        // console.log(item)
        if (["/", "/anim"].includes(location.pathname) && ["/", "/anim"].includes(item.link)) {
            return ""
        } else if (!item.public /*&& !isAuthenticated()*/) {
            return ""
        } else {
            return (
                <NavButt
                    to={item.link}
                    type={item.type || "portal"}
                    buttonText={item.title}
                    active={getNavLinkClass(item.link)}
                    key={index}
                    redirect={item.anim}
                    navClick={props.navClick}
                />
            )
        }
    })

    return links
}
