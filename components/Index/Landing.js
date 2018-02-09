import React from 'react'
import styled from 'styled-components'

const Warpper = styled.div`
  position: relative;
`

const Container = styled.div`
  min-height: 100vh;
`

const TextWarpper = Container.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: -100vh;
  color: #fff;
  text-align: center;
  padding: 0 .3em;

  a {
    color: #ffb300;
  }
`

const TextBlock = styled.div`
  margin-top: -150px;
`

const Faded = Container.extend`
  background: linear-gradient(to top,rgba(0,0,0,.85),rgba(255,51,0,.9));
  z-index: 999;
`

const Image = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
`

const RockTop = Image.extend`
  top: 0;
`

const RockDown = Image.extend`
  bottom: 0;
`

const Character = Image.extend`
  width: 30%;
  z-index: 0;
  bottom: .5em;
  @media (min-width: 800px) {
    width: 15em;
  }
`

const Monkey = Character.extend`
  left: 1em;
  @media (min-width: 800px) {
    left: 6em;
  }
`

const Giant = Character.extend`
  transform: scaleX(-1);
  right: 1em;
  @media (min-width: 800px) {
    right: 6em;
  }
`

export default () => (
  <Warpper>
    <TextWarpper>
      <TextBlock>
        <h1>
          พวกข้ากำลังต่อสู้กันอยู่ <br /> เจ้าอย่าเพิ่งเข้ามานะ!
        </h1>
        <h5>
          "เปิดรับสมัครเร็วๆนี้ ที่ <a href={`https://itim.wip.camp`}>https://itim.wip.camp</a>"
        </h5>
      </TextBlock>
    </TextWarpper>
    <Faded />
    <Monkey src={`/static/img/monkey.png`} />
    <Giant src={`/static/img/giant.png`} />
    <RockTop src={`/static/img/top.png`} />
    <RockDown src={`/static/img/down.png`} />
  </Warpper>
)
