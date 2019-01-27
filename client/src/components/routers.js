import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './header/Navbar';
import Register from './authentication/Register';
import { getPosts } from '../actions/postActions';
import Login from './authentication/Login';
import Home from './home';
import Filters from './filters/filters';
import { SingleArticle } from './posts/SingleArticle';

import { HomeStyle, ContainerStyle } from '../styles/Home';
// import bg from '../images/background.jpg';


class Routers extends Component {
    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        const Article = ({ match }) => (
            <SingleArticle id={match.params.id} articles={this.props.post}/>
        );
        return (
            <div>
                {/* <img src={bg} style={HomeStyle} alt="background"/> */}
                <div style={ContainerStyle}>
                    <Router>
                        <div style={{ background: 'white', width: '80%' }}>
                            <Navbar />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/article/:id" component={Article} />
                        </div>
                    </Router>
                    <Filters />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.post.items
});

export default connect(mapStateToProps, { getPosts } )(Routers);