// @flow


import React from 'react'
import { Link } from 'react-router-dom';

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
  console.log(props.delete)
    return (
    <div>
        {props.children}
        {props.post.slice(0).reverse().map((el, i) => {
            return (
                    <article className="item" key={i} style={{ display: 'block', marginBottom: '30px', color: '#FFFFFF', textDecoration: 'none' }}>
                        <Link to={`article/${i + 1}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                        <h3 style={{ fontWeight: '900', marginBottom: '0' }}>{el.title}</h3>
                        <p style={{ fontWeight: '600', marginBottom: '0' }}>{el.description}</p>
                        </Link>
                        {props.delete ? 
                        <form onSubmit={props.delete} className="form-group" article={el._id}>
                            <button type="sumbmit" className="btn btn-primary">delete</button>
                        </form> : null}
                    </article>
            )
        })}
    </div>
    )
}

export const SingleArticle = () => {
    return (
    <div>
        single article
    </div>
    )
}