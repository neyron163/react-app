import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Link to="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                         className="rounded-circle"
                         style={{ width: '25px', marginRight: '5px'}} />
                    <span style={{ color: '#FFFFFF' }}>Logout</span>
                </Link>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{ color: '#FFFFFF', fontWeight: '600', fontSize: '18px'}}>Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{ color: '#FFFFFF', fontWeight: '600', fontSize: '18px' }}>Sign In</Link>
                </li>
            </ul>
        );
        return(
            <header style={{ paddingTop: '40px', paddingBottom: '40px', background: '#232325' }}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/" style={{ color: '#FFFFFF' }}>Blog</Link>
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </header>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));