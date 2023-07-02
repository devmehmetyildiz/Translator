import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Divider, Dropdown, Form, Header } from 'semantic-ui-react'
import Notification from '../../Utils/Notification'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import validator from '../../Utils/Validator'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import FormInput from '../../Utils/FormInput'
import { FormContext } from '../../Provider/FormProvider'
export default class UsersEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedstations: [],
      selectedroles: [],
      selectedlanguage: {},
      selecteddepartments: [],
      isDatafetched: false,
    }
  }

  componentDidMount() {
    const { GetUser, GetStations, GetRoles, GetDepartments, match, history } = this.props
    if (match.params.UserID) {
      GetUser(match.params.UserID)
      GetStations()
      GetRoles()
      GetDepartments()
    } else {
      history.push("/Users")
    }
  }

  componentDidUpdate() {
    const { Departments, Roles, Stations, Users,
      removeDepartmentnotification, removeStationnotification, removeRolenotification,
      removeUsernotification } = this.props
    const { selected_record, isLoading } = Users
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 &&
      Departments.list.length > 0 && !Departments.isLoading && Roles.list.length > 0 && !Roles.isLoading &&
      Stations.list.length > 0 && !Stations.isLoading && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selecteddepartments: selected_record.Departments.map(department => {
          return department.Uuid
        }),
        selectedroles: selected_record.Roles.map(role => {
          return role.Uuid
        }),
        selectedstations: selected_record.Stations.map(station => {
          return station.Uuid
        }),
        selectedlanguage: selected_record.Language,
        isDatafetched: true
      })
      console.log('selected_record: ', selected_record);
      this.context.setFormstates(selected_record)
    }
    Notification(Departments.notifications, removeDepartmentnotification)
    Notification(Users.notifications, removeUsernotification)
    Notification(Stations.notifications, removeStationnotification)
    Notification(Roles.notifications, removeRolenotification)
  }


  render() {

    const { Departments, Users, Stations, Roles, Profile } = this.props

    const Stationoptions = Stations.list.map(station => {
      return { key: station.Uuid, text: station.Name, value: station.Uuid }
    })
    const Roleoptions = Roles.list.map(roles => {
      return { key: roles.Uuid, text: roles.Name, value: roles.Uuid }
    })
    const Departmentoptions = Departments.list.map(department => {
      return { key: department.Uuid, text: department.Name, value: department.Uuid }
    })
    const Languageoptions = [
      { key: 1, text: 'EN', value: 'en' },
      { key: 2, text: 'TR', value: 'tr' },
    ]


    return (
      Departments.isLoading || Departments.isDispatching ||
        Roles.isLoading || Roles.isDispatching ||
        Users.isLoading || Users.isDispatching ||
        Stations.isLoading || Stations.isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Users"}>
                <Breadcrumb.Section >{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths={'equal'}>
                <FormInput placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                <FormInput placeholder={Literals.Columns.Surname[Profile.Language]} name="Surname" />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput placeholder={Literals.Columns.Email[Profile.Language]} name="Email" />
                <FormInput placeholder={Literals.Columns.Username[Profile.Language]} name="Username" />
                <FormInput placeholder={Literals.Columns.UserID[Profile.Language]} name="UserID" type='Number' />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput placeholder={Literals.Columns.City[Profile.Language]} name="City" />
                <FormInput placeholder={Literals.Columns.Town[Profile.Language]} name="Town" />
                <FormInput placeholder={Literals.Columns.Address[Profile.Language]} name="Address" />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput placeholder={Literals.Columns.Stations[Profile.Language]} value={this.state.selectedstations} clearable search multiple options={Stationoptions} onChange={this.handleChangeStation} formtype='dropdown' />
                <FormInput placeholder={Literals.Columns.Departments[Profile.Language]} value={this.state.selecteddepartments} clearable search multiple options={Departmentoptions} onChange={this.handleChangeDepartment} formtype='dropdown' />
                <FormInput placeholder={Literals.Columns.Roles[Profile.Language]} value={this.state.selectedroles} clearable search multiple options={Roleoptions} onChange={this.handleChangeRoles} formtype='dropdown' />
              </Form.Group>
              <FormInput placeholder={Literals.Columns.Language[Profile.Language]} value={this.state.selectedlanguage} options={Languageoptions} onChange={this.handleChangeLanguage} formtype='dropdown' />
              <Footerwrapper>
                <Link to="/Users">
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
    const { EditUsers, history, fillUsernotification, Roles, Departments, Stations, Users, Profile } = this.props
    const data = formToObject(e.target)
    data.UserID = parseInt(data.UserID, 10)
    data.Stations = this.state.selectedstations.map(station => {
      return Stations.list.find(u => u.Uuid === station)
    })
    data.Roles = this.state.selectedroles.map(roles => {
      return Roles.list.find(u => u.Uuid === roles)
    })
    data.Departments = this.state.selecteddepartments.map(department => {
      return Departments.list.find(u => u.Uuid === department)
    })
    data.Language = this.state.selectedlanguage

    let errors = []
    if (!validator.isString(data.Name)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.NameRequired[Profile.Language] })
    }
    if (!validator.isString(data.Surname)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.SurnameRequired[Profile.Language] })
    }
    if (!validator.isString(data.Username)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.UsernameRequired[Profile.Language] })
    }
    if (!validator.isString(data.Email)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.EmailRequired[Profile.Language] })
    }
    if (!validator.isArray(data.Stations)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.StationsRequired[Profile.Language] })
    }
    if (!validator.isArray(data.Departments)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.DepartmentsRequired[Profile.Language] })
    }
    if (!validator.isArray(data.Roles)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.RolesRequired[Profile.Language] })
    }
    if (!validator.isString(data.Language)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.LanguageRequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillUsernotification(error)
      })
    } else {
      EditUsers({ data: { ...Users.selected_record, ...data }, history })
    }
  }

  handleChangeStation = (e, { value }) => {
    this.setState({ selectedstations: value })
  }
  handleChangeDepartment = (e, { value }) => {
    this.setState({ selecteddepartments: value })
  }
  handleChangeRoles = (e, { value }) => {
    this.setState({ selectedroles: value })
  }
  handleChangeLanguage = (e, { value }) => {
    this.setState({ selectedlanguage: value })
  }
}
UsersEdit.contextType = FormContext