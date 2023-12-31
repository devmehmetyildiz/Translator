import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Form } from 'semantic-ui-react'
import Notification from '../../Utils/Notification'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import FormInput from '../../Utils/FormInput'
import Literals from './Literals'
import validator from "../../Utils/Validator"
import { FormContext } from '../../Provider/FormProvider'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
export default class CasesEdit extends Component {

  PAGE_NAME = 'CasesEdit'

  constructor(props) {
    super(props)
    this.state = {
      isDatafetched: false,
    }
  }

  componentDidMount() {
    const { GetCase, match, history, CaseID } = this.props
    let Id = CaseID || match?.params?.CaseID
    if (validator.isUUID(Id)) {
      GetCase(Id)
    } else {
      history && history.push("/Cases")
    }
  }

  componentDidUpdate() {
    const { Cases, removeCasenotification } = this.props
    const { selected_record, isLoading } = Cases
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
      this.setState({ isDatafetched: true })
      this.context.setForm(this.PAGE_NAME, selected_record)
    }
    Notification(Cases.notifications, removeCasenotification, this.context.clearForm)
    this.Checkvalues()
  }

  render() {

    const { Cases, Profile, history } = this.props

    const casestatusOption = [
      {
        key: '-1',
        text: Literals.Options.caseStatusoption.value0[Profile.Language],
        value: -1,
      },
      {
        key: '0',
        text: Literals.Options.caseStatusoption.value1[Profile.Language],
        value: 0,
      },
      {
        key: '1',
        text: Literals.Options.caseStatusoption.value2[Profile.Language],
        value: 1,
      }
    ]

    return (
      Cases.isLoading || Cases.isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Cases"}>
                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Shortname[Profile.Language]} name="Shortname" />
              </Form.Group>
              <Form.Group widths='equal'>
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Casecolor[Profile.Language]} name="Casecolor" attention="blue,red,green..." />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.CaseStatus[Profile.Language]} options={casestatusOption} name="CaseStatus" formtype="dropdown" />
              </Form.Group>
              <Form.Group widths='equal'>
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultcancelcase[Profile.Language]} name="Isdefaultcancelcase" formtype="checkbox" />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultendcase[Profile.Language]} name='Isdefaultendcase' formtype="checkbox" />
                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultpassivecase[Profile.Language]} name='Isdefaultpassivecase' formtype="checkbox" />
              </Form.Group>
              <Footerwrapper>
                <Form.Group widths={'equal'}>
                  {history && <Link to="/Cases">
                    <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                  </Link>}
                  <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.setForm(this.PAGE_NAME, Cases.selected_record) }}>{Literals.Button.Clear[Profile.Language]}</Button>
                </Form.Group>
                <Button floated="right" type='submit' color='blue'>{Literals.Button.Update[Profile.Language]}</Button>
              </Footerwrapper>
            </Form>
          </Contentwrapper>
        </Pagewrapper >
    )
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const { EditCases, history, fillCasenotification, Cases, Profile } = this.props
    const data = formToObject(e.target)
    data.CaseStatus = this.context.formstates[`${this.PAGE_NAME}/CaseStatus`]
    data.Isdefaultcancelcase = this.context.formstates[`${this.PAGE_NAME}/Isdefaultcancelcase`]
    data.Isdefaultendcase = this.context.formstates[`${this.PAGE_NAME}/Isdefaultendcase`]
    data.Isdefaultpassivecase = this.context.formstates[`${this.PAGE_NAME}/Isdefaultpassivecase`]

    let errors = []
    if (!validator.isString(data.Name)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
    }
    if (!validator.isNumber(data.CaseStatus)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Casestatusrequired[Profile.Language] })
    }
    if (!validator.isString(data.Casecolor)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Casecolorrequired[Profile.Language] })
    }
    if (!validator.isString(data.Shortname)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Shortnamerequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillCasenotification(error)
      })
    } else {
      EditCases({ data: { ...Cases.selected_record, ...data }, history })
    }
  }

  Checkvalues = () => {
    const CaseStatus = this.context.formstates[`${this.PAGE_NAME}/CaseStatus`]
    const Isdefaultcancelcase = this.context.formstates[`${this.PAGE_NAME}/Isdefaultcancelcase`]
    const Isdefaultendcase = this.context.formstates[`${this.PAGE_NAME}/Isdefaultendcase`]
    const Isdefaultpassivecase = this.context.formstates[`${this.PAGE_NAME}/Isdefaultpassivecase`]
    if (CaseStatus !== 1 && Isdefaultendcase) {
      this.context.setFormstates({ ...this.context.formstates, [`${this.PAGE_NAME}/Isdefaultendcase`]: false })
    }
    if (CaseStatus !== 0 && Isdefaultpassivecase) {
      this.context.setFormstates({ ...this.context.formstates, [`${this.PAGE_NAME}/Isdefaultpassivecase`]: false })
    }
    if (CaseStatus !== -1 && Isdefaultcancelcase) {
      this.context.setFormstates({ ...this.context.formstates, [`${this.PAGE_NAME}/Isdefaultcancelcase`]: false })
    }
  }
}
CasesEdit.contextType = FormContext
