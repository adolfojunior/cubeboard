import React from 'react'
import { connect } from 'react-redux'
import Sale from './Sale'

// Maps state from store to props
const mapStateToProps = ({ sale }) => ({ sale })

// Create a component connected to Store
export default connect(mapStateToProps)(Sale)
