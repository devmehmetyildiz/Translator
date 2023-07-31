import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Tab, } from 'semantic-ui-react'
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
import Editor from "@monaco-editor/react";
export default class RecordtypesCreate extends Component {

    PAGE_NAME = 'RecordtypesCreate'

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
            template: JSON.stringify(json)
        }
        this.templateEditorRef = React.createRef()
    }

    componentDidUpdate() {
        const { Recordtypes, removeRecordtypenotification } = this.props
        Notification(Recordtypes.notifications, removeRecordtypenotification, this.context.clearForm)
    }

    render() {
        const { Recordtypes, Profile, history, Goals } = this.props

        const Pricetypeoptions = [
            { key: 1, text: 'GELİR', value: 1 },
            { key: 2, text: 'GİDER', value: -1 },
            { key: 3, text: 'PASİF', value: 0 },
        ]

        const Goaloptions = Goals.list.map(goal => {
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
                            <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
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
        const { AddRecordtypes, history, fillRecordtypenotification, Profile } = this.props
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
            AddRecordtypes({ data, history })
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
RecordtypesCreate.contextType = FormContext