import {injectGlobal} from 'styled-components'

export default () => injectGlobal`
  @font-face {
    font-family: 'pridi-regularr';
    src: url('/static/fonts/Pridi-Regular.ttf');
  }

  @font-face {
    font-family: 'pridi-light';
    src: url('/static/fonts/Pridi-Light.ttf');
  }

  body {
    font-family: 'pridi-light', serif;
    font-size: 15px;
      
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
      border-radius: 20px;
      margin: 10px;
      /* background: pink; */
    
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background: #768694;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #768694;
    } 
  }
  .metro {
    font-size: 1.2em;
    cursor: pointer;
    background-color: #24409b;
    border-color: #24409b;
    width:257px;
    max-width: 320px;
    padding: 0.5em 1.6em;
    @media (min-width: 1024px) {
      width: 300px;
      max-width: 500px;
      /* padding: 0.6em 3em; */
    }
  }
  .metro:hover {
    background-color: #1c2e6d;
    border-color: #1c2e6d;

  .form-group {
    margin-bottom: 0.25rem;
  }

  .form-check {
    margin-bottom: 0;
  }
`
