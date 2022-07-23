import React, { useState } from "react"
import TodoInfoHandler from "../../utilities/TodoInfoHandler"
import { Input, InputGroup, Form } from "reactstrap"
import Selectors from "../../utilities/Selectors"

const AutoCompleteTodoInput = ({ onSubmit }) => {
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [focus, setFocus] = useState(false)
    const [suggestions, setSuggestions] = useState(Selectors)
    // Index of the suggestion that the user has currently picked
    const [chosenIndex, setChosenIndex] = useState(-1)

    // Handle key presses whilst input is in focus
    const keyPressHandler = (event) => {
        if (!focus)
            return
        switch (event.key) {
            case "ArrowDown":
                setChosenIndex(chosenIndex + 1 < suggestions.length ? chosenIndex + 1 : chosenIndex)
                break
            case "ArrowUp":
                setChosenIndex(chosenIndex - 1 >= -1 ? chosenIndex - 1 : -1)
                break
            // If suggestion has been picked append to current task string
            // otherwise enable regular form submission
            case "Enter":
                if (chosenIndex > -1) {
                    event.preventDefault()
                    appendSuggestion(suggestions[chosenIndex])
                }                 
                setChosenIndex(-1)
                break
            default:
                break
        }
    }

    const onBlur = () => {
        setFocus(false)
        setChosenIndex(-1)
    }

    const onFocus = () => {
        if (!input)
            setSuggestions(Selectors)
        setFocus(true)
        setChosenIndex(-1)
    }

    // Validate the value in the input before submission
    const validate = () => {
        const error = TodoInfoHandler.validate(input)
        if (!error) {
            setError("")
            setInput("")
            setSuggestions([])
            return true
        }
        setError(error.message)
        return false
    }

    // Append the current suggested value to the current task string
    const appendSuggestion = (value) => {
        let lastPosition = input.lastIndexOf("#")
        let containsSeparator = lastPosition != -1
        
        lastPosition = containsSeparator ? lastPosition : 0
        let startSubstring = input.substring(0, lastPosition)

        if (containsSeparator)
            setInput(startSubstring += "# " + value)
        else
            setInput(value)

        setSuggestions([])
    }

    const updateInput = (value) => {
        // When user types characters that match an available selector
        // and the characters come after a separator or the start of the 
        // input, display appropriate suggestions

        let suggestions = []

        if (value.slice(-1) == '#') {
            suggestions = Selectors.filter(selector => !value.includes(selector))
        }
        else {
            const values = value.split('#')
            const last = values.pop().trim().toLowerCase()

            Selectors.forEach(selector => {
                if (selector.startsWith(last)
                    && selector !== last
                    && !value.includes(selector))

                    suggestions.push(selector)
            })         
        }
        
        setSuggestions(suggestions)
        setInput(value)
    }

    return (
        <div style={{ width: "100%" }}>
            <Form id="create-todo" onSubmit={(event) => { event.preventDefault(); validate() && onSubmit(input) }}>
                <div>
                    <h4 className="todo-text"> Create New Todo </h4>
                    <div>
                        <InputGroup className="autocomplete-input-container">
                            <div style={{ position: "relative", width: "80%" }}>
                                <Input
                                    id="todoInfo"
                                    name="todoInfo"
                                    autoComplete="off"
                                    placeholder="task: Buy groceries... # duedate: 12/12/2021 # priority: 2"
                                    value={input}
                                    onBlur={() => onBlur()}
                                    onFocus={() => onFocus()}
                                    onKeyDown={(event) => keyPressHandler(event)}
                                    onChange={(event) => updateInput(event.target.value)}
                                    style={{ width: "100%", height: "50px" }} />
                                <div className="autocomplete-list-container">
                                    {focus &&
                                        <ul
                                        className="autocomplete-list"
                                        onMouseLeave={() => setChosenIndex(-1)}>
                                        {suggestions.map((suggestion, index) =>
                                            index == chosenIndex
                                                ? < li
                                                    key={index}
                                                    className="chosen-suggestion"
                                                    onMouseOver={() => setChosenIndex(index)}
                                                    onMouseDown={() => appendSuggestion(suggestion)}>
                                                    {suggestion}
                                                </li>
                                                : < li
                                                    key={index}
                                                    onMouseOver={() => setChosenIndex(index)}
                                                    onMouseDown={() => appendSuggestion(suggestion)}>
                                                    {suggestion}
                                                </li>)}
                                        </ul>}
                                    {error && <p><span style={{ color: "red" }}>{error}</span></p>}
                                </div>
                            </div>

                            <i className="bi-plus-square-fill add-todo-submit"
                                onClick={() => validate() && onSubmit(input)} />
                        </InputGroup>
                    </div>

                </div>

            </Form>
        </div>
    )
}

export default AutoCompleteTodoInput