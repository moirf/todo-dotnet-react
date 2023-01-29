import React, { Component, useState, useEffect, useContext} from 'react';
import { Form, FormGroup } from 'reactstrap';
import PathContext from '../index'
import Display from './Display';
import ErrorImage from './../resources/oops_404_error.jpg'

export const NasaSampler = ({ api_key }) =>
{
    const url = "https://api.nasa.gov/planetary/apod"
    const [apod, setApod] = useState(null)
    const [fade, setFade] = useState(false)

    const getData = async () => {
        setFade(false)
        const url_params = `${url}?count=1&api_key=${api_key}`
        console.log(url_params)
        const apod_temp = await fetch(url_params)
            .then(response => {
                if (response.ok)
                    return response.json()
                else {
                    setFade(true)
                    return {
                        url: ErrorImage
                    }
                }
                    
            })
        console.log(apod_temp[0])
        setApod(apod_temp[0])
    }

    useEffect(() => {
        getData()
        const id = setInterval(() => getData(), 5000)
        return () => { clearInterval(id) }
    }, [])

    return (
        <div>

            <Display {...apod} fadeIn={fade} setFadeIn={setFade} />
        </div>
    )
}

