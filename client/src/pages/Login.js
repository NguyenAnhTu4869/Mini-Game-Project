import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../redux-store/user/user.slice";
import { Formik, Form, ErrorMessage } from "formik";
import { InputField } from "../component/Form/InputField";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { UserSchema } from "../validation";
import Popup from "../component/Modal/Popup";

const initialValue = {
    username: "",
    useremail: "",
}

function Login() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("signIn");
    const [message, setMessage] = useState("");
    const [popupShow, setPopupShow] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="container">
            <h1 className="text-center">{value === "signIn" ? "Sign In" : "Sign Up"}</h1>
            <TabContext value={value}>
                <Box className="mt-3">
                    <TabList onChange={handleChange}
                        aria-label='Tab user sign in or sign up'
                        centered
                    >
                        <Tab
                            label='Sign in'
                            value='signIn'
                            sx={{
                                fontWeight: "600",
                                fontSize: "15px",
                            }}
                        />
                        <Tab
                            label='Sign up'
                            value='signUp'
                            sx={{
                                fontWeight: "600",
                                fontSize: "15px",
                            }}
                        />
                    </TabList>
                </Box>
                <TabPanel value='signIn'>
                    <div>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={UserSchema}
                            onSubmit={(values) => {
                                // handleSignIn(values);
                            }}>
                            {({
                                isSubmiting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                                setFieldValue,
                            }) => (
                                <Form className="d-flex flex-column">
                                    <InputField
                                        label={"Username"}
                                        name={"username"}
                                        type={"text"}
                                        placeholder={"Enter your username"}
                                    />
                                    <InputField
                                        label={"Email address"}
                                        name={"useremail"}
                                        type={"email"}
                                        placeholder={"Enter your email"}
                                    />
                                    <button type="submit" className="btn btn-dark btn-md mt-3">Sign In</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </TabPanel>
                <TabPanel value='signUp'>
                    <div>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={UserSchema}
                            onSubmit={(values) => {
                                // handleSignUp(values);
                            }}>
                            {({
                                isSubmiting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                                setFieldValue,
                            }) => (
                                <Form className="d-flex flex-column">
                                    <InputField
                                        label={"Username"}
                                        name={"username"}
                                        type={"text"}
                                        placeholder={"Enter your username"}
                                    />
                                    <InputField
                                        label={"Email address"}
                                        name={"useremail"}
                                        type={"email"}
                                        placeholder={"Enter your email"}
                                    />
                                    <button type="submit" className="btn btn-dark btn-md mt-3">Sign Up</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </TabPanel>
            </TabContext>
            {message !== "" &&
                <Popup
                    show={popupShow}
                    onHide={() => setPopupShow(false)}
                    message={message}
                />
            }
        </div>
    )
}

export default Login;