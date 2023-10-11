import React from 'react'
import { connect } from 'react-redux'
import "./CodeEditor.css"

const options = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'clike', label: 'C#' },
    { value: 'go', label: 'GO' },
    { value: 'java', label: 'Java' },
    { value: 'js', label: 'JavaScript' },
    { value: 'jsx', label: 'JSX' },
    { value: 'kt', label: 'Kotlin' },
    { value: 'py', label: 'Python' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
]

function CodeEditor({ code, changeHandler, fontSize, language, disabledEditor = false }) {
    const { label } = options.find(opt => opt.value === language)
    const fontSizeForTyping = fontSize
    const handleTabPress = event => {
        if (event.key === "Tab") {
            event.preventDefault();
    
            const textarea = event.target;
    
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
    
            const spacesForTab = "    "; 
            textarea.value = textarea.value.substring(0, start) + spacesForTab + textarea.value.substring(end);
    
            textarea.selectionStart = textarea.selectionEnd = start + spacesForTab.length;
        }
    }
    

    return (
        <textarea
            placeholder={`This is a shared editor. Please enter ${label} code.\nIf you want to execute JS code, press the button in the bottom right corner. The results (put the results in console.log) will be at the end of this code editor.\nDISCLAIMER: This editor is buggy. Im working on a custom one so this is just a temporary solution.`}
            onChange={changeHandler}
            disabled={disabledEditor}
            onKeyDown={handleTabPress}
            value={code}
            style={{ fontSize: fontSizeForTyping + "px" }}
            class="code-textarea"
        />

    );
}

const mapStoreStateToProps = ({ code }) => {
    return {
        ...code
    }
}

export default connect(mapStoreStateToProps)(CodeEditor)