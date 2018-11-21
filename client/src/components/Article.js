// @flow


import React from 'react'
import { Link } from 'react-router-dom';

// styles
import {
    ArticleStyle,
    ArticlePoster,
    LastArticleStyle,
    ArticleSingle,
    ArticlesStyle,
} from '../styles/Article';

type Props = {
    post: Array<
    {
        _id: string,
        title: string,
        description: string,
        likes: number
    }
    >
}


export const Article = (props: Props) => {
    return (
        <div>
            {props.children}
            <div style={ArticlesStyle}>
                {props.post.slice(0).map((el, i) => {
                    return (
                        <article className="item" key={i} style={i !== 3 ? ArticleStyle : LastArticleStyle}>
                            <Link to={`article/${i + 1}`} style={{ color: '#FFFFFF', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                                <img style={ArticlePoster} src={`/images/${el.image}`} />
                                <h3 style={{ fontWeight: '900', marginBottom: '0', fontSize: '16px', color: '#d3cec4', textAlign: 'center' }}>{el.title}</h3>
                                {/* <p style={{ fontWeight: '600', marginBottom: '0' }}>{el.description}</p> */}
                            </Link>
                            {props.delete ?
                                <form onSubmit={props.delete} className="form-group" article={el._id}>
                                    <button type="sumbmit" className="btn btn-primary">delete</button>
                                </form> : null}
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export const SingleArticle = (props) => {
    return props.articles.map((el, i) => {
        if (parseInt(props.id) === i + 1) {
            return (
                <div key={i} style={ArticleSingle}>
                    <img style={ArticlePoster} src={`/images/${el.image}`} />
                    <h1 className="title">{el.title}</h1>
                    <p className="description">{el.description}</p>
                </div>
            )
        } else {
            return null;
        }
    })
}