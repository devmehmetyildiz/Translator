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
export default class TranslatorsEdit extends Component {

    PAGE_NAME = 'TranslatorsEdit'

    constructor(props) {
        super(props)
        this.state = {
            selectedUser: '',
        }
    }


    componentDidMount() {
        const { GetTranslator, GetUsers, match, history, TranslatorID } = this.props
        let Id = TranslatorID || match.params.TranslatorID
        if (validator.isUUID(Id)) {
            GetTranslator(Id)
            GetUsers()
        } else {
            history && history.push("/Translators")
        }
    }

    componentDidUpdate() {
        const { Translators, removeTranslatornotification, Users, removeUsernotification } = this.props
        const { selected_record, isLoading } = Translators
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 &&
            !isLoading && !this.state.isDatafetched && !Users.isLoading && Users.list.length > 0) {
            this.setState({ isDatafetched: true, selectedUser: selected_record.UserID })
            this.context.setForm(this.PAGE_NAME, selected_record)
        }
        Notification(Translators.notifications, removeTranslatornotification, this.context.clearForm)
        Notification(Users.notifications, removeUsernotification, this.context.clearForm)
    }


    render() {
        const { Translators, Users, Profile, history } = this.props

        const Useroptions = Users.list.filter(u=>u.Isactive).map(user => {
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
                            <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput page={this.PAGE_NAME} clearable required placeholder={Literals.Columns.UserName[Profile.Language]} options={Useroptions} onChange={this.handleChangeUser} value={this.state.selectedUser} formtype="dropdown" />
                            </Form.Group>
                            <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaulttranslator[Profile.Language]} name="Isdefaulttranslator" formtype="checkbox" />
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    {history && <Link to="/Translators">
                                        <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                                    </Link>}
                                    <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.setForm(this.PAGE_NAME, Translators.selected_record) }}>{Literals.Button.Clear[Profile.Language]}</Button>
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
        const { EditTranslators, Translators, history, fillTranslatenotification, Profile } = this.props
        const data = formToObject(e.target)
        data.UserID = this.state.selectedUser
        data.Isdefaulttranslator = this.context.formstates[`${this.PAGE_NAME}/Isdefaulttranslator`]

        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillTranslatenotification(error)
            })
        } else {
            EditTranslators({ data: { ...Translators.selected_record, ...data }, history })
        }
    }

    handleChangeUser = (e, { value }) => {
        this.setState({ selectedUser: value })
    }
}
TranslatorsEdit.contextType = FormContext