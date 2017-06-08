import React from 'react'
import { func } from 'prop-types'
import { Glyphicon, ButtonToolbar, Button } from 'react-bootstrap'
import FieldGroup from './common/FieldGroup'

export default class Sale extends React.Component {
  static propTypes = {
    onSave: func
  }
  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
  }
  onFormSubmit(event) {
    const { onSave } = this.props
    event.preventDefault()
    console.log('onFormSubmit', this.refs)
  }
  onValueChange(valueEvent) {
    console.log(`valueEvent:`, valueEvent)
  }
  render() {
    return (
      <div className="row">
        <form className="col-md-12 form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>

          <FieldGroup id="vendedor" label="Vendedor" type="text" placeholder="Vendedor" addonIcon="user" onValueChange={this.onValueChange} />
          <FieldGroup id="produto" label="Produto" type="text" placeholder="Produto" addonIcon="barcode" onValueChange={this.onValueChange} />
          <FieldGroup id="preco" label="Preço" type="number" placeholder="0.00" step="0.10" addonIcon="usd" onValueChange={this.onValueChange} />
          <FieldGroup id="quantidade" label="Quantidade" type="number" step="1" placeholder="0" onValueChange={this.onValueChange} />
          <FieldGroup id="desconto" label="Desconto" type="number" step="0.10" placeholder="0.00" onValueChange={this.onValueChange} />
          <FieldGroup id="total" label="Total" type="number" placeholder="0.00" step="0.10" addonIcon="usd" onValueChange={this.onValueChange} />
          <FieldGroup id="data" label="Data" type="text" placeholder="dd/MM/yyyy" addonIcon="calendar" onValueChange={this.onValueChange} />
          <FieldGroup id="hora" label="Hora" type="text" placeholder="hh:mm" addonIcon="time" onValueChange={this.onValueChange} />

          <FieldGroup id="select" label="Select" type="select" componentClass="select" placeholder="select" onValueChange={this.onValueChange} >
            <option value="">Select something</option>
            <option value="v1">Value 1</option>
            <option value="v2">Value 2</option>
            <option value="v3">Value 3</option>
          </FieldGroup>

          <FieldGroup id="textarea" label="Textarea" componentClass="textarea" placeholder="Descriçao" onValueChange={this.onValueChange} />

          <ButtonToolbar className="text-center">
            <Button bsSize="large" type="submit">
              <Glyphicon glyph="ok" />
              Registrar
            </Button>
          </ButtonToolbar>

        </form>
      </div>
    )
  }
}
