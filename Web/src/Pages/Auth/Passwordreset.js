import React, { Component } from 'react'
import Literals from './Literals'
import LoadingPage from '../../Utils/LoadingPage'
import { Breadcrumb, Button, Divider, Form, Header } from 'semantic-ui-react'
import FormInput from '../../Utils/FormInput'
import { Link } from 'react-router-dom'
import img from '../../Assets/img'

export default class Passwordreset extends Component {

  render() {

    const { Profile } = this.props

    return (
      false ? <LoadingPage /> :
        <div style={{ backgroundImage: `url(${img.loginbg})` }} className=' font-Common w-full h-[100vh] justify-center items-center flex bg-gray-100' >
          <div className=' w-full h-full mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
            <div className='w-full mx-auto align-middle'>
              <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
                <Breadcrumb size='big'>
                  <Breadcrumb.Section>{Literals.Page.Pageheaderreset[Profile.Language]}</Breadcrumb.Section>
                </Breadcrumb>
              </Header>
            </div>
            <Divider className='w-full  h-[1px]' />
            <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths={"equal"}>
                  <FormInput page={this.PAGE_NAME} type='password' placeholder={Literals.Columns.Newpassword[Profile.Language]} name="Newpassword" />
                  <FormInput page={this.PAGE_NAME} type='password' placeholder={Literals.Columns.Newpasswordre[Profile.Language]} name="Newpasswordre" />
                </Form.Group>
                <div className='flex flex-row w-full justify-between py-4  items-center'>
                  <div onClick={(e) => {
                    e.preventDefault()
                    this.props.history.goBack()
                  }}>
                    <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                  </div>
                  <Button floated="right" type='submit' color='blue'>{Literals.Button.Update[Profile.Language]}</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
    )
  }
}
