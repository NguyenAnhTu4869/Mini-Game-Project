import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../redux-store/user/user.slice";
import { Formik, Form } from "formik";
import { InputField } from "../component/Form/InputField";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { UserSchema } from "../validation";
import Popup from "../component/Modal/Popup";

/** Function sign up */
const handleSignUp = async (values, setPopupShow, setMessage) => {
    let data = {
        userName: values.username,
        userEmail: values.useremail
    }
    await axios.post('http://localhost:8080/users', data, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            setPopupShow(true);
            setMessage(res.data.message);
        })
        .catch((error) => {
            setPopupShow(true);
            setMessage(error);
        });
}

/** Function sign in */
const handleSignIn = async (values, setPopupShow, setMessage, setUserData) => {
    let data = {
        userName: values.username,
        userEmail: values.useremail
    }
    await axios.get('http://localhost:8080/users', {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        params: data,
    })
        .then((res) => {
            setPopupShow(true);
            setMessage(res.data.message);
            let userData = res.data.data;
            if (userData !== undefined) {
                setUserData(userData);
            }
        })
        .catch((error) => {
            setPopupShow(true);
            setMessage(error);
        });
}

const initialValue = {
    username: "",
    useremail: "",
}

function Login() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("signIn");
    const [message, setMessage] = useState("");
    const [popupShow, setPopupShow] = useState(false);
    const [userData, setUserData] = useState({
        id: 0,
        userEmail: "",
        userName: "",
        userScore: 0,
        userTimes: 0
    });
    const [isClick, setIsClick] = useState(false);

    /** Change tabs */
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /** Update user data in redux */
    useEffect(() => {
        if (userData.id !== 0) {
            dispatch(
                userActions.updateUserInfo({
                    userId: userData.id,
                    userName: userData.userName,
                    userEmail: userData.userEmail,
                })
            );
            dispatch(
                userActions.updateUserTime({
                    userTimes: userData.userTimes,
                })
            );
            dispatch(
                userActions.updateUserScore({
                    userScore: userData.userScore,
                })
            );

        }
    }, [userData.id])

    return (
        <div className="container">
            <h1 className="text-center mt-5">Mini Game App</h1>
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
                                handleSignIn(values, setPopupShow, setMessage, setUserData);
                                setIsClick(!isClick)
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
                                    <button type="submit" className="btn btn-dark btn-md mt-3">
                                        Sign In
                                    </button>
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
                                handleSignUp(values, setPopupShow, setMessage);
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
                                    <button type="submit" className="btn btn-dark btn-md mt-3">
                                        Sign Up
                                    </button>
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