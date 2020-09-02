import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { HOME_ROUTE } from '../pages/home-page'

export default function AdminRoute({
    component: Component,
    user,
    ...rest
}) {
    return (
        <Route {...rest}>
            {
                user && user.role === 'admin'
                    ? <Component />
                    : <Redirect to={HOME_ROUTE} />
            }
        </Route>
    )
}
