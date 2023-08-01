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

export default class GoalsCreate extends Component {

    PAGE_NAME = 'GoalsCreate'

    componentDidUpdate() {
        const { Goals, removeGoalnotification } = this.props
        Notification(Goals.notifications, removeGoalnotification, this.context.clearForm)
    }

    render() {
        const { Goals, Profile } = this.props

        return (
            Goals.isLoading || Goals.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Goals"}>
                                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                            </Link>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group widths={'equal'}>
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Goal[Profile.Language]} name="Goal" type='number' step='0.01' display='try' />
                            </Form.Group>
                            <Form.Group widths={'equal'}>
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isgeneralgoal[Profile.Language]} name="Isgeneralgoal" formtype='checkbox' />
                            </Form.Group>
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    <Link to="/Goals">
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
        const { AddGoals, history, fillGoalnotification, Profile } = this.props
        const data = formToObject(e.target)
        data.Goal = parseFloat(data.Goal)
        data.Isgeneralgoal = this.context.formstates[`${this.PAGE_NAME}/Isgeneralgoal`]
        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Goal)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Goalrequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillGoalnotification(error)
            })
        } else {
            AddGoals({ data, history })
        }
    }
}
GoalsCreate.contextType = FormContext