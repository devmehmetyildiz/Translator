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
export default class DocumentsEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDatafetched: false,
        }
    }

    componentDidMount() {
        const { GetDocument, match, history } = this.props
        if (validator.isUUID(match.params.DocumentID)) {
            GetDocument(match.params.DocumentID)
        } else {
            history.push("/Documents")
        }
    }

    componentDidUpdate() {
        const { Documents, removeDocumentnotification } = this.props
        const { selected_record, isLoading } = Documents
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.Id !== 0 && !isLoading && !this.state.isDatafetched) {
            this.setState({ isDatafetched: true })
            this.context.setFormstates(selected_record)
        }
        Notification(Documents.notifications, removeDocumentnotification)
    }

    render() {

        const { Documents, Profile } = this.props

        return (
            Documents.isLoading || Documents.isDispatching ? <LoadingPage /> :
                <Pagewrapper>
                    <Headerwrapper>
                        <Headerbredcrump>
                            <Link to={"/Documents"}>
                                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                            </Link>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section>{Literals.Page.Pageeditheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                            <Footerwrapper>
                                <Link to="/Documents">
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

        const { EditDocuments, history, fillDocumentnotification, Documents, Profile } = this.props
        const data = formToObject(e.target)

        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillDocumentnotification(error)
            })
        } else {
            EditDocuments({ data: { ...Documents.selected_record, ...data }, history })
        }
    }
}
DocumentsEdit.contextType = FormContext
