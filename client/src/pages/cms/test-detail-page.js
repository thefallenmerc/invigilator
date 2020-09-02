import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Endpoints from '../../config/endpoints.config';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

export const TESTDETAIL_ROUTE = "/admin/test/detail/:id";
export const testDetailRoute = id => "/admin/test/detail/" + id;

function TestDetailPageComponent({ user }) {

    const { id } = useParams();

    const [test, setTest] = useState(null);

    useEffect(function () {
        Axios.get(Endpoints.cms.test + "/" + id, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })
            .then(response => {
                setTest(response.data);
            });
    }, []);

    if (!test) {
        return <div></div>;
    }

    return (
        <div className="px-2 py-4">
            {/* title, time and description */}
            <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-lg text-gray-800">{test.title}</div>
                <div className="text-sm text-white bg-green-500 rounded shadow px-2 py-1">{test.timeAlloted} Mins</div>
            </div>
            <div className="text-gray-700 mb-2">{test.description}</div>
            {/* questions */}
            {
                test.questions.map((question, index) => (
                    <div key={question._id} className="py-3">
                        <div className="font-bold text-gray-800 mb-2">{index + 1}. {question.title}</div>
                        {
                            question.isMCQ
                                ? (
                                    <div>
                                        <ul>
                                            {
                                                question.options.map((option, id) => (
                                                    <li
                                                        key={id}
                                                        className={(question.answer === option ? "text-green-500 " : "text-gray-700 ") + "px-3 py-2 my-1 rounded border hover:shadow cursor-pointer"}>
                                                        {option}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                                : <div className="text-gray-800"><span className="font-bold">Answer:</span> {question.answer}</div>
                        }

                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

const TestDetailPage = connect(mapStateToProps)(TestDetailPageComponent);


export default TestDetailPage;