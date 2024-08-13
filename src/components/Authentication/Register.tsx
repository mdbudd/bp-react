import React, {useState} from "react"
import {useAppSelector} from "../../app/hooks"
import {Box, Grid, TextField, /*Typography,*/ Button} from "@mui/material"

import axios from "axios"

let BASE_URL = process.env.SERVER_DEV
if (process.env.NODE_ENV === "production") {
    BASE_URL = process.env.SERVER_PROD
}

export function register(data) {
    console.info(data)
    return axios
        .post(
            `${BASE_URL}/api/register`,
            {name: data.name, password: data.password},
            {headers: {"content-type": "application/json"}},
        )

        .then((response) => {
            return response.data
        })
        .catch((err) => Promise.reject(err.response.data))
}

const Register = (props) => {
    const globalState = useAppSelector((state) => state.global)
    const [auth, setAuth] = useState({name: "", password: ""})
    const [, setLogin] = useState(true)
    const [message, setMessage] = useState({message: undefined})

    const handleInputChange = (event) => {
        setAuth({...auth, [event.target.name]: event.target.value})
    }
    console.info(globalState)
    const submitReg = (event, location) => {
        console.info(location)
        event.preventDefault()
        auth.name.length > 6 &&
            auth.password.length > 6 &&
            register(auth)
                .then((response) => {
                    console.info("gothere")
                    setMessage(response)
                    setLogin(true)
                })
                .catch((err) => setMessage(err))
        auth.name.length < 6 && alert("username needs to be greater than 6 characters")
        auth.password.length < 6 && alert("password needs to be greater than 6 characters")
    }
    console.info(globalState?.user.role)
    return (
        <Box>
            {/* <Typography variant="h4" align="center" margin="dense">
                Register
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
                </Grid>
            </Grid>

            <Box mt={3}>
                <Button
                    /* eslint-disable-next-line */
                    variant={"egg" as any}
                    onClick={(e) => submitReg(e, props.location || "/")}
                >
                    Register
                </Button>
                {message && message.message}
            </Box>
        </Box>
    )
}
export default Register
