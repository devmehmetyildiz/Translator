import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Form, Tab } from 'semantic-ui-react'
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
import Editor from "@monaco-editor/react";
export default class RecordtypesEdit extends Component {

    PAGE_NAME = 'RecordtypesEdit'

    constructor(props) {
        super(props)
        const json = {
            visible: {
                Orderno: true,
                RecordtypeID: true,
                PrinciblecourthauseID: true,
                PrinciblecourtID: true,
                Princibleno: true,
                Desicionno: true,
                DirectivecourthauseID: true,
                DirectivecourtID: true,
                Directiveno: true,
                Directiveinfo: true,
                CompanyID: true,
                CostumerID: true,
                Registerdate: true,
                Deliverydate: true,
                Prepayment: true,
                Notaryexpense: true,
                Netprice: true,
                TranslatorID: true,
                KdvID: true,
                PaymentID: true,
                CaseID: true
            }
        }
        this.state = {
            isDatafetched: false,
            template: JSON.stringify(json)
        }
        this.templateEditorRef = React.createRef()
    }

    componentDidMount() {
        const { GetRecordtype, match, history, RecordtypeID } = this.props
        let Id = RecordtypeID || match.params.RecordtypeID
        if (validator.isUUID(Id)) {
            GetRecordtype(Id)
        } else {
            history && history.push("/Recordtypes")
        }
    }

    componentDidUpdate() {
        const { Recordtypes, removeRecordtypenotification } = this.props
        const { selected_record, isLoading } = Recordtypes
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true, template: selected_record.Config })
            this.context.setForm(this.PAGE_NAME, selected_record)
        }
        Notification(Recordtypes.notifications, removeRecordtypenotification, this.context.clearForm)
    }

    render() {

        const { Recordtypes, Profile, history, Goals } = this.props

        const Pricetypeoptions = [
            { key: 1, text: 'GELİR', value: 1 },
            { key: 2, text: 'GİDER', value: -1 },
            { key: 3, text: 'PASİF', value: 0 },
        ]

        const Goaloptions = Goals.list.filter(u => u.Isactive).map(goal => {
            return { key: goal.Uuid, text: `${goal.Name} (${goal.Goal})`, value: goal.Uuid }
        })

        return (
            Recordtypes.isLoading || Recordtypes.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Recordtypes"}>
                                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                            </Link>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <Tab className='station-tab'
                                panes={[
                                    {
                                        menuItem: Literals.Columns.Savescreen[Profile.Language],
                                        pane: {
                                            key: 'save',
                                            content: <React.Fragment>
                                                <Form.Group widths={'equal'}>
                                                    <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                                    {this.context.formstates[`${this.PAGE_NAME}/Ishaveprice`] ?
                                                        <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Price[Profile.Language]} name="Price" type='number' display='try' />
                                                        : null}
                                                </Form.Group>
                                                <Form.Group widths={'equal'}>
                                                    <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Pricetype[Profile.Language]} name="Pricetype" options={Pricetypeoptions} formtype="dropdown" />
                                                    <FormInput page={this.PAGE_NAME} required placeholder={Literals.Columns.Goal[Profile.Language]} name="GoalID" options={Goaloptions} formtype="dropdown" />
                                                </Form.Group>
                                                <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Ishaveprice[Profile.Language]} name="Ishaveprice" formtype={'checkbox'} />
                                            </React.Fragment>
                                        }
                                    },
                                    {
                                        menuItem: Literals.Columns.Configscreen[Profile.Language],
                                        pane: {
                                            key: 'design',
                                            content: <div className='max-h-[calc(66vh-10px)] overflow-y-auto overflow-x-hidden'>
                                                <div className='p-2 shadow-lg shadow-gray-300'>
                                                    <Editor
                                                        height="60vh"
                                                        language="json"
                                                        value={this.state.template}
                                                        onMount={this.handleTemplateEditorDidMount}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    }
                                ]}
                                renderActiveOnly={false} />
                            <Footerwrapper>
                                <Form.Group widths={'equal'}>
                                    {history && <Link to="/Recordtypes">
                                        <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                                    </Link>}
                                    <Button floated="right" type="button" color='grey' onClick={(e) => { this.context.setForm(this.PAGE_NAME, Recordtypes.selected_record) }}>{Literals.Button.Clear[Profile.Language]}</Button>
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

        const { EditRecordtypes, history, fillRecordtypenotification, Recordtypes, Profile } = this.props
        const data = formToObject(e.target)
        data.Ishaveprice = this.context.formstates[`${this.PAGE_NAME}/Ishaveprice`] ? this.context.formstates[`${this.PAGE_NAME}/Ishaveprice`] : false
        data.Config = this.state.template
        data.Pricetype = this.context.formstates[`${this.PAGE_NAME}/Pricetype`]
        data.GoalID = this.context.formstates[`${this.PAGE_NAME}/GoalID`]
        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillRecordtypenotification(error)
            })
        } else {
            EditRecordtypes({ data: { ...Recordtypes.selected_record, ...data }, history })
        }
    }

    handleTemplateEditorChange = () => {
        this.setState({ template: this.templateEditorRef.current.getValue() })
    }

    handleTemplateEditorDidMount = (editor, monaco) => {
        this.templateEditorRef.current = editor
        this.templateEditorRef.current.onDidChangeModelContent(this.handleTemplateEditorChange)
    }
}
RecordtypesEdit.contextType = FormContext
