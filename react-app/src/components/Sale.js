import React from 'react'
import { func } from 'prop-types'
import FieldGroup from './common/FieldGroup'

export default class Sale extends React.Component {
  static propTypes = {
    onSave: func
  }
  constructor(props) {
    super(props)
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

          <FieldGroup ref="xxx" id="formControlsText" type="text" label="Text" placeholder="Enter text" leftAddon="@" onValueChange={this.onValueChange.bind(this)} />
          <FieldGroup id="formControlsText" type="text" label="Text" placeholder="Enter text" leftAddonIcon="user"  onValueChange={this.onValueChange.bind(this)} />

            <div className="form-group row">
              <label htmlFor="salesman" className="col-md-2 control-label">Vendedor</label>
              <div className="col-md-10">
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-user"></span>
                    </span>
                    <input className="form-control" type="text" value="" id="salesman" placeholder="vendedor"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="product" className="col-md-2 control-label">Produto</label>
              <div className="col-md-10">
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-barcode"></span>
                    </span>
                    <input className="form-control" type="text" value="" id="product" placeholder="produto"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="price" className="col-md-2 control-label">Preço</label>
              <div className="col-md-10">
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-usd"></span>
                    </span>
                    <input className="form-control" type="number" step="0.10" value="" id="price" placeholder="preço"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="quantity" className="col-md-2 control-label">Quantidade</label>
              <div className="col-md-10">
                  <input className="form-control" type="number" step="1" value="" id="quantity" placeholder="0"/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="discount" className="col-md-2 control-label">Desconto</label>
              <div className="col-md-10">
                <div className="input-group">
                  <span className="input-group-addon">%</span>
                  <input className="form-control" type="number" step="0.10" value="" id="discount" placeholder="0.00"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="total" className="col-md-2 control-label">Total</label>
              <div className="col-md-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-usd"></span>
                  </span>
                  <input className="form-control" type="number" step="0.10" value="" id="total" placeholder="0"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="sales_date" className="col-md-2 control-label">Data Venda</label>
              <div className="col-md-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                  <input className="form-control" type="text" value="" id="sales_date" placeholder="dd/MM/yyyy"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-2 control-label">Hora Venda</label>
              <div className="col-md-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-time"/>
                  </span>
                  <input className="form-control" type="text" value="" id="sales_time" placeholder="hh:mm"/>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-offset-2 col-md-10 text-center">
                <button id="btn-save" className="btn btn-lg btn-primary" type="submit">
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    Registrar
                </button>
              </div>
            </div>

        </form>
      </div>
    )
  }
}
