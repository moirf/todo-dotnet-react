import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.authService = props.authService;
        this.state = {
            collapsed: true
        };
    }

    invokeSignInEvent = () => {
        this.authService.Authenticate()
    }

    invokeSignOutEvent = () => {
        this.authService.SignOut()
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Todo App</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                {this.authService.account &&
                                    <NavItem>
                                        <NavLink className="text-dark">Welcome {this.authService.account?.username}</NavLink>
                                    </NavItem>}
                                <NavItem>
                                    {this.authService.account
                                        ? <NavLink onClick={() => this.invokeSignOutEvent()} tag={Link} className="text-dark">Sign out</NavLink>
                                        : <NavLink onClick={() => this.invokeSignInEvent()} tag={Link} className="text-dark">Sign in</NavLink>}
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
