import React, { Component } from 'react';
import {Article} from "./Article";
import classnames from "classnames";

export const AdminArticles = (props) => (
    <Article post={props.post} delete={props.onDeletePost}>
        <form onSubmit={props.onSendPost} className="form-group">
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Your title"
                    name="title"
                    onChange={props.onChange}
                    value={props.title}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': props.errors.title
                    })}
                />
                {props.errors.title && (<div className="invalid-feedback">{props.errors.title}</div>)}
            </div>
            <div className="form-group">
                        <textarea
                            name="description"
                            rows="6"
                            placeholder="Your description"
                            value={props.description}
                            onChange={props.onChange}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': props.errors.description
                            })}
                        />
                {props.errors.description && (<div className="invalid-feedback">{props.errors.description}</div>)}
            </div>
            <div className="form-group">
                <input
                    type="file"
                    id="file"
                    className="form-control-file"
                    onChange={props.fileChangedHandler} />
            </div>

            <button type="sumbmit" className="btn btn-primary">Sumbmit</button>
        </form>
    </Article >
);