import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
`

const Box = styled.div`

`

export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='contatner-fluid'>
                as
          </div>
        </BackgroundContainer>
      )
    }
}
