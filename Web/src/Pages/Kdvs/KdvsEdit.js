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
export default class KdvsEdit extends Component {

    PAGE_NAME = 'KdvsEdit'

    constructor(props) {
        super(props)
        this.state = {
            isDatafetched: false,
        }
    }

    componentDidMount() {
        const { GetKdv, match, history, KdvID } = this.props
        let Id = KdvID || match.params.KdvID
        if (validator.isUUID(Id)) {
            GetKdv(Id)
        } else {
            history && history.push("/Kdvs")
        }
    }

    componentDidUpdate() {
        const { Kdvs, removeKdvnotification } = this.props
        const { selected_record, isLoading } = Kdvs
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true })
            this.context.setForm(this.PAGE_NAME, selected_record)
        }
        Notification(Kdvs.notifications, removeKdvnotification, this.context.clearForm)
    }

    render() {

        const { Kdvs, Profile } = this.props

        return (
            Kdvs.isLoading || Kdvs.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Kdvs"}>
                                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                            </Link>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group widths={'equal'}>
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Percent[Profile.Language]} name="Percent" type='number' step='0.01' display='percent' />
                            </Form.Group>
                            <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Isdefaultkdv[Profile.Language]} name="Isdefaultkdv" formtype="checkbox" />
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    <Link to="/Kdvs">
                                        <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                                    </Link>
                                    <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.setForm(this.PAGE_NAME, Kdvs.selected_record) }}>{Literals.Button.Clear[Profile.Language]}</Button>
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

        const { EditKdvs, history, fillPercentnotification, Kdvs, Profile } = this.props
        const data = formToObject(e.target)
        data.Percent = parseFloat(data.Percent)
        data.Isdefaultkdv = this.context.formstates[`${this.PAGE_NAME}/Isdefaultkdv`]
        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Percent)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Percentrequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillPercentnotification(error)
            })
        } else {
            EditKdvs({ data: { ...Kdvs.selected_record, ...data }, history })
        }
    }
}
KdvsEdit.contextType = FormContext
