import * as Yup from "yup"

export const UserSchema = Yup.object().shape({
    username: Yup.string()
        .required("Sorry, username is required")
        .min(5, "Sorry, username should have greater than 5 characters")
        .max(25, "Sorry, username should have less than 25 characters"),
    useremail: Yup.string()
        .email("Invalid email")
        .required("Sorry, email is required"),
});