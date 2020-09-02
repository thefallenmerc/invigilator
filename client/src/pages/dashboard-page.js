import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Endpoints from '../config/endpoints.config';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { testDetailRoute } from './cms/test-detail-page';

export const DASHBOARD_ROUTE = "/dashboard";

function DashboardComponentPage({ user }) {

    const [tests, setTests] = useState([]);

    useEffect(function () {
        Axios.get(Endpoints.cms.test, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })
            .then(response => {
                setTests(response.data);
            });
    }, []);

    return (
        <div className="p-2">
            {
                tests.map(test => (
                    <Link to={testDetailRoute(test.id)} key={test.id} className="m-2 p-2 rounded border block">
                        <div className="font-bold text-gray-800">{test.title}</div>
                        <div className="text-gray-700">{test.description}</div>
                    </Link>
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

const DashboardPage = connect(mapStateToProps)(DashboardComponentPage);


export default DashboardPage;