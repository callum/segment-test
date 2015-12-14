import React, { Component } from 'react'

function focusable (Child) {
  return class extends Component {
    componentDidUpdate (prevProps) {
      const { props } = this

      if (props.focus === props.segment.id && props.focus !== prevProps.focus) {
        this.segment.focus()
      }
    }

    handleFocus () {
      this.props.activateFocus(this.props.segment.id)
    }

    handleBlur () {
      this.props.deactivateFocus(this.props.segment.id)
    }

    render () {
      return <Child
        setFocusRef={ref => this.segment = ref}
        handleFocus={this.handleFocus.bind(this)}
        handleBlur={this.handleFocus.bind(this)}
        {...this.props} />
    }
  }
}
