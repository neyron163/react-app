import React, { Component } from 'react';
import {ArticlePoster, ArticleSingle} from "../../styles/Article";

export const SingleArticle = (props) => {
    return props.articles.map((el, i) => {
        if (parseInt(props.id) === i + 1) {
            return (
                <div key={i} style={ArticleSingle}>
                    {el.image && <img style={ArticlePoster} src={`/images/${el.image}`} />}
                    <h1 className="title">{el.title}</h1>
                    <p className="description">{el.description}</p>
                </div>
            )
        } else {
            return null;
        }
    })
};