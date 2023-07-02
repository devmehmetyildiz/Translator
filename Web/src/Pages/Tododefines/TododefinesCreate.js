
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox, Divider, Dropdown, Form } from 'semantic-ui-react'
import { Breadcrumb, Button, Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import validator from '../../Utils/Validator'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import FormInput from '../../Utils/FormInput'
export default class TododefinesCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRequired: false,
      isNeedactivation: false,
      selectedCheckperiods: []
    }
  }

  componentDidMount() {
    const { GetCheckperiods } = this.props
    GetCheckperiods()
  }

  componentDidUpdate() {
    const { Tododefines, removeTododefinenotification, Checkperiods, removeCheckperiodnotification } = this.props
    Notification(Tododefines.notifications, removeTododefinenotification)
    Notification(Checkperiods.notifications, removeCheckperiodnotification)
  }

  render() {

    const { Tododefines, Checkperiods, Profile } = this.props
    const { isLoading, isDispatching } = Tododefines

    const Checkperiodsoptions = Checkperiods.list.map(checkperiod => {
      return { key: checkperiod.Uuid, text: checkperiod.Name, value: checkperiod.Uuid }
    })

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Tododefines"}>
                <Breadcrumb.Section >{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths={'equal'}>
                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                <FormInput placeholder={Literals.Columns.Info[Profile.Language]} name="Info" />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <FormInput required placeholder={Literals.Columns.Checkperiods[Profile.Language]} value={this.state.selectedCheckperiods} clearable search multiple options={Checkperiodsoptions} onChange={(e, { value }) => { this.setState({ selectedCheckperiods: value }) }} formtype='dropdown' />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field>
                  <Checkbox toggle className='m-2'
                    onClick={(e) => { this.setState({ isRequired: !this.state.isRequired }) }}
                    label={Literals.Columns.IsRequired[Profile.Language]}
                    checked={this.state.isRequired} />
                </Form.Field>
                <Form.Field>
                  <Checkbox toggle className='m-2'
                    onChange={(e) => {
                      this.setState({ isNeedactivation: !this.state.isNeedactivation })
                    }}
                    label={Literals.Columns.IsNeedactivation[Profile.Language]}
                    checked={this.state.isNeedactivation} />
                </Form.Field>
              </Form.Group>
              <Footerwrapper>
                <Link to="/Tododefines">
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

    const { AddTododefines, history, fillTododefinenotification, Checkperiods, Profile } = this.props

    const data = formToObject(e.target)
    data.Checkperiods = this.state.selectedCheckperiods.map(checkperiod => {
      return Checkperiods.list.find(u => u.Uuid === checkperiod)
    })
    data.IsRequired = this.state.isRequired
    data.IsNeedactivation = this.state.isNeedactivation

    let errors = []
    if (!validator.isString(data.Name)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.NameRequired[Profile.Language] })
    }
    if (!validator.isArray(data.Checkperiods)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.CheckperiodsRequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillTododefinenotification(error)
      })
    } else {
      AddTododefines({ data, history })
    }
  }


}
