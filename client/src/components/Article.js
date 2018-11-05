import React from 'react'
import { Link } from 'react-router-dom';

export const Article = (props) => {
    return (
    <div>
        {props.post.map((el, i) => {
            return (
                <Link to={`article/${i + 1}`} key={el._id} style={{ display: 'block', marginBottom: '30px', color: '#FFFFFF', textDecoration: 'none' }}>
                    <article className="item">
                        <h3 style={{ fontWeight: '900', marginBottom: '0' }}>{el.title}</h3>
                        <p style={{ fontWeight: '600', marginBottom: '0' }}>{el.description}</p>
                    </article>
                </Link>
            )
        })}
        {props.children}
    </div>
    )
}