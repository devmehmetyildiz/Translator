import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, } from 'semantic-ui-react'
import { Breadcrumb, Button } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Notification from '../../Utils/Notification'
import LoadingPage from '../../Utils/LoadingPage'
import FormInput from '../../Utils/FormInput'
import Literals from './Literals'
import validator from "../../Utils/Validator"
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'

export default class JobsCreate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOrder: '',
      selectedSourcelanguage: '',
      selectedTargetlanguage: '',
      selectedDocument: '',
      selectedCase: '',
    }
  }


  componentDidMount() {
    const { GetLanguages, GetDocuments, GetCases, GetOrders } = this.props
    GetLanguages()
    GetDocuments()
    GetCases()
    GetOrders()
  }

  componentDidUpdate() {
    const {
      Jobs, removeJobnotification,
      Orders, removeOrdernotification,
      Languages, removeLanguagenotification,
      Documents, removeDocumentnotification,
      Cases, removeCasenotification,
    } = this.props
    Notification(Jobs.notifications, removeJobnotification)
    Notification(Orders.notifications, removeOrdernotification)
    Notification(Languages.notifications, removeLanguagenotification)
    Notification(Documents.notifications, removeDocumentnotification)
    Notification(Cases.notifications, removeCasenotification)
  }


  render() {
    const { Jobs, Orders, Languages, Documents, Cases, Profile } = this.props

    const Documentoption = Documents.list.map(document => {
      return { key: document.Uuid, text: document.Name, value: document.Uuid }
    })

    const Orderoption = Orders.list.map(order => {
      return { key: order.Uuid, text: order.Orderno, value: order.Uuid }
    })

    const Languageoption = Languages.list.map(document => {
      return { key: document.Uuid, text: document.Name, value: document.Uuid }
    })

    const Caseoption = Cases.list.map(cases => {
      return { key: cases.Uuid, text: cases.Name, value: cases.Uuid }
    })

    return (
      Jobs.isLoading || Jobs.isDispatching ||
        Orders.isLoading || Orders.isDispatching ||
        Languages.isLoading || Languages.isDispatching ||
        Documents.isLoading || Documents.isDispatching ||
        Cases.isLoading || Cases.isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Jobs"}>
                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <FormInput required placeholder={Literals.Columns.Order[Profile.Language]} options={Orderoption} onChange={(e, { value }) => { this.setState({ selectedOrder: value }) }} value={this.state.selectedOrder} formtype='dropdown' />
              <Form.Group widths={'equal'}>
                <FormInput required placeholder={Literals.Columns.Sourcelanguage[Profile.Language]} options={Languageoption} onChange={(e, { value }) => { this.setState({ selectedSourcelanguage: value }) }} value={this.state.selectedSourcelanguage} formtype='dropdown' />
                <FormInput required placeholder={Literals.Columns.Targetlanguage[Profile.Language]} options={Languageoption} onChange={(e, { value }) => { this.setState({ selectedTargetlanguage: value }) }} value={this.state.selectedTargetlanguage} formtype='dropdown' />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput required placeholder={Literals.Columns.Document[Profile.Language]} options={Documentoption} onChange={(e, { value }) => { this.setState({ selectedDocument: value }) }} value={this.state.selectedDocument} formtype='dropdown' />
                <FormInput required placeholder={Literals.Columns.Amount[Profile.Language]} type={'number'} />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput required placeholder={Literals.Columns.Price[Profile.Language]} type={'number'} />
                <FormInput required placeholder={Literals.Columns.Case[Profile.Language]} options={Caseoption} onChange={(e, { value }) => { this.setState({ selectedCase: value }) }} value={this.state.selectedCase} formtype='dropdown' />
              </Form.Group>
              <FormInput placeholder={Literals.Columns.Info[Profile.Language]} />
              <Footerwrapper>
                <Link to="/Jobs">
                  <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>{Literals.Button.Create[Profile.Language]}</Button>
              </Footerwrapper>
            </Form>
          </Contentwrapper>
        </Pagewrapper >
    )
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const { AddJobs, history, fillJobnotification, Profile } = this.props
    const data = formToObject(e.target)
    data.OrderID = this.state.selectedOrder
    data.SourcelanguageID = this.state.selectedSourcelanguage
    data.TargetlanguageID = this.state.selectedTargetlanguage
    data.DocumentID = this.state.selectedDocument
    data.CaseID = this.state.selectedCase
    data.Amount = parseInt(data.Amount)
    data.Price = parseFloat(data.Price)
    let errors = []
    if (!validator.isUUID(data.OrderID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Orderrequired[Profile.Language] })
    }
    if (!validator.isUUID(data.SourcelanguageID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Sourcelanguagerequired[Profile.Language] })
    }
    if (!validator.isUUID(data.TargetlanguageID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Targetlanguagerequired[Profile.Language] })
    }
    if (!validator.isUUID(data.DocumentID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Documentrequired[Profile.Language] })
    }
    if (!validator.isNumber(data.Amount)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Amountrequired[Profile.Language] })
    }
    if (!validator.isNumber(data.Price)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Pricerequired[Profile.Language] })
    }
    if (!validator.isUUID(data.CaseID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Caserequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillJobnotification(error)
      })
    } else {
      AddJobs({ data, history })
    }
  }
}