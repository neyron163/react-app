import React from 'react'

export const Article = (props) => {
    return (
    <div>
        {props.post.map((el) => {
            return (
                <article className="item" key={el._id}>
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                </article>
            )
        })}
        {props.children}
    </div>
    )
}