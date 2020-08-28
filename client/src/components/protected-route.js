import React from 'react'
import { Route, Redirect } from 'react-router-dom'

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
                    : <Redirect to="/login" />
            }
        </Route>
    )
}
