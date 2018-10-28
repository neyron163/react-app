import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts } from '../actions/postActions';

class Posts extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: '',
            description: '',
            image: '',
            likes: 0
          };

        this.onSubmit = this.onSubmit.bind (this);
    }

    componentDidMount() {
        this.props.getPosts()
    }

    onSubmit (e) {    
        e.preventDefault ();
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;

        function accessAdmin(user){
            if(user.access >= 10){
                return true;
            }
            return false;
        }

        const superLevelPosts = (
            <article>
                {this.props.post.map((el) => {
                    return(
                            <div className="item" key={el._id}>
                                You can change this article                         
                                <h3>
                                    {el.title}
                                </h3>
                                <p>
                                    {el.description}
                                </p>
                            </div>
                    )
                })}
            </article>
        );
        const lowLevelPosts = (
            <div>
                <article>
                    {this.props.post.map((el) => {
                        return(
                                <div className="item" key={el._id}>
                                    You can not change this article                         
                                    <h3>
                                        {el.title}
                                    </h3>
                                    <p>
                                        {el.description}
                                    </p>
                                </div>
                        )
                    })}
                </article>
            </div>
        );
        return(
            <div>
                {isAuthenticated && accessAdmin(user) ? superLevelPosts : lowLevelPosts}
            </div>
        );
    }
}
Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post.items
})

export default connect(mapStateToProps, { getPosts } )(withRouter(Posts));