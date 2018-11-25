// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, sendPost, deletePost } from '../../actions/postActions';
import { Article } from './Article';
import classnames from 'classnames';
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
    onChange;
    onSendPost;
    onDeletePost;

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
    }

    componentDidMount() {
        this.props.getPosts()
    }

    componentWillReceiveProps(nextProps) {

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
        // Убираем перезагрузку страницы
        e.preventDefault();

        // Деструктуризация объектов
        const { title, description, image, likes } = this.state;

        // Создание обьекта FormData
        const DataAndFiles = new FormData();

        // Создаем обьект и присваиваем ему сохраненый state, из заполненых полей
        const data = [
            {
                title: title,
                description: description,
                image: 'poster',
                likes: likes,
            }
        ]

        // Вставляем картинку
        DataAndFiles.append('image', image, 'poster');

        DataAndFiles.append(
            'text',
            JSON.stringify(data)
        );

        // Вызываем функцию отправки, в качестве аргумента будет обьект с данными
        this.props.sendPost(DataAndFiles);

        // После отправки поля будут очищены
        this.setState({
            title: '',
            description: '',
            image: '',
        });

    }

    fileChangedHandler(e) {
        // Обрабатываем найденный файл, он будет один
        const image = e.target.files[0];
        // Тип файла только jpg формат
        const type = 'image/jpg';

        // Проверка на undefined
        if (image) {
            // if (image.type === type) {
                this.setState({
                    image: image
                });
            // }
        }
        //     if (image.type === types[0]) {
        //         this.setState({
        //             image: image,
        //             // fileName: image.name,
        //             // fileError: '',
        //         });
        //     } else {
        //         this.setState({
        //             fileError: 'You are cannot upload ' + image.type + ', only image jpeg',
        //         });
        //     }
        // } else {
        //     this.setState({
        //         fileLength: image,
        //         fileError: 'You are canceled',
        //     });
        // }
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
        function accessAdmin(user, adminLevel) {
            if (user.access >= adminLevel) {
                return true;
            }
            return false;
        }
        const superLevelPosts = (
            <Article post={this.props.post} delete={this.onDeletePost}>
                <form onSubmit={this.onSendPost} className="form-group">
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
                    <div className="form-group">
                    <input
                        type="file"
                        id="file"
                        className="form-control-file"
                        onChange={this.fileChangedHandler.bind(this)} />
                    </div>

                    <button type="sumbmit" className="btn btn-primary">Sumbmit</button>
                </form>
            </Article >
        );
        const lowLevelPosts = (
            <Article post={this.props.post} />
        );
        return (
            <div className="container">
                {isAuthenticated && accessAdmin(user, this.state.adminLevel) ? superLevelPosts : lowLevelPosts}
            </div>
        );
    }
}

// Posts.propTypes = {
//     auth: PropTypes.object.isRequired,
//     getPosts: PropTypes.func.isRequired,
//     sendPost: PropTypes.func.isRequired,
//     deletePost: PropTypes.func.isRequired,
//     post: PropTypes.array.isRequired,
//     newPost: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired,
// }

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post.items,
    newPost: state.post.item,
    errors: state.errors
})

export default connect(mapStateToProps, { getPosts, sendPost, deletePost })(withRouter(Posts));