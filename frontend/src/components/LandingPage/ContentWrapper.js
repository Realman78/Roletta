import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import ButtonsContainer from './ButtonsContainer'
import { useMediaQuery } from 'react-responsive'

const MainContainer = styled('div')({
    width: '50%',
    height: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
})

function ContentWrapper() {
    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

    return (
        <MainContainer>
            {!isMobile && <Typography className={'header'} sx={{ fontSize: '2em', color: 'white', textAlign: 'center'}}>
                Roletta makes interviewing fast,
                accessible and easy for both parties.
            </Typography>}
            <ButtonsContainer />
        </MainContainer>
    )
}

export default ContentWrapper