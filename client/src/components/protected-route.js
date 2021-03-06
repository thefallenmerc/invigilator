import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN_ROUTE } from '../pages/login-page'

export default function ProtectedRoute({
    component: Component,
    user,
    ...rest
}) {
    return (
        <Route {...rest}>
            {
                user
                    ? <Component />
                    : <Redirect to={LOGIN_ROUTE} />
            }
        </Route>
    )
}
