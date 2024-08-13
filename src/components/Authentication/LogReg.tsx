import React /*, {useState}*/ from "react"
import {useAppSelector} from "../../app/hooks"
import Login, {isAuthenticated} from "./Login"
import Register from "./Register"
import {Box, /*Button,*/ Tab, Tabs, Typography} from "@mui/material"

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}
const LogReg = () => {
    const globalState = useAppSelector((state) => state.global)
    // const [, /*login*/ setLogin] = useState(true)

    const [value, setValue] = React.useState(1)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    // return login ? (
    //     <Box>
    //         <Login />
    //         <Button
    //             /* eslint-disable-next-line */
    //             variant={"egg" as any}
    //             sx={{
    //                 color: "#000",
    //                 background: "none",
    //                 "&:hover": {color: "#fff", background: "#000"},
    //             }}
    //             onClick={(e) => {
    //                 e.preventDefault()
    //                 setLogin(false)
    //             }}
    //             style={{float: "right"}}
    //         >
    //             Register
    //         </Button>
    //     </Box>
    // ) : (
    //     <Box>
    //         <Register />
    //         {globalState?.user.role !== "subscriber" && (
    //             <Button
    //                 /* eslint-disable-next-line */
    //                 variant={"egg" as any}
    //                 sx={{
    //                     color: "#000",
    //                     background: "none",
    //                     "&:hover": {color: "#fff", background: "#000"},
    //                 }}
    //                 onClick={(e) => {
    //                     e.preventDefault()
    //                     setLogin(true)
    //                 }}
    //                 style={{float: "right"}}
    //             >
    //                 Login
    //             </Button>
    //         )}
    //     </Box>
    // )

    const isAuthed = isAuthenticated()
    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                >
                    {!isAuthed && <Tab label="Login" {...a11yProps(1)} />}
                    {!isAuthed && <Tab label="Register" {...a11yProps(0)} />}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={1}>
                <Box>
                    <Register />
                    {globalState?.user.role !== "subscriber" && (
                        // <Button
                        //     /* eslint-disable-next-line */
                        //     variant={"egg" as any}
                        //     sx={{
                        //         color: "#000",
                        //         background: "none",
                        //         "&:hover": {color: "#fff", background: "#000"},
                        //     }}
                        //     onClick={(e) => {
                        //         e.preventDefault()
                        //         setLogin(true)
                        //     }}
                        //     style={{float: "right"}}
                        // >
                        //     Login
                        // </Button>
                        <></>
                    )}
                </Box>
            </CustomTabPanel>
            {!isAuthed && (
                <CustomTabPanel value={value} index={0}>
                    <Box>
                        <Login />
                        {/* <Button
                            variant={"egg" as any}
                            sx={{
                                color: "#000",
                                background: "none",
                                "&:hover": {color: "#fff", background: "#000"},
                            }}
                            onClick={(e) => {
                                e.preventDefault()
                                setLogin(false)
                            }}
                            style={{float: "right"}}
                        >
                            Register
                        </Button> */}
                    </Box>
                </CustomTabPanel>
            )}
        </Box>
    )
}
export default LogReg
