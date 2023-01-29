import React from "react";
import { Fade } from "reactstrap";

const Display = ({ url, explanation, title, fadeIn, setFadeIn }) => {

    console.log(url)
    const onLoadHandler = (event) => {
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
    }

    const top = {
        position: "absolute",
        top: 20,
        textAlign: "center",
        width: "100%",
        color: "white",
        margin: 20
    }

    const container = {
        position: "relative",
        padding: "20px",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        justifyItems: "center"
    }

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