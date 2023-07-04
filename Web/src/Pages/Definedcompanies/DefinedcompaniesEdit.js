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
export default class DefinedcompaniesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDatafetched: false,
        }
    }

    componentDidMount() {
        const { GetDefinedcompany, match, history } = this.props
        if (validator.isUUID(match.params.DefinedcompanyID)) {
            GetDefinedcompany(match.params.DefinedcompanyID)
        } else {
            history.push("/Definedcompanies")
        }
    }

    componentDidUpdate() {
        const { Definedcompanies, removeDefinedcompanynotification } = this.props
        const { selected_record, isLoading } = Definedcompanies
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true })
            this.context.setFormstates(selected_record)
        }
        Notification(Definedcompanies.notifications, removeDefinedcompanynotification)
    }

    render() {

        const { Definedcompanies, Profile } = this.props

        return (
            Definedcompanies.isLoading || Definedcompanies.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Definedcompanies"}>
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
                                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput required placeholder={Literals.Columns.Address[Profile.Language]} name="Address" />
                            </Form.Group>
                            <Form.Group widths={'equal'}>
                                <FormInput required placeholder={Literals.Columns.Acccountcode[Profile.Language]} name="Acccountcode" />
                                <FormInput required placeholder={Literals.Columns.Accountname[Profile.Language]} name="Accountname" />
                            </Form.Group>
                            <Footerwrapper>
                                <Link to="/Definedcompanies">
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

        const { EditDefinedcompanies, history, fillDefinedcompanynotification, Definedcompanies, Profile } = this.props
        const data = formToObject(e.target)

        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (!validator.isString(data.Address)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Addressrequired[Profile.Language] })
        }
        if (!validator.isString(data.Acccountcode)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Accountcoderequired[Profile.Language] })
        }
        if (!validator.isString(data.Accountname)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Accountnamerequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillDefinedcompanynotification(error)
            })
        } else {
            EditDefinedcompanies({ data: { ...Definedcompanies.selected_record, ...data }, history })
        }
    }
}
DefinedcompaniesEdit.contextType = FormContext
