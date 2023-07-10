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
import { FormContext } from '../../Provider/FormProvider'

export default class JobsCreate extends Component {

  PAGE_NAME = 'JobsCreate'

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
    Notification(Jobs.notifications, removeJobnotification, this.context.clearForm)
    Notification(Orders.notifications, removeOrdernotification, this.context.clearForm)
    Notification(Languages.notifications, removeLanguagenotification, this.context.clearForm)
    Notification(Documents.notifications, removeDocumentnotification, this.context.clearForm)
    Notification(Cases.notifications, removeCasenotification, this.context.clearForm)
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
              <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Order[Profile.Language]} options={Orderoption} name='OrderID' formtype='dropdown' />
              <Form.Group widths={'equal'}>
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Sourcelanguage[Profile.Language]} name='SourcelanguageID' options={Languageoption} formtype='dropdown' />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Targetlanguage[Profile.Language]} name='TargetlanguageID' options={Languageoption} formtype='dropdown' />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Document[Profile.Language]} name='DocumentID' options={Documentoption} formtype='dropdown' />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Amount[Profile.Language]} name='Amount' type={'number'} />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Price[Profile.Language]} name='Price' type={'number'} />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Case[Profile.Language]} name='CaseID' options={Caseoption} formtype='dropdown' />
              </Form.Group>
              <FormInput name='Info' placeholder={Literals.Columns.Info[Profile.Language]} />
              <Footerwrapper>
                <Form.Group widths={'equal'}>
                  <Link to="/Jobs">
                    <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                  </Link>
                  <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.clearForm(this.PAGE_NAME) }}>{Literals.Button.Clear[Profile.Language]}</Button>
                </Form.Group>
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
    data.OrderID = this.context.formstates[`${this.PAGE_NAME}/OrderID`]
    data.SourcelanguageID = this.context.formstates[`${this.PAGE_NAME}/SourcelanguageID`]
    data.TargetlanguageID = this.context.formstates[`${this.PAGE_NAME}/TargetlanguageID`]
    data.DocumentID = this.context.formstates[`${this.PAGE_NAME}/DocumentID`]
    data.CaseID = this.context.formstates[`${this.PAGE_NAME}/CaseID`]
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
JobsCreate.contextType = FormContext