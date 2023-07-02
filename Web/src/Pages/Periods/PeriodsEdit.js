import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Divider, Form, Header } from 'semantic-ui-react'
import Notification from '../../Utils/Notification'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import { FormContext } from '../../Provider/FormProvider'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import FormInput from '../../Utils/FormInput'
import validator from '../../Utils/Validator'
export default class PeriodsEdit extends Component {
  constructor(props) {
    super(props)
    const isDatafetched = false
    this.state = {
      isDatafetched
    }
  }

  componentDidMount() {
    const { GetPeriod, match, history } = this.props
    if (match.params.PeriodID) {
      GetPeriod(match.params.PeriodID)
    } else {
      history.push("/Periods")
    }
  }


  componentDidUpdate() {
    const { removePeriodnotification, Periods } = this.props
    const { selected_record, isLoading } = Periods
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
      this.setState({
        isDatafetched: true
      })
      this.context.setFormstates(selected_record)
    }
    Notification(Periods.notifications, removePeriodnotification)
  }

  render() {

    const { Periods, Profile } = this.props
    const { isLoading, isDispatching } = Periods

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Periods"}>
                <Breadcrumb.Section >{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
              </Form.Field>
              <Form.Group widths={"equal"}>
                <FormInput required type='time' placeholder={Literals.Columns.Occuredtime[Profile.Language]} name="Occuredtime" />
                <FormInput required type='time' placeholder={Literals.Columns.Checktime[Profile.Language]} name="Checktime" />
              </Form.Group>
              <Footerwrapper>
                <Link to="/Periods">
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

    const { EditPeriods, history, fillPeriodnotification, Periods, Profile } = this.props
    const data = formToObject(e.target)
    let errors = []
    if (!validator.isString(data.Name)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
    }
    if (!validator.isString(data.Occuredtime)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Occuredtimerequired[Profile.Language] })
    }
    if (!validator.isString(data.Checktime)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Checktimerequired[Profile.Language] })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillPeriodnotification(error)
      })
    } else {
      EditPeriods({ data: { ...Periods.selected_record, ...data }, history })
    }

  }
}
PeriodsEdit.contextType = FormContext