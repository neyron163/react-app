// @flow


import React from 'react'
import { Link } from 'react-router-dom';

// styles
import {
    ArticleStyle,
    ArticlePoster,
    LastArticleStyle,
    ArticlesStyle,
} from '../../styles/Article';

type Props = {
    post: Array<{
        _id: string,
        title: string,
        description: string,
        likes: number,
    }>,
    children: node,
};


export const Article = (props: Props) => {
    return (
        <div>
            {props.children}
            <div style={ArticlesStyle}>
                {props.post.slice(0).map((el: string, i): string => {
                    return (
                        <article className="item" key={i} style={i !== 3 ? ArticleStyle : LastArticleStyle}>
                            <Link to={`article/${i + 1}`} style={{ color: '#FFFFFF', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                                {el.image && <img style={ArticlePoster} src={`/images/${el.image}`} />}
                                <h3 style={{ fontWeight: '900', marginBottom: '0', fontSize: '16px', color: '#d3cec4', textAlign: 'center' }}>{el.title}</h3>
                            </Link>
                            {props.delete &&
                                <form onSubmit={props.delete} className="form-group" article={el._id}>
                                    <button type="sumbmit" className="btn btn-primary">delete</button>
                                </form>}
                        </article>
                    );
                })}
            </div>
        </div>
    )
};