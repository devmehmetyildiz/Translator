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
export default class CourtsEdit extends Component {

    PAGE_NAME = 'CourtsEdit'

    constructor(props) {
        super(props)
        this.state = {
            isDatafetched: false,
        }
    }

    componentDidMount() {
        const { GetCourt, match, history, CourtID } = this.props
        let Id = CourtID || match.params.CourtID
        if (validator.isUUID(Id)) {
            GetCourt(Id)
        } else {
            history && history.push("/Courts")
        }
    }

    componentDidUpdate() {
        const { Courts, removeCourtnotification } = this.props
        const { selected_record, isLoading } = Courts
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true })
            this.context.setForm(this.PAGE_NAME, selected_record)
        }
        Notification(Courts.notifications, removeCourtnotification, this.context.clearForm)
    }

    render() {

        const { Courts, Profile, history } = this.props

        return (
            Courts.isLoading || Courts.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Courts"}>
                                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                            </Link>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                            <Form.Group widths={'equal'}>
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultprincible[Profile.Language]} name="Isdefaultprincible" formtype='checkbox' />
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultdirective[Profile.Language]} name="Isdefaultdirective" formtype='checkbox' />
                            </Form.Group>
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    {history && <Link to="/Courts">
                                        <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                                    </Link>}
                                    <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.setForm(this.PAGE_NAME, Courts.selected_record) }}>{Literals.Button.Clear[Profile.Language]}</Button>
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

        const { EditCourts, history, fillCourtnotification, Courts, Profile } = this.props
        const data = formToObject(e.target)
        data.Isdefaultprincible = this.context.formstates[`${this.PAGE_NAME}/Isdefaultprincible`]
        data.Isdefaultdirective = this.context.formstates[`${this.PAGE_NAME}/Isdefaultdirective`]
        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillCourtnotification(error)
            })
        } else {
            EditCourts({ data: { ...Courts.selected_record, ...data }, history })
        }
    }
}
CourtsEdit.contextType = FormContext
