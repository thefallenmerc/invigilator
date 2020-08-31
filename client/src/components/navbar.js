import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../pages/login-page';
import { HOME_ROUTE } from '../pages/home-page';

function NavbarComponent({ user }) {
    return (
        <div className="shadow px-2 py-3 bg-red-500 text-white flex justify-between">
            <Link to={HOME_ROUTE}>Invigilator</Link>
            {
                user
                    ? ''
                    : (
                        <div>
                            <Link className="px-2 py-1 text-gray-300 hover:text-white" to={LOGIN_ROUTE}>Login</Link>
                            <Link className="px-2 py-1 text-gray-300 hover:text-white" to={LOGIN_ROUTE}>Register</Link>
                        </div>
                    )

            }
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

const Navbar = connect(mapStateToProps)(NavbarComponent);
export default Navbar;
