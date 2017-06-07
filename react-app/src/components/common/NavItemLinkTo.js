import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'react-bootstrap'

export default class NavItemLinkTo extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape.isRequired
    }).isRequired
  }

  transitionTo = (event) => {
    const {
      context: { router: { history } },
      props: { href }
    } = this
    event.preventDefault()
    history.push(href)
  }

  render() {
    const { href, children, ...props } = this.props
    return (
      <NavItem onClick={this.transitionTo} href={href} {...props}>
        {children}
      </NavItem>
    )
  }
}
