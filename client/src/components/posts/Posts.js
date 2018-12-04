// @flow

import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, sendPost, deletePost } from '../../actions/postActions';

import {AdminArticles} from './AdminArticles';
import {UserArticles} from './UserArticles';

import { accessAdmin } from '../../validation/access';
import isEmpty from '../../validation/is-empty';

type Props = {
    auth: Object<{
        isAuthenticated: boolean,
        user: object
    }>,
    getPosts: object,
    sendPost: object,
    deletePost: object,
    post: object,
    newPost: object,
    errors: object,
}

type State = {
    id: string,
    title: string,
    description: string,
    image: string,
    likes: number,
    adminLevel: number,
    errors: object
}

class Posts extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            image: '',
            likes: 0,
            adminLevel: 10,
            errors: {},
            id: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSendPost = this.onSendPost.bind(this);
        this.onDeletePost = this.onDeletePost.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    componentDidMount() {
        // Get all posts
        this.props.getPosts()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        const Posts = this.props.post;
        let lastID;

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (Posts) {
            Posts.slice(-1).forEach((el) => {
                lastID = el._id;
            });
        }
        if (nextProps.newPost && !isEmpty(nextProps.newPost) && nextProps.newPost._id !== lastID) {
            this.props.post.push(nextProps.newPost);
            this.setState({
                errors: {
                    title: '',
                    description: ''
                }
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSendPost(e) {
        /*
         1.Delete reload page
         2.Destructuring objects
         3.Create FormData
         4.Create object and save state into data array from inputs
         5.Append image
         6.Append text
         7.Call function for sending and one argument will be data object
         8.After clear state ( input and textarea )
        */
        e.preventDefault();
        const { title, description, image, likes } = this.state;
        const DataAndFiles = new FormData();
        const data = [
            {
                title: title,
                description: description,
                image: 'poster',
                likes: likes,
            }
        ];

        DataAndFiles.append('image', image, 'poster');
        DataAndFiles.append(
            'text',
            JSON.stringify(data)
        );
        this.props.sendPost(DataAndFiles);
        this.setState({
            title: '',
            description: '',
            image: '',
        });
    }

    fileChangedHandler(e) {
        /*
           1.Handler found file, it must be one
           2.Type file must be only jpg
           3.Check on undefined
        */
        const image = e.target.files[0];
        const type = 'image/jpg';
        if (image) {
            this.setState({
                image: image
            });
        }
    }


    onDeletePost(e) {
        e.preventDefault();

        const data = {
            id: e.target.getAttribute('article')
        };

        this.props.deletePost(data);

    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { errors } = this.state;

        return(
            <Fragment>
                {isAuthenticated && accessAdmin(user, this.state.adminLevel) ?
                    <AdminArticles
                        errors={errors}
                        post={this.props.post}
                        title={this.state.title}
                        description={this.state.description}
                        onChange={this.onChange}
                        onSendPost={this.onSendPost}
                        onDeletePost={this.onDeletePost}
                        fileChangedHandler={this.fileChangedHandler}
                    /> :
                    <UserArticles
                        post={this.props.post}
                    />};
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post.items,
    newPost: state.post.item,
    errors: state.errors
});

export default connect(mapStateToProps, { getPosts, sendPost, deletePost })(withRouter(Posts));