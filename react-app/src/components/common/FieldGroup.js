import React from 'react'
import { func, string } from 'prop-types'
import {
  ControlLabel,
  FormGroup,
  FormControl,
  InputGroup,
  HelpBlock,
  Glyphicon
} from 'react-bootstrap'

export default class FieldGroup extends React.Component {

  static propTypes = {
    id: string.isRequired,
    onValueChange: func
  }

  constructor(props) {
    super(props)
    this.state = {
      valid: null,
      value: null
    }
  }

  getValidationState() {
    const { valid } = this.state
    if (valid === true) {
      return 'success'
    } else if (valid === false) {
      return 'error'
    }
    return null
  }

  handleChange({ id, onValueChange }, event) {
    const value = event.target.value
    const valid = !!value
    this.setState({ valid, value })
    onValueChange && onValueChange({
      id,
      valid,
      value
    })
  }

  render() {
    const {
      id,
      label,
      help,
      addon,
      addonIcon,
      rightAddon,
      rightAddonIcon,
      onValueChange,
      ...props
    } = this.props

    const handleChange = this.handleChange.bind(this, { id, onValueChange })
    const formControl = <FormControl {...props} onChange={handleChange} onBlur={handleChange} />

    return (
      <FormGroup controlId={id} className="row" validationState={this.getValidationState()}>
        <ControlLabel className="col-md-2">{label}</ControlLabel>
        <div className="col-md-10">
          {this.renderInputGroup({
            addon,
            addonIcon,
            rightAddon,
            rightAddonIcon,
          }, formControl)}
        </div>
      </FormGroup>
    )
  }

  renderInputGroup({ addon, addonIcon, rightAddon, rightAddonIcon }, formControl) {
    if (addon || addonIcon || rightAddon || rightAddonIcon) {
      return (
        <InputGroup>
          {this.renderAddon(addon, addonIcon)}
          {formControl}
          {this.renderAddon(rightAddon, rightAddonIcon)}
        </InputGroup>
      )
    } else {
      return formControl
    }
  }

  renderAddon(addon, glyph) {
    if (addon || glyph) {
      const glyphicon = glyph && (<Glyphicon glyph={glyph}/>)
      return (
        <InputGroup.Addon>
          {addon}
          {glyphicon}
        </InputGroup.Addon>
      )
    }
    return null
  }
}
