import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import {useAppSelector} from "../../app/hooks"
import {Box, IconButton /*, Button*/} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LogoutIcon from "@mui/icons-material/Logout"
import Modal from "@mui/material/Modal"
import PayPal from "./Paypal"
import LogReg from "./LogReg"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
}

const LogRegSub = () => {
    const globalState = useAppSelector((state) => state.global)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        if (globalState?.user?.role == "subscriber") {
            setOpen(false)
        }
    }, [globalState?.user?.role])

    return (
        <>
            <IconButton
                // variant={"egg" as any}
                onClick={handleOpen}
                sx={{
                    color: "#333",
                    background: "none",
                    "&:hover": {color: "#666", background: "none"},
                }}
            >
                {/* <LogoutIcon /> */}
                {globalState?.user?.role === undefined ? (
                    <LoginIcon />
                ) : ["subscriber"].includes(globalState?.user?.role) ? (
                    <LogoutIcon />
                ) : (
                    <LockOpenIcon />
                )}
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {["subscriber", undefined].includes(globalState?.user?.role) ? (
                        <>
                            {globalState?.user?.role === "subscriber" && (
                                <Box>
                                    <Link to="/logout">Logout</Link>
                                    <Box>or</Box>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    display: "inline-block",
                                    margin: "0 0 -10px 5px",
                                }}
                            >
                                {" "}
                                <LogReg />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box>
                                <Link to="/logout">Logout</Link>
                                <Box>or</Box>
                            </Box>
                            <PayPal items={[{id: 2, quantity: 1}]} userRole={"subscriber"} />
                        </>
                    )}
                </Box>
            </Modal>
        </>
    )
}
export default LogRegSub
