import React from "react";
import { Fade } from "reactstrap";

interface IProps {
    url: string,
    explanation: string,
    title: string, 
    fadeIn:boolean,
    setFadeIn:(state: boolean)=>{}
}

const Display = (props: IProps) => {

    const {url, explanation, title, fadeIn, setFadeIn} = props;
    console.log(url)
    const onLoadHandler = () => {
        console.log("onLoad triggered")
        !fadeIn && setFadeIn(true)
    }

    const shortExplanation = explanation && `${explanation.substr(0, 100)}...`

    const bottom = {
        position: "absolute",
        bottom: 20,
        textAlign: "center",
        color: "white",
        fontSize: 30,
        margin: 20
    } as const

    const top = {
        position: "absolute",
        top: 20,
        textAlign: "center",
        width: "100%",
        color: "white",
        margin: 20
    } as const

    const container = {
        position: "relative",
        padding: "20px",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        justifyItems: "center"
    } as const

    return (
        <Fade in={fadeIn} tag="div">
            <div style={container}>

                <h1 style={top}> {title} </h1>
                <img
                    onLoad={onLoadHandler}
                    src={url}
                    alt="image..."
                    style={{
                        width: "100%",
                        height: "100%"
                    }} />

                <p style={bottom}>{shortExplanation}</p>
            </div>
        </Fade >
    )
}

export default Display