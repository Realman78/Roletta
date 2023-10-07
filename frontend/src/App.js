import React from 'react';
import './App.css';
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import Header from './components/Header';
import Call from './components/Call';
import LandingPage from './components/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Wrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundRepeat: 'no-repeat'
})

function App({ isUserInRoom }) {
  return (
    <>
      <Wrapper>
        <Header />
        {isUserInRoom ? <Call /> : <LandingPage />}
      </Wrapper>
      <ToastContainer pauseOnFocusLoss={false}/>
    </>
  );
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room
  }
}

export default connect(mapStoreStateToProps)(App);
