import React, { Component } from 'react';
import './custom.css'
import './bootstrap-icons.css'
import { useState } from 'react';
import { Layout } from './components/Layout';

interface IProps {
    name: string,

}
export function App(props: IProps) {

    const [loggedIn, setLoggedIn] = useState(false);


    return (
         <div> 
            <div className="p">Hello</div>
            <p>This is test</p>
             </div>
    );
}
