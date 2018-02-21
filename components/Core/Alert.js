import React from 'react'
import styled from 'styled-components'

const StyledAlert = styled.div`
position: fixed;
top: 0;
z-index: 100;
width: 100%;
transition: transform 1s linear;

  .alert {
    border: 0;
    color: #fff;
    
    .close {
      font-weight: 400;
      font-size: 200%;
      opacity: 0.7;
    }

    span {
      background-color: rgba(10, 10, 10, 0.3);
      max-height: 20px;
      max-width: 20px;
      min-width: 20px;
      min-height: 20px;
      display: flex;
      text-shadow: none;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      color: #fff;
      text-shadow: none;
    }
  }

  .alert-danger {
    background-color: #ff3860;
  }

  .alert-success {
    background-color: #23d160;
  }
& button {
  outline: none;
  cursor: pointer;
  
}

${props => props.show ? `
  transform: translateY(0);  
` : `
  transform: translateY(-300px);
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
          <div className='row'>
            <div className='1 ml-auto align-self-center'>
              <i className={`fas fa-${error ? 'exclamation-triangle' : 'check-circle'} fa-2x`} />
            </div>
            <div className='col-9 pr-0 align-self-center'>
              {` ${message}`}

            </div>
            <div className='col-1 ml-auto align-self-center'>
              <button
                type='button'
                className='close'
                onClick={hideDialog}
              >
                <span>&times;</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </StyledAlert>
  )
}

export default Alert
