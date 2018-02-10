import React from 'react'

export default () => Component => {
  return class extends React.Component {
    state = {
      show: false,
      initialValues: {}
    }

    componentWillMount () {
      this.setState({initialValues: { user_id: 10009 }})
    }

    render () {
      if (this.state.show) {
        return <div />
      }
      return <Component {...this.props} initialValues={this.state.initialValues} />
    }
  }
}
