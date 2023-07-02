import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Divider, Dropdown, Form, Header, Icon, Popup } from 'semantic-ui-react'
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

  constructor(props) {
    super(props)
    this.state = {
      selecteddepartments: [],
      isDatafetched: false,
      selectedstatusOption: {}
    }
  }

  componentDidMount() {
    const { GetCase, match, history, GetDepartments } = this.props
    if (validator.isUUID(match.params.CaseID)) {
      GetCase(match.params.CaseID)
      GetDepartments()
    } else {
      history.push("/Cases")
    }
  }

  componentDidUpdate() {
    const { Departments, Cases, removeCasenotification, removeDepartmentnotification } = this.props
    const { selected_record, isLoading } = Cases
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && Departments.list.length > 0 && !Departments.isLoading && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selecteddepartments: selected_record.Departments.map(department => {
          return department.Uuid
        }), isDatafetched: true, selectedstatusOption: selected_record.CaseStatus
      })
      this.context.setFormstates(selected_record)
    }
    Notification(Cases.notifications, removeCasenotification)
    Notification(Departments.notifications, removeDepartmentnotification)
  }

  render() {

    const { Cases, Departments, Profile } = this.props

    const Departmentoptions = Departments.list.map(department => {
      return { key: department.Uuid, text: department.Name, value: department.Uuid }
    })

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
      Cases.isLoading || Cases.isDispatching || Departments.isLoading || Departments.isDispatching ? <LoadingPage /> :
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
              <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
              <FormInput required placeholder={Literals.Columns.Shortname[Profile.Language]} name="Shortname" />
            </Form.Group>
            <Form.Group widths='equal'>
              <FormInput required placeholder={Literals.Columns.Casecolor[Profile.Language]} name="Casecolor" attention="blue,red,green..." />
              <FormInput required placeholder={Literals.Columns.CaseStatus[Profile.Language]} options={casestatusOption} onChange={this.handleChangeOption} value={this.state.selectedstatusOption} formtype="dropdown" />
            </Form.Group>
            <Form.Group widths='equal'>
              <FormInput required placeholder={Literals.Columns.Departmentstxt[Profile.Language]} clearable search multiple options={Departmentoptions} onChange={this.handleChange} value={this.state.selecteddepartments} formtype="dropdown" />
            </Form.Group>
            <Footerwrapper>
              <Link to="/Cases">
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

    const { EditCases, history, fillCasenotification, Departments, Cases, Profile } = this.props
    const { list } = Departments
    const data = formToObject(e.target)
    data.CaseStatus = this.state.selectedstatusOption
    data.Departments = this.state.selecteddepartments.map(department => {
      return list.find(u => u.Uuid === department)
    })

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
    if (!validator.isArray(data.Departments)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Departmentsrequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillCasenotification(error)
      })
    } else {
      EditCases({ data: { ...Cases.selected_record, ...data }, history })
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ selecteddepartments: value })
  }

  handleChangeOption = (e, { value }) => {
    this.setState({ selectedstatusOption: value })
  }
}
CasesEdit.contextType = FormContext
