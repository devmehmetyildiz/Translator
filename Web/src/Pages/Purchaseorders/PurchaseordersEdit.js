import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Form, Icon, Modal, Tab, Table } from 'semantic-ui-react'
import { Breadcrumb, Button } from 'semantic-ui-react'
import Notification from '../../Utils/Notification'
import LoadingPage from '../../Utils/LoadingPage'
import formToObject from 'form-to-object'
import FormInput from '../../Utils/FormInput'
import Literals from './Literals'
import validator from "../../Utils/Validator"
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
import StockdefinesCreate from '../../Containers/Stockdefines/StockdefinesCreate'
import { FormContext } from '../../Provider/FormProvider'
export default class PurchaseordersEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedStocks: [],
      selectedCase: '',
      isDatafetched: false,
      selectedWarehouse: '',
      inputvalues: {},
      open: false
    }
  }

  componentDidMount() {
    const { GetPurchaseorder, match, history, GetStockdefines, GetCases, GetDepartments, GetWarehouses } = this.props
    if (match.params.PurchaseorderID) {
      GetPurchaseorder(match.params.PurchaseorderID)
      GetStockdefines()
      GetCases()
      GetDepartments()
      GetWarehouses()
    } else {
      history.push("/Purchaseorders")
    }

  }

  componentDidUpdate() {
    const { Stockdefines, Purchaseorders, Cases, Departments, Warehouses, removePurchaseordernotification, removeDepartmentnotification,
      removeCasenotification, removeStockdefinenotification, removeWarehousenotification } = this.props
    const { selected_record, isLoading } = Purchaseorders
    if (selected_record && Object.keys(selected_record).length > 0 &&
      selected_record.Id !== 0 && Stockdefines.list.length > 0 && !Stockdefines.isLoading
      && Cases.list.length > 0 && !Cases.isLoading
      && Warehouses.list.length > 0 && !Warehouses.isLoading
      && Departments.list.length > 0 && !Departments.isLoading
      && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selectedStocks: selected_record.Stocks, isDatafetched: true, selectedCase: selected_record.CaseID, selectedWarehouse: selected_record.WarehouseID
      })
      this.context.setFormstates(selected_record)
    }

    Notification(Purchaseorders.notifications, removePurchaseordernotification)
    Notification(Departments.notifications, removeDepartmentnotification)
    Notification(Cases.notifications, removeCasenotification)
    Notification(Stockdefines.notifications, removeStockdefinenotification)
    Notification(Warehouses.notifications, removeWarehousenotification)
  }

  render() {

    const { Cases, Departments, Stockdefines, Warehouses, Purchaseorders, Profile } = this.props
    const { isLoading, isDispatching } = Purchaseorders

    const Stockdefinesoption = (Stockdefines.list || []).map(stockdefine => {
      return { key: stockdefine.Uuid, text: stockdefine.Name, value: stockdefine.Uuid }
    })

    const Departmentsoption = (Departments.list || []).map(department => {
      return { key: department.Uuid, text: department.Name, value: department.Uuid }
    })

    const Casesoption = (Cases.list || []).filter(u => u.caseStatus !== 1).map(cases => {
      return { key: cases.Uuid, text: cases.Name, value: cases.Uuid }
    })
    const Warehousesoption = (Warehouses.list || []).map(warehouse => {
      return { key: warehouse.Uuid, text: warehouse.Name, value: warehouse.Uuid }
    })

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Purchaseorders"}>
                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Tab className='station-tab'
                panes={[
                  {
                    menuItem: Literals.Columns.Purchaseorders[Profile.Language],
                    pane: {
                      key: 'save',
                      content: <React.Fragment>
                        <div className='h-[calc(62vh-10px)]'>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Warehouse[Profile.Language]} value={this.state.selectedWarehouse} options={Warehousesoption} onChange={(e, data) => { this.setState({ selectedWarehouse: data.value }) }} formtype='dropdown' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Company[Profile.Language]} name="Company" />
                            <FormInput placeholder={Literals.Columns.Purchaseprice[Profile.Language]} name="Purchaseprice" type='number' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Companypersonelname[Profile.Language]} name="Companypersonelname" />
                            <FormInput placeholder={Literals.Columns.Purchasenumber[Profile.Language]} name="Purchasenumber" />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.CaseName[Profile.Language]} value={this.state.selectedCase} clearable search options={Casesoption} onChange={(e, data) => { this.setState({ selectedCase: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Personelname[Profile.Language]} name="Personelname" />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Purchasedate[Profile.Language]} name="Purchasedate" type='date' />
                            <FormInput placeholder={Literals.Columns.Info[Profile.Language]} name="Info" />
                          </Form.Group>
                        </div>
                      </React.Fragment>
                    }
                  },
                  {
                    menuItem: Literals.Columns.Stocksscreen[Profile.Language],
                    pane: {
                      key: 'design',
                      content: <React.Fragment>
                        <div className='h-[calc(62vh-10px)] overflow-y-auto'>
                          <Table celled className='list-table ' key='product-create-type-conversion-table ' >
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell width={1}>{Literals.Columns.Order[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.StockDefine[Profile.Language]} <span>
                                  <Modal
                                    onClose={() => this.setState({ open: false })}
                                    onOpen={() => this.setState({ open: true })}
                                    trigger={<Icon link name='plus' />}
                                    content={<StockdefinesCreate />}
                                  >
                                  </Modal>
                                </span></Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Department[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Barcodeno[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Skt[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Amount[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={6}>{Literals.Columns.Info[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{Literals.Columns.Delete[Profile.Language]}</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {this.state.selectedStocks.sort((a, b) => a.Order - b.Order).map((stock, index) => {
                                return <Table.Row key={stock.key}>
                                  <Table.Cell>
                                    <Button.Group basic size='small'>
                                      <Button type='button' disabled={index === 0} icon='angle up' onClick={() => { this.selectedProductChangeHandler(stock.key, 'Order', stock.Order - 1) }} />
                                      <Button type='button' disabled={index + 1 === this.state.selectedStocks.length} icon='angle down' onClick={() => { this.selectedProductChangeHandler(stock.key, 'Order', stock.Order + 1) }} />
                                    </Button.Group>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Field>
                                      <Dropdown placeholder={Literals.Columns.StockDefine[Profile.Language]} name="StockdefineID" clearable search fluid selection options={Stockdefinesoption} value={stock.StockdefineID} onChange={(e, data) => { this.selectedProductChangeHandler(stock.key, 'StockdefineID', data.value) }} />
                                    </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Field>
                                      <Dropdown placeholder={Literals.Columns.Department[Profile.Language]} name="DepartmentID" clearable search fluid selection options={Departmentsoption} value={stock.DepartmentID} onChange={(e, data) => { this.selectedProductChangeHandler(stock.key, 'DepartmentID', data.value) }} />
                                    </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Barcodeno[Profile.Language]} name="Barcodeno" fluid value={stock.Barcodeno} onChange={(e) => { this.selectedProductChangeHandler(stock.key, 'Barcodeno', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Skt[Profile.Language]} name="Skt" type='date' fluid value={stock.Skt} onChange={(e) => { this.selectedProductChangeHandler(stock.key, 'Skt', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Amount[Profile.Language]} name="Amount" type="number" fluid value={stock.Amount} onChange={(e) => { this.selectedProductChangeHandler(stock.key, 'Amount', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Info[Profile.Language]} name="Info" fluid value={stock.Info} onChange={(e) => { this.selectedProductChangeHandler(stock.key, 'Info', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell className='table-last-section'>
                                    <Icon className='type-conversion-remove-icon' link color='red' name='minus circle'
                                      onClick={() => { this.removeProduct(stock.key, stock.Order) }} />
                                  </Table.Cell>
                                </Table.Row>
                              })}
                            </Table.Body>
                            <Table.Footer>
                              <Table.Row>
                                <Table.HeaderCell colSpan='8'>
                                  <Button type="button" color='green' className='addMoreButton' size='mini' onClick={() => { this.AddNewProduct() }}>{Literals.Button.Addproduct[Profile.Language]}</Button>
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Footer>
                          </Table>
                        </div>
                      </React.Fragment>
                    }
                  }
                ]}
                renderActiveOnly={false} />
              <Pagedivider />
              <Footerwrapper>
                <Link to="/Purchaseorders">
                  <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>{Literals.Button.Update[Profile.Language]}</Button>
              </Footerwrapper>
            </Form>
          </Contentwrapper>
        </Pagewrapper >
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { EditPurchaseorders, Purchaseorders, history, fillPurchaseordernotification, Profile } = this.props
    const stocks = this.state.selectedStocks
    const formData = formToObject(e.target)

    stocks.forEach(data => {
      data.Amount = parseFloat(data.Amount)
      delete data.key
    });

    const responseData = {
      Info: Array.isArray(formData.Info) ? formData.Info[0] : formData.Info,
      Company: formData.Company,
      Purchaseprice: parseFloat(formData.Purchaseprice),
      Purchasenumber: formData.Purchasenumber,
      Companypersonelname: formData.Companypersonelname,
      Personelname: formData.Personelname,
      Purchasedate: formData.Purchasedate,
      CaseID: this.state.selectedCase,
      WarehouseID: this.state.selectedWarehouse,
      Stocks: stocks
    }

    let errors = []
    responseData.Stocks.forEach(data => {
      if (!validator.isUUID(data.StockdefineID)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Stockdefinerequired[Profile.Language] })
      }
      if (!validator.isUUID(data.DepartmentID)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Departmentrequired[Profile.Language] })
      }
      if (!validator.isISODate(data.Skt)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Sktrequired[Profile.Language] })
      }
      if (!validator.isString(data.Barcodeno)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Barcodenorequired[Profile.Language] })
      }
      if (!validator.isNumber(data.Amount)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Amountrequired[Profile.Language] })
      }
    });

    if (!validator.isString(responseData.Company)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Companyrequired[Profile.Language] })
    }
    if (!validator.isNumber(responseData.Purchaseprice)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Purchasepricerequired[Profile.Language] })
    }
    if (!validator.isString(responseData.Companypersonelname)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Companypersonelnamerequired[Profile.Language] })
    }
    if (!validator.isString(responseData.Purchasenumber)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Purchasenumberrequired[Profile.Language] })
    }
    if (!validator.isString(responseData.Personelname)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Personelnamerequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.CaseID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Caserequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.WarehouseID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Warehouserequired[Profile.Language] })
    }
    if (!validator.isISODate(responseData.Purchasedate)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Purchasedaterequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillPurchaseordernotification(error)
      })
    } else {
      EditPurchaseorders({ data: { ...Purchaseorders.selected_record, ...responseData }, history })
    }
  }

  AddNewProduct = () => {
    this.setState({
      selectedStocks: [...this.state.selectedStocks,
      {
        Id: 0,
        PurchaseorderID: '',
        Purchaseorder: {},
        StockdefineID: '',
        Stockdefine: {},
        DepartmentID: '',
        Department: {},
        Skt: null,
        Barcodeno: '',
        Amount: 0,
        Status: 0,
        Info: '',
        Willdelete: false,
        key: Math.random(),
        Order: this.state.selectedStocks.length,
      }]
    })
  }

  removeProduct = (key, order) => {
    let stocks = this.state.selectedStocks.filter(productionRoute => productionRoute.key !== key)
    stocks.filter(stock => stock.Order > order).forEach(stock => stock.Order--)
    this.setState({ selectedStocks: stocks })
  }

  selectedProductChangeHandler = (key, property, value) => {
    let productionRoutes = this.state.selectedStocks
    const index = productionRoutes.findIndex(productionRoute => productionRoute.key === key)
    if (property === 'order') {
      productionRoutes.filter(productionRoute => productionRoute.Order === value)
        .forEach((productionRoute) => productionRoute.Order = productionRoutes[index].Order > value ? productionRoute.Order + 1 : productionRoute.Order - 1)
    }
    productionRoutes[index][property] = value
    this.setState({ selectedStocks: productionRoutes })
  }

}
PurchaseordersEdit.contextType = FormContext
