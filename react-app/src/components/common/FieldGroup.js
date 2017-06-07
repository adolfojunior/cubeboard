import React from 'react'
import { func } from 'prop-types'
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
    onValueChange: func.isRequired
  }

  constructor(props) {
    super(props)
  }

  validState() {
    return 'success'
  }

  onChange(event) {
    const value = event.target.value
    const { onValueChange } = this.props
    console.log(`onchange:`, value)
    this.onValueChange({
      valid: true,
      value
    })
  }

  render() {
    const {
      id,
      label,
      help,
      leftAddon,
      leftAddonIcon,
      rightAddon,
      rightAddonIcon,
      onValueChange,
      ...props
    } = this.props

    const formControl = <FormControl onChange={this.onChange.bind(this)} {...props} />

    return (
      <FormGroup controlId={id} className="row" validationState={this.validState()}>
        <ControlLabel className="col-md-2">{label}</ControlLabel>
        <div className="col-md-10">
          {this.renderInputGroup({
            leftAddon,
            leftAddonIcon,
            rightAddon,
            rightAddonIcon,
          }, formControl)}
        </div>
      </FormGroup>
    )
  }

  renderInputGroup({ leftAddon, leftAddonIcon, rightAddon, rightAddonIcon }, formControl) {
    if (leftAddon || leftAddonIcon || rightAddon || rightAddonIcon) {
      return (
        <InputGroup>
          {this.renderAddon(leftAddon, leftAddonIcon)}
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
