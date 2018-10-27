import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    render() {
        const {isAuthenticated, user} = this.props.auth;

        function accessAdmin(user){
            if(user.access >= 10){
                return true;
            }
            return false;
        }

        const superLevelPosts = (
            <div>
                Posts, you can change them
            </div>
        )
        const lowLevelPosts = (
            <div>
                Posts, you can not change them
            </div>
        )
        return(
            <div>
                {isAuthenticated && accessAdmin(user) ? superLevelPosts : lowLevelPosts}
            </div>
        )
    }
}
Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Home));