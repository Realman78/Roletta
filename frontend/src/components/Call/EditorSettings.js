import React from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/system'
import Select from 'react-select'
import { getActionsCode } from '../../store/actions/codeActions'
import { useMediaQuery } from 'react-responsive'

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
const optionsFont = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '10', label: '10' },
  { value: '12', label: '12' },
  { value: '16', label: '16' },
  { value: '18', label: '18' },
  { value: '20', label: '20' },
  { value: '22', label: '22' },
  { value: '24', label: '24' },
  { value: '28', label: '28' },
  { value: '32', label: '32' },
  { value: '36', label: '36' },
  { value: '40', label: '40' },
  { value: '48', label: '48' },
  { value: '64', label: '64' },
]


const MainContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: 'rgb(80,80,80)',
  justifyContent: 'center',
  borderRadius: '12px',
  borderTopRightRadius: '0px',
  position: 'relative'
})

const SelectWrapper = styled('div')({
  overflowY: 'visible',
  width: '75%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column'
})
const FontChooseWrapper = styled('div')({
  width: '75%',
  display: 'flex',
  alignItems: 'center'
})
const SettingsTitle = styled('p')({
  fontSize: '16px',
  color: 'white',
  top: '0px',
  position: 'absolute',
  marginTop: '6px',
  textDecoration: 'underline'
})



function EditorSettings({ setLanguage, language, fontSize, setFontSize }) {
  const isShort = useMediaQuery({ query: '(max-height: 650px)' })

  const { label } = options.find(opt => opt.value === language)
  const handleLanguageChanged = (e) => {
    setLanguage(e.value)
  }
  const handleFontSizeChanged = (e) => {
    setFontSize(e.value)
  }

  return (
    <MainContainer>
      {!isShort && <SettingsTitle>
        Editor Settings
      </SettingsTitle>}
      <SelectWrapper>
        <p style={{ color: 'white' }}>Select language:</p>
        <Select menuPlacement='top' onChange={handleLanguageChanged} placeholder={label} className='selectLanguage' options={options} />
      </SelectWrapper>
      <FontChooseWrapper>
        <p style={{ color: 'white' }}>Font size:</p>
        <Select menuPlacement='top' onChange={handleFontSizeChanged} placeholder={fontSize} className='selectFont' options={optionsFont} />
      </FontChooseWrapper>
    </MainContainer>
  )
}

const mapStateStoreToProps = ({ code }) => {
  return {
    ...code
  }
}

const mapActionsToProps = dispatch => {
  return {
    ...getActionsCode(dispatch)
  }
}

export default connect(mapStateStoreToProps, mapActionsToProps)(EditorSettings)