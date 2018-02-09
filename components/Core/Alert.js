import React from 'react'
import styled from 'styled-components'

const StyledAlert = styled.div`
position: fixed;
top: 0;
z-index: 100;
width: 100%;
transition: transform 0.7s linear;

& button {
  outline: none;
  cursor: pointer;
}

${props => props.show ? `
  transform: translateY(0);  
` : `
  transform: translateY(-100px);
`}

@media (min-width: 576px) {
  max-width: 540px;
  margin: 0 -15px;
}

@media (min-width: 768px) {
  max-width: 720px;
}

@media (min-width: 992px){
  max-width: 960px; 
}

@media (min-width: 1200px){
  max-width: 1140px; 
}
`

const Alert = props => {
  const { showDialog, error, message, hideDialog } = props
  if (showDialog) {
    setTimeout(() => {
      props.hideDialog()
    }, 3000)
  }
  return (
    <StyledAlert className={`row justify-content-center `} show={showDialog}>
      <div className='col-12 col-md-7'>
        <div className={`alert alert-${error ? 'danger' : 'success'}`} role='alert'>
          <i className={`fas fa-${error ? 'exclamation-triangle' : 'check-circle'} fa-lg`} />
          {` ${message}`}
          <button
            type='button'
            className='close'
            onClick={hideDialog}
          >
            <span>&times;</span>
          </button>
        </div>
      </div>
    </StyledAlert>
  )
}

export default Alert
