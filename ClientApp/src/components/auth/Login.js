import React from 'react';
import { Button } from '@fluentui/react-northstar';
import logo from '../../resources/icons/microsoft_logo_small.png';

export const Login = ({ signIn }) => {

    return (
        <div className="login-page small-root">
            <div className="login-box">
                <h2 style={{textAlign: "center", color: "#7B83EB"}}> Login </h2>
                <br />
                <div className="microsoft-sign-in" onClick={() => signIn()}>
                    <img src={logo} alt="microsoft" width="20px" height="20px" />
                    <p style={{ marginBottom: 0, marginLeft: 10 }}> Sign in with microsoft account </p>
                </div>
            </div>
        </div>
    )
}