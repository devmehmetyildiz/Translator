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
export default class DefinedcostumersEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDatafetched: false,
        }
    }

    componentDidMount() {
        const { GetDefinedcostumer, match, history } = this.props
        if (validator.isUUID(match.params.DefinedcostumerID)) {
            GetDefinedcostumer(match.params.DefinedcostumerID)
        } else {
            history.push("/Definedcostumers")
        }
    }

    componentDidUpdate() {
        const { Definedcostumers, removeDefinedcostumernotification } = this.props
        const { selected_record, isLoading } = Definedcostumers
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true })
            this.context.setFormstates(selected_record)
        }
        Notification(Definedcostumers.notifications, removeDefinedcostumernotification)
    }

    render() {

        const { Definedcostumers, Profile } = this.props

        return (
            Definedcostumers.isLoading || Definedcostumers.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Definedcostumers"}>
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
                                <FormInput placeholder={Literals.Columns.CountryID[Profile.Language]} name="CountryID" />
                            </Form.Group>
                            <Form.Group widths={'equal'}>
                                <FormInput placeholder={Literals.Columns.Email[Profile.Language]} name="Email" />
                                <FormInput placeholder={Literals.Columns.Phone[Profile.Language]} name="Phone" />
                            </Form.Group>
                            <Form.Group widths={'equal'}>
                                <FormInput placeholder={Literals.Columns.City[Profile.Language]} name="City" />
                                <FormInput placeholder={Literals.Columns.Town[Profile.Language]} name="Town" />
                            </Form.Group>
                            <FormInput required placeholder={Literals.Columns.Address[Profile.Language]} name="Address" />
                            <Footerwrapper>
                                <Link to="/Definedcostumers">
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

        const { EditDefinedcostumers, history, fillDefinedcompanynotification, Definedcostumers, Profile } = this.props
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
            EditDefinedcostumers({ data: { ...Definedcostumers.selected_record, ...data }, history })
        }
    }
}
DefinedcostumersEdit.contextType = FormContext
