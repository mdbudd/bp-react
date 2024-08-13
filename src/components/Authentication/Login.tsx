import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {loadGlobal} from "../../features/global/globalSlice"
import {Box, Grid, TextField, Button} from "@mui/material"
import axios from "axios"

let BASE_URL = process.env.SERVER_DEV
if (process.env.NODE_ENV === "production") {
    BASE_URL = process.env.SERVER_PROD
}

export function login(data) {
    return axios
        .post(
            `${BASE_URL}/api/login`,
            {name: data.name, password: data.password},
            {headers: {"content-type": "application/json"}},
        )

        .then((response) => {
            localStorage.setItem("x-access-token", response.data.token)
            const exp = Date.now() + 2 * 60 * 60 * 1000
            localStorage.setItem("x-access-token-expiration", exp.toString())

            return response.data
        })
        .catch((err) => Promise.reject({message: "Authentication Failed!", err}))
}

export function user(token) {
    return axios
        .post(`${BASE_URL}/api/user`, {token}, {headers: {"content-type": "application/json"}})

        .then((response) => {
            return response.data
        })
        .catch((err) => Promise.reject({message: "User Gathered!", err}))
}

export function logOut(navigate) {
    localStorage.removeItem("x-access-token")
    console.info("logged out")
    // dispatch(loadGlobal({ jwt: undefined, user: { name: undefined, role: undefined } }))
    // window.location = route
    navigate("/")
}

export function isAuthenticated() {
    const token = localStorage.getItem("x-access-token")
    const isAuth = token && Number(localStorage.getItem("x-access-token-expiration")) > Date.now()
    return isAuth
}

const Login = (props) => {
    const dispatch = useDispatch()
    const [auth, setAuth] = useState({name: "", password: ""})

    const handleInputChange = (event) => {
        setAuth({...auth, [event.target.name]: event.target.value})
    }

    const submitLogin = (event, location) => {
        event.preventDefault()
        login(auth)
            .then((currUser) => {
                currUser &&
                    dispatch(
                        loadGlobal({
                            jwt: currUser?.token,
                            user: {
                                name: currUser?.user?.name,
                                role: currUser?.user?.role,
                            },
                        }),
                    )
                !currUser && alert("username and/or password are incorrect, please try again")
                if (location) {
                    window.location = location
                }
            })
            .catch((err) => console.log(err))
    }

    const isAuthed = isAuthenticated()
    return (
        !isAuthed && (
            <Box>
                {/* <Typography variant="h4" align="center" margin="dense">
                    Log In
                </Typography> */}
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            margin="dense"
                            onChange={handleInputChange}
                        />
                        {/* <Typography variant="inherit" color="textSecondary">
              Username
            </Typography> */}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            margin="dense"
                            onChange={handleInputChange}
                        />
                        {/* <Typography variant="inherit" color="textSecondary">
              Password
            </Typography> */}
                    </Grid>
                </Grid>

                <Box mt={3}>
                    <Button
                        /* eslint-disable-next-line */
                        variant={"egg" as any}
                        sx={{
                            color: "#000",
                            background: "none",
                            "&:hover": {color: "#fff", background: "#000"},
                        }}
                        onClick={(e) => submitLogin(e, props.location)}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        )
    )
}
export default Login
