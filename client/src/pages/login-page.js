import React from 'react'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { attemptLogin } from '../redux/actions/user_actions';

export const LOGIN_ROUTE = "/login";

function LoginPageComponent({ login, errors }) {
    return (
        <div className="py-24 flex justify-center">
            <div style={{ width: "320px" }}>
                {
                    errors
                        ? Object.values(errors).map((error, i) => (
                            <span className="text-red-500 block mb-2" key={i}>{error}</span>
                        ))
                        : ""
                }
                <Formik
                    initialValues={{ email: "", password: "" }}
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
                        login(values)
                        setSubmitting(false);
                    }}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (

                            <form onSubmit={handleSubmit}>
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
                                    {errors.email && touched.email && errors.email}
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
                                    {errors.password && touched.password && errors.password}
                                </span>
                                <button
                                    className="bg-red-500 rounded text-sm px-3 py-1 text-white uppercase block mx-auto"
                                    type="submit"
                                    disabled={isSubmitting}
                                >Login</button>
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
        login: attemptLogin
    }, dispatch);
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);

export default LoginPage;
