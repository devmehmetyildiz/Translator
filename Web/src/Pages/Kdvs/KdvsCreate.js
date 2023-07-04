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

export default class KdvsCreate extends Component {

    componentDidUpdate() {
        const { Kdvs, removeKdvnotification } = this.props
        Notification(Kdvs.notifications, removeKdvnotification)
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
                            <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
                        </Headerbredcrump>
                    </Headerwrapper>
                    <Pagedivider />
                    <Contentwrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group widths={'equal'}>
                                <FormInput required placeholder={Literals.Columns.Name[Profile.Language]} name="Name" />
                                <FormInput required placeholder={Literals.Columns.Percent[Profile.Language]} name="Percent" type='number' step='0.01' attention='yüzde değer giriniz' />
                            </Form.Group>
                            <Footerwrapper>
                                <Link to="/Kdvs">
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
        const { AddKdvs, history, fillKdvnotification, Profile } = this.props
        const data = formToObject(e.target)
        data.Percent = parseFloat(data.Percent)

        let errors = []
        if (!validator.isString(data.Name)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Namerequired[Profile.Language] })
        }
        if (!validator.isNumber(data.Percent)) {
            errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Percentrequired[Profile.Language] })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillKdvnotification(error)
            })
        } else {
            AddKdvs({ data, history })
        }
    }
}