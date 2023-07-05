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
    const { Translators, Users, Profile } = this.props

    const Useroptions = Users.list.map(user => {
      return { key: user.Uuid, text: user.Username, value: user.Uuid }
    })

    return (
      Translators.isLoading || Translators.isDispatching || Users.isLoading || Users.isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Translators"}>
                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                <FormInput required placeholder={Literals.Columns.UserName[Profile.Language]} options={Useroptions} onChange={this.handleChangeUser} value={this.state.selectedUser} formtype="dropdown" />
              </Form.Group>
              <Footerwrapper>
                <Link to="/Translators">
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
    const { AddTranslators, history, fillTranslatornotification, Profile } = this.props
    const data = formToObject(e.target)
    data.UserID = this.state.selectedUser

    let errors = []
    if (!validator.isString(data.Name)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillTranslatornotification(error)
      })
    } else {
      AddTranslators({ data, history })
    }
  }

  handleChangeUser = (e, { value }) => {
    this.setState({ selectedUser: value })
  }
}