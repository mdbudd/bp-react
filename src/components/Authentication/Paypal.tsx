import React, {useRef, useEffect} from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"
import {loadGlobal} from "../../features/global/globalSlice"
import axios from "axios"

let BASE_URL = process.env.SERVER_DEV
if (process.env.NODE_ENV === "production") {
    BASE_URL = process.env.SERVER_PROD
}
declare global {
    interface Window {
        /* eslint-disable-next-line */
        paypal: any
    }
}

export default function Paypal(props) {
    const {
        items = [
            {
                id: 1,
                quantity: 1,
            },
            // { id: 2, quantity: 3 },
        ],
        userRole = "",
    } = props
    const paypal = useRef<HTMLDivElement>(null)
    const globalState = useAppSelector((state) => state.global)
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    color: "gold",
                    shape: "pill",
                    layout: "horizontal",
                },
                createOrder: function () {
                    return fetch(`${BASE_URL}/create-order`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            items,
                        }),
                    })
                        .then((res) => {
                            if (res.ok) {
                                return res.json()
                            }
                            return res.json().then((json) => Promise.reject(json))
                        })
                        .then(({id}) => {
                            console.info(id)
                            return id
                        })
                        .catch((e) => {
                            console.error(e.error)
                        })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    console.info(order)
                    //TODO: Add subscriptions after successful purchase

                    /*
          return fetch(`${BASE_URL}/api/subscribe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: currState.global.jwt,
              role:userRole,
              order,
            }),
          })
            .then(res => {
              if (res.ok) {
                let data = res.json()
                console.log(data)
                localStorage.setItem("x-access-token", data.token)
                localStorage.setItem("x-access-token-expiration", Date.now() + 2 * 60 * 60 * 1000)
                dispatch(loadGlobal({ jwt: data.token, user: { name: data.user.name, role: data.user.role } }))
                return res.json()
              }
              return res.json().then(json => Promise.reject(json))
            })
            .catch(err => alert(err))
*/

                    return axios
                        .post(
                            `${BASE_URL}/api/subscribe`,
                            {
                                token: globalState.jwt,
                                role: userRole,
                                order,
                            },
                            {headers: {"content-type": "application/json"}},
                        )

                        .then((response) => {
                            localStorage.setItem("x-access-token", response.data.token)

                            const exp = Date.now() + 2 * 60 * 60 * 1000
                            localStorage.setItem("x-access-token-expiration", exp.toString())
                            console.info(response.data)
                            return response.data
                        })
                        .then((user) => {
                            dispatch(
                                loadGlobal({
                                    jwt: user.token,
                                    user: {
                                        name: user.user.name,
                                        role: user.user.role,
                                    },
                                }),
                            )
                        })
                        .catch((err) => Promise.reject(err))
                },
                onError: (err) => {
                    console.info(err)
                },
            })
            .render(paypal.current)
        /* eslint-disable-next-line */
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}
