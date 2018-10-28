import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, sendPost } from '../actions/postActions';

class Posts extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: '',
            description: '',
            image: '',
            likes: 0,
            adminLevel: 10
          };

        this.onChange = this.onChange.bind (this);
        this.onSubmit = this.onSubmit.bind (this);
    }

    componentDidMount() {
        this.props.getPosts()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newPost){
            this.props.post.push(nextProps.newPost)
        }
    }
    onChange (e) {
        this.setState ({
          [e.target.name]: e.target.value,
        });
    }

    onSubmit (e) {    
        e.preventDefault ();
        const data = {
                title: this.state.title,
                description: this.state.description,
                image: this.state.image,
                likes: this.state.likes,
            }
        this.props.sendPost(data);
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;

        function accessAdmin(user, adminLevel){
            if(user.access >= adminLevel){
                return true;
            }
            return false;
        }

        const superLevelPosts = (
            <div>
                <div>
                    {this.props.post.map((el) => {
                        return(
                                <article className="item" key={el._id}>
                                    You can change this article                         
                                    <h3>
                                        {el.title}
                                    </h3>
                                    <p>
                                        {el.description}
                                    </p>
                                </article>
                        )
                    })}
                </div>

                <div>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Your title"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title}
                        />
                        <textarea
                            name="description"
                            rows="6"
                            placeholder="Your description"
                            value={this.state.body}
                            onChange={this.onChange}
                        />
                        <button type="sumbmit">Sumbmit</button>
                    </form>
                </div>
            </div>
        );
        const lowLevelPosts = (
            <div>
                    {this.props.post.map((el) => {
                        return(
                                <article className="item" key={el._id}>
                                    You can not change this article                         
                                    <h3>
                                        {el.title}
                                    </h3>
                                    <p>
                                        {el.description}
                                    </p>
                                </article>
                        )
                    })}
            </div>
        );
        return(
            <div>
                {isAuthenticated && accessAdmin(user, this.state.adminLevel) ? superLevelPosts : lowLevelPosts}
            </div>
        );
    }
}
Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    sendPost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post.items,
    newPost: state.post.item
})

export default connect(mapStateToProps, { getPosts, sendPost } )(withRouter(Posts));