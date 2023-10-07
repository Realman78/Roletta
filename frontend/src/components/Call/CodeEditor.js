import React from 'react'
import Editor from '@uiw/react-textarea-code-editor';
import { connect } from 'react-redux'

const options = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'cs', label: 'C#' },
    { value: 'go', label: 'GO' },
    { value: 'java', label: 'Java' },
    { value: 'js', label: 'JavaScript' },
    { value: 'jsx', label: 'JSX' },
    { value: 'kt', label: 'Kotlin' },
    { value: 'py', label: 'Python' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
  ]

function CodeEditor({ code, changeHandler, fontSize, language }) {
    const { label } = options.find(opt => opt.value === language)
    const fontSizeForTyping = fontSize

    return (
        <Editor
            value={code}
            language={language}
            placeholder={`This is a shared editor. Please enter ${label} code.`}
            onChange={changeHandler}
            padding={15}
            style={{
                width: '100%',
                // height: '99%',
                borderRadius: '8px',
                fontSize: fontSizeForTyping+'px',
                backgroundColor: "#151515",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',

            }}
        />
    );
}

const mapStoreStateToProps = ({ code }) => {
    return {
        ...code
    }
}

export default connect(mapStoreStateToProps)(CodeEditor)