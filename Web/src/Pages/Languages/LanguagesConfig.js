import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import Literals from './Literals'
import LoadingPage from '../../Utils/LoadingPage'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import validator from '../../Utils/Validator'
import formToObject from 'form-to-object'

export default class LanguagesConfig extends Component {

    render() {
        const { Profile, Languages, open, onOpen, onClose } = this.props
        const { config } = Languages

        return (
            <Modal
                open={open}
                onOpen={onOpen}
                onClose={onClose}
            >
                <Modal.Header>{Literals.Page.Pagelanguageconfigeditheader[Profile.Language]}</Modal.Header>
                <Modal.Content >
                    {Languages.isLoading ? <LoadingPage /> :
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input defaultValue={config?.Wordcount} fluid name='Wordcount' label={Literals.Columns.Wordcount[Profile.Language]} />
                            <Form.Input defaultValue={config?.Linecount} fluid name='Linecount' label={Literals.Columns.Linecount[Profile.Language]} />
                            <Form.Input defaultValue={config?.Charcount} fluid name='Charcount' label={Literals.Columns.Charcount[Profile.Language]} />
                            <Footerwrapper>
                                <Button floated="right" type='submit' color='blue'>{Literals.Button.Update[Profile.Language]}</Button>
                            </Footerwrapper>
                        </Form>
                    }
                </Modal.Content>
            </Modal>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { Editconfig, Profile, fillnotification, Languages } = this.props
        const data = formToObject(e.target)
        validator.isString(data.Wordcount) && (data.Wordcount = parseInt(data.Wordcount))
        validator.isString(data.Linecount) && (data.Linecount = parseInt(data.Linecount))
        validator.isString(data.Charcount) && (data.Charcount = parseInt(data.Charcount))

        let errors = []
        if (!validator.isNumber(data.Wordcount)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Wordrequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Linecount)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Linerequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Charcount)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Charrequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillnotification(error)
            })
        } else {
            Editconfig({ data: { ...Languages.config, ...data } })
        }
    }
}
