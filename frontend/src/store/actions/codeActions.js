export const codeActions = {
    SET_FONT_SIZE: 'CODE.SET_FONT_SIZE',
    SET_LANGUAGE: 'CODE.SET_LANGUAGE',
    SET_SHOW_EDITOR_SETTINGS: 'CODE.SET_SHOW_EDITOR_SETTINGS',
}

export const getActionsCode = dispatch => {
    return {
        setFontSize: fontSize => dispatch(setFontSize(fontSize)),
        setLanguage: language => dispatch(setLanguage(language)),
        setShowEditorSettings: showEditorSettings => dispatch(setShowEditorSettings(showEditorSettings)),
    }
}
export const setFontSize = (fontSize) => {
    return {
        type: codeActions.SET_FONT_SIZE,
        fontSize
    }
}
export const setLanguage = language => {
    return {
        type: codeActions.SET_LANGUAGE,
        language
    }
}
export const setShowEditorSettings = showEditorSettings => {
    return {
        type: codeActions.SET_SHOW_EDITOR_SETTINGS,
        showEditorSettings
    }
}