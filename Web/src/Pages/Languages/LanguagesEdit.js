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
export default class LanguagesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedkdv: '',
        }
    }


    componentDidMount() {
        const { GetLanguage, GetKdvs, match, history } = this.props
        if (validator.isUUID(match.params.LanguageID)) {
            GetLanguage(match.params.LanguageID)
            GetKdvs()
        } else {
            history.push("/Languages")
        }
    }

    componentDidUpdate() {
        const { Languages, removeLanguagenotification, Kdvs, removeKdvnotification } = this.props
        const { selected_record, isLoading } = Languages
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 &&
            !isLoading && !this.state.isDatafetched && !Kdvs.isLoading && Kdvs.list.length > 0) {
            this.setState({ isDatafetched: true, selectedkdv: selected_record.KdvID })
            this.context.setFormstates(selected_record)
        }
        Notification(Languages.notifications, removeLanguagenotification)
        Notification(Kdvs.notifications, removeKdvnotification)
    }


    render() {
        const { Languages, Kdvs, Profile } = this.props

        const Kdvoptions = Kdvs.list.map(kdv => {
            return { key: kdv.Uuid, text: kdv.Name, value: kdv.Uuid }
        })

        return (
            Languages.isLoading || Languages.isDispatching || Kdvs.isLoading || Kdvs.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Languages"}>
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
                                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput required placeholder={Literals.Columns.Price[Profile.Language]} name="Price" type='number' step='0.01' display='try'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <FormInput required placeholder={Literals.Columns.KdvPercent[Profile.Language]} options={Kdvoptions} onChange={this.handleChangeKdv} value={this.state.selectedkdv} formtype="dropdown" />
                                <FormInput required placeholder={Literals.Columns.Discount[Profile.Language]} name="Discount" type='number' step='0.01' />
                            </Form.Group>
                            <Footerwrapper>
                                <Link to="/Languages">
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
        const { EditLanguages, Languages, history, fillLanguagenotification, Profile } = this.props
        const data = formToObject(e.target)
        data.KdvID = this.state.selectedkdv
        data.Price = parseFloat(data.Price)
        data.Discount = parseFloat(data.Discount)

        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Price)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Pricerequired[Profile.Language] })
        }
        if (!validator.isUUID(data.KdvID)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Kdvrequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Discount)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Discountrequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillLanguagenotification(error)
            })
        } else {
            EditLanguages({ data: { ...Languages.selected_record, ...data }, history })
        }
    }

    handleChangeKdv = (e, { value }) => {
        this.setState({ selectedkdv: value })
    }
}
LanguagesEdit.contextType = FormContext