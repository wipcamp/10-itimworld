/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { MainRegister } from '../Main'

describe('<MainRegister />', () => {
  it('MainRegister should be renders', () => {
    const mockupProps = {
      firstName: ''
    }
    const component = renderer.create(<MainRegister register={mockupProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
