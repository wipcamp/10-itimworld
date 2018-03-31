import React from 'react'
import styled from 'styled-components'


const Box = styled.div`
    height: 30vh;
    width: 50vw;
    background-color: #fff;
    position: absolute;
    z-index: 0;
    border-radius: 20px;
    padding: 10px;
`

const index = (props) => (
    <Box className={props.className}><p>{props.text}</p></Box>
)

export default index;