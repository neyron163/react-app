import React, { Component } from 'react';

import { connect } from 'react-redux';
import Navbar from './Navbar';
import Register from './Register';
import { getPosts } from '../actions/postActions';
import Login from './Login';
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SingleArticle } from './Article';


class Blog extends Component {
    componentDidMount() {
        this.props.getPosts()
    }
    render() {
        const Article = ({ match }) => (
            <SingleArticle id={match.params.id} articles={this.props.post}/>
        )
        return (
            <div>
                <Router>
                    <div className="container">
                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/article/:id" component={Article} />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.post.items
})

export default connect(mapStateToProps, { getPosts } )(Blog);