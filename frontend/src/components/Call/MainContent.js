import { styled } from '@mui/system'
import {connect} from 'react-redux'
import ContentContainer from './ContentContainer'
import FooterContainer from './FooterContainer'
const MainContainer = styled('div')({
  width: '80%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '0.2%',
  paddingRight: '0.2%',
  paddingTop: '0.2%'
})
function MainContent({isChatHidden}) {
  return (
    <MainContainer style={{width: isChatHidden ? '99%' : '80%'}}>
        <ContentContainer />
        <FooterContainer />
    </MainContainer>
  )
}
const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}
export default connect(mapStoreStateToProps)(MainContent)