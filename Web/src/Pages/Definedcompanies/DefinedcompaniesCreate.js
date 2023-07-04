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

export default class DefinedcompaniesCreate extends Component {

    componentDidUpdate() {
        const { Definedcompanies, removeDefinedcompanynotification } = this.props
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
        const { AddDefinedcompanies, history, fillDefinedcompanynotification, Profile } = this.props
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
            AddDefinedcompanies({ data, history })
        }
    }
}