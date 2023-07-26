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
export default class PaymentsEdit extends Component {

    PAGE_NAME = 'PaymentsEdit'

    constructor(props) {
        super(props)
        this.state = {
            isDatafetched: false,
        }
    }

    componentDidMount() {
        const { GetPayment, match, history, PaymentID } = this.props
        let Id = PaymentID || match.params.PaymentID
        if (validator.isUUID(Id)) {
            GetPayment(Id)
        } else {
            history && history.push("/Payments")
        }
    }

    componentDidUpdate() {
        const { Payments, removePaymentnotification } = this.props
        const { selected_record, isLoading } = Payments
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true })
            this.context.setForm(this.PAGE_NAME, selected_record)
        }
        Notification(Payments.notifications, removePaymentnotification, this.context.clearForm)
    }

    render() {

        const { Payments, Profile, history } = this.props

        return (
            Payments.isLoading || Payments.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Payments"}>
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
                            <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultpayment[Profile.Language]} name="Isdefaultpayment" formtype='checkbox'/>
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    {history && <Link to="/Payments">
                                        <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                                    </Link>}
                                    <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.setForm(this.PAGE_NAME, Payments.selected_record) }}>{Literals.Button.Clear[Profile.Language]}</Button>
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

        const { EditPayments, history, fillPaymentnotification, Payments, Profile } = this.props
        const data = formToObject(e.target)
        data.Isdefaultpayment = this.context.formstates[`${this.PAGE_NAME}/Isdefaultpayment`]
        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillPaymentnotification(error)
            })
        } else {
            EditPayments({ data: { ...Payments.selected_record, ...data }, history })
        }
    }
}
PaymentsEdit.contextType = FormContext
