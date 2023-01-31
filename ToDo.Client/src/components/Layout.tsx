import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

interface IProps {
    children: JSX.Element
}
export const Layout = (props: IProps) => {

    return (
        <div className="layout">
            <Container className="main-container">
                {props.children}
            </Container>
        </div>
    );
}
