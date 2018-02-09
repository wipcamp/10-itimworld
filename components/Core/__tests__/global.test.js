/* eslint-env jest */

// import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import { Layout } from '../Global'

describe('<Layout />', () => {
  it('Layout should be renders', () => {
    const component = renderer.create(<Layout />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
