import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Tab } from 'semantic-ui-react'
import { Breadcrumb, Button } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Notification from '../../Utils/Notification'
import LoadingPage from '../../Utils/LoadingPage'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import validator from '../../Utils/Validator'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import FormInput from '../../Utils/FormInput'
import Editor from '@monaco-editor/react'

export default class RulesCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDepartment: "",
            template: ''
        }
        this.templateEditorRef = React.createRef()
    }

    componentDidUpdate() {
        const { Rules, removeRulenotification } = this.props
        Notification(Rules.notifications, removeRulenotification)
    }

    render() {
        const { Rules, Profile } = this.props
        const { isLoading, isDispatching } = Rules

        return (
            isLoading || isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Rules"}>
                                <Breadcrumb.Section >{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
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
                                            content: <React.Fragment className='max-h-[calc(66vh-10px)] overflow-y-auto overflow-x-hidden'>
                                                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                            </React.Fragment>
                                        }
                                    },
                                    {
                                        menuItem: Literals.Columns.Editorscreen[Profile.Language],
                                        pane: {
                                            key: 'design',
                                            content: <div className='max-h-[calc(66vh-10px)] overflow-y-auto overflow-x-hidden'>
                                                <div className='p-2 shadow-lg shadow-gray-300'>
                                                    <Editor
                                                        height="60vh"
                                                        language="javascript"
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
                                <Link to="/Roles">
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

        const { AddRules, history, fillRulenotification, Profile } = this.props

        const data = formToObject(e.target)
        data.Rule = this.state.template
        data.Status = false
        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.NameRequired[Profile.Language] })
        }
        if (!validator.isString(data.Rule)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.RuleRequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillRulenotification(error)
            })
        } else {
            AddRules({ data, history })
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