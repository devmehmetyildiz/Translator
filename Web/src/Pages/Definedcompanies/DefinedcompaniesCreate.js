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

export default class DefinedcompaniesCreate extends Component {

    PAGE_NAME = 'DefinedcompaniesCreate'

    componentDidUpdate() {
        const { Definedcompanies, removeDefinedcompanynotification } = this.props
        Notification(Definedcompanies.notifications, removeDefinedcompanynotification, this.context.clearForm)
    }

    render() {
        const { Definedcompanies, Profile, history } = this.props

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
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput page={this.PAGE_NAME}  placeholder={Literals.Columns.Address[Profile.Language]} name="Address" />
                            </Form.Group>
                            <Form.Group widths={'equal'}>
                                <FormInput page={this.PAGE_NAME}  placeholder={Literals.Columns.Acccountcode[Profile.Language]} name="Acccountcode" />
                                <FormInput page={this.PAGE_NAME}  placeholder={Literals.Columns.Accountname[Profile.Language]} name="Accountname" />
                            </Form.Group>
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    {history && <Link to="/Definedcompanies">
                                        <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                                    </Link>}
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
        const { AddDefinedcompanies, history, fillDefinedcompanynotification, Profile } = this.props
        const data = formToObject(e.target)

        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
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
DefinedcompaniesCreate.contextType = FormContext