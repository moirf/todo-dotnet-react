import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    constructor(props) {
        super(props)
        this.authService = props.authService;
    }
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu authService={this.authService} />
                <div className="layout">
                    <Container className="main-container">
                        {this.props.children}
                    </Container>    
                </div>
            </div>  
        );
    }
}
