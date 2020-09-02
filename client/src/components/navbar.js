import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../pages/login-page';
import { HOME_ROUTE } from '../pages/home-page';
import { REGISTER_ROUTE } from '../pages/register-page';
import { attemptLogout } from '../redux/actions/user_actions';

function NavbarComponent({ user, logout }) {
    return (
        <div className="shadow px-2 py-3 bg-red-500 text-white flex justify-between">
            <Link to={HOME_ROUTE}>Invigilator</Link>
            {
                user
                    ? (
                        <div>
                            <span className="px-2 py-1 text-gray-300 hover:text-white">{user.name}</span>
                            <span className="px-2 py-1 text-gray-300 hover:text-white cursor-pointer" onClick={event => {
                                logout();
                            }}>Logout</span>
                        </div>
                    )
                    : (
                        <div>
                            <Link className="px-2 py-1 text-gray-300 hover:text-white" to={LOGIN_ROUTE}>Login</Link>
                            <Link className="px-2 py-1 text-gray-300 hover:text-white" to={REGISTER_ROUTE}>Register</Link>
                        </div>
                    )

            }
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch=>bindActionCreators({
    logout: attemptLogout
}, dispatch);

const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
export default Navbar;
