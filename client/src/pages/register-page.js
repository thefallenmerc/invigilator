import React from 'react'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { attemptLogin, attemptRegister } from '../redux/actions/user_actions';

export const REGISTER_ROUTE = "/register";

function RegisterPageComponent({ login, errors }) {
    return (
        <div className="py-24 flex justify-center">
            <div style={{ width: "320px" }}>
                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        login(values)
                    }}>
                    {({
                        values,
                        errors: formErrors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (

                            <form onSubmit={handleSubmit}>
                                <input
                                    name="name"
                                    type="text"
                                    className="border block mb-1 w-full px-2 py-1"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                <span className="text-xs mb-3 block text-red-500">
                                    {formErrors.name && touched.name && formErrors.name}
                                </span>
                                <span className="text-xs mb-3 block text-red-500">
                                    {errors.validation && errors.validation.name && errors.validation.name[0]}
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    className="border block mb-1 w-full px-2 py-1"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <span className="text-xs mb-3 block text-red-500">
                                    {formErrors.email && touched.email && formErrors.email}
                                </span>
                                <span className="text-xs mb-3 block text-red-500">
                                    {errors.validation && errors.validation.email && errors.validation.email[0]}
                                </span>
                                <input
                                    name="password"
                                    type="password"
                                    className="border block mb-1 w-full px-2 py-1"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <span className="text-xs mb-3 block text-red-500">
                                    {formErrors.password && touched.password && formErrors.password}
                                </span>
                                <span className="text-xs mb-3 block text-red-500">
                                    {errors.validation && errors.validation.password && errors.validation.password[0]}
                                </span>
                                <button
                                    className="bg-red-500 rounded text-sm px-3 py-1 text-white uppercase block mx-auto"
                                    type="submit"
                                    disabled={isSubmitting}
                                >Register</button>
                            </form>
                        )}
                </Formik>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login: attemptRegister
    }, dispatch);
};

const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);

export default RegisterPage;
