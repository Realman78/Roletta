import { codeActions } from "../actions/codeActions";

const initState = {
    fontSize: 16,
    language: 'js',
    showEditorSettings: false
}

const reducer = (state=initState, action)=>{
    switch(action.type){
        case codeActions.SET_FONT_SIZE:
            return {
                ...state,
                fontSize: action.fontSize
            }
        case codeActions.SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        case codeActions.SET_SHOW_EDITOR_SETTINGS:
            return {
                ...state,
                showEditorSettings: action.showEditorSettings
            }
        default:
            return state
    }
}

export default reducer