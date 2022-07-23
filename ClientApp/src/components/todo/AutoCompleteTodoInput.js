import React, { useState } from "react"
import TodoInfoHandler from "../../utilities/TodoInfoHandler"
import { Input, InputGroup, InputGroupText, Form, Button } from "reactstrap"
import Selectors from "../../utilities/Selectors"

const AutoCompleteTodoInput = ({ onSubmit }) => {
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [focus, setFocus] = useState(false)
    const [suggestions, setSuggestions] = useState(Selectors)

    const onFocus = () => {
        if (!input)
            setSuggestions(Selectors)
        setFocus(true)
    }

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

    const chooseSuggestion = (value) => {
        let selectors = []

        Selectors.forEach(selector => {
            if (input.toLowerCase().includes(selector))
                selectors.push(selector)
        })
        if (selectors.length > 0) {
            setInput(`${input} ${value} `)
        }
        else { setInput(`${value} `) }
        setSuggestions([])
    }

    const updateInput = (value) => {
        // When user first types we want to show all available 
        // field selectors that match the first character,
        // otherwise only show suggestions when user types in #
        // separator

        let suggestions = []
        Selectors.forEach(selector => {
            if (selector.startsWith(value.toLowerCase()) && selector !== value)
                suggestions.push(selector)
        })

        if (value.slice(-1) == '#') {
            suggestions = Selectors.filter(selector => !value.includes(selector))
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
                                    placeholder="task: Buy groceries... # duedate: 12/12/2021 # priority: med"
                                    value={input}
                                    onBlur={() => setFocus(false)}
                                    onFocus={() => onFocus()}
                                    onChange={(event) => updateInput(event.target.value)}
                                    style={{ width: "100%", height: "50px" }} />
                                <div className="autocomplete-list-container">
                                    {focus &&
                                        <ul className="autocomplete-list">
                                            {suggestions.map((suggestion, index) => <li key={index} onMouseDown={() => chooseSuggestion(suggestion)}> {suggestion}</li>)}
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