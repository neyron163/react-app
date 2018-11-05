import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, sendPost } from '../actions/postActions';
import { Article } from './Article';
import classnames from 'classnames';
import isEmpty from '../validation/is-empty';

class Posts extends Component {
    constructor (props) {
        super (props);

        this.state = {
            title: '',
            description: '',
            image: '',
            likes: 0,
            adminLevel: 10,
            errors: {}
          };

        this.onChange = this.onChange.bind (this);
        this.onSubmit = this.onSubmit.bind (this);
    }

    componentDidMount() {
        this.props.getPosts()
    }

    componentWillReceiveProps(nextProps){
        let lastID;

        if(nextProps.errors) {
            this.setState({
                title: '',
                description: '',
                image: '',
                errors: nextProps.errors
            });
        }
        
        this.props.post.slice(-1).forEach((el) => {
            lastID = el._id;
        });

        if(nextProps.newPost && !isEmpty(nextProps.newPost) && nextProps.newPost._id !== lastID){
            this.props.post.push(nextProps.newPost);
            this.setState ({
                errors: {
                    title: '',
                    description: ''
                }
            });
        }
    }
    onChange (e) {
        this.setState ({
          [e.target.name]: e.target.value,
        });
    }

    onSubmit (e) {
        e.preventDefault ();
        const { title, description, image, likes } = this.state;
        const data = {
                title: title,
                description: description,
                image: image,
                likes: likes,
        }

        this.props.sendPost(data);
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const {errors} = this.state;
        function accessAdmin(user, adminLevel){
            if(user.access >= adminLevel){
                return true;
            }
            return false;
        }
        const superLevelPosts = (
                    <Article post={this.props.post}>
                        <form onSubmit={this.onSubmit} className="form-group">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Your title"
                                    name="title"
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.title
                                    })}
                                />
                                {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    rows="6"
                                    placeholder="Your description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.description
                                    })}
                                />
                                {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                            </div>
                            <button type="sumbmit" className="btn btn-primary">Sumbmit</button>
                        </form>
                    </Article>
        );
        const lowLevelPosts = (
                <Article post={this.props.post} />
        );
        return(
            <div className="container">
                {isAuthenticated && accessAdmin(user, this.state.adminLevel) ? superLevelPosts : lowLevelPosts}
            </div>
        );
    }
}
Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    sendPost: PropTypes.func.isRequired,
    post: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post.items,
    newPost: state.post.item,
    errors: state.errors
})

export default connect(mapStateToProps, { getPosts, sendPost } )(withRouter(Posts));