/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'
import {Layout} from '../Global'

const Dump = () => <div>Dump</div>

const HOC = App(Dump)

describe('<App />', () => {
  it('App should be renders "<Dump />"', () => {
    const app = shallow(<HOC />)
    expect(app.find(Layout).dive().find('div').text()).toEqual('<Dump />')
  })

  it('App should be renders with Dump', () => {
    const component = renderer.create(<HOC />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
