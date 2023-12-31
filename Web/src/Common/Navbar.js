import React, { Component } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react'
import { ROUTES } from '../Utils/Constants'
import config from '../Config'
import img from '../Assets/img'

const navbarLiterals = {
  editProfile: {
    en: "Edit Profile",
    tr: "Profil Düzenle"
  },
  changePassword: {
    en: "Change Password",
    tr: "Parola Değiştir"
  },
  exit: {
    en: "Exit",
    tr: "Çıkış Yap"
  },
  Yes: {
    en: "Yes",
    tr: "Evet"
  },
  No: {
    en: "No",
    tr: "Hayır"
  },
  exitText: {
    en: "Are you sure to exit?",
    tr: "Çıkış yapmak istediğine emin misiniz?"
  },
  exitTitle: {
    en: "You gonna exit from program!",
    tr: "Uygulamadan çıkış yapmak üzeresiniz"
  }
}
export class Navbar extends Component {
  state = { open: false }


  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  render() {
    const { iconOnly, seticonOnly, Profile, isMobile, Files, sethideMobile, hideMobile } = this.props
    const ishavePP = (Files.list || []).find(u => u.Usagetype === 'PP' && u.ParentID == Profile?.meta?.Uuid)


    const trigger = (
      <div className='flex flex-row justify-center items-center select-none'>
        {ishavePP ? <img alt='pp' src={`${config.services.File}${ROUTES.FILE}/Downloadfile/${ishavePP.Uuid}`} className="rounded-full" style={{ width: '30px', height: '30px' }} /> : <FaUserAlt className='text-white' />}
        <div className={`h-[58.61px] text-white mx-4 my-auto transition-all ease-in-out duration-500  text-center flex flex-col justify-center items-center `}>
          <p className='m-0 text-sm font-semibold tracking-wider font-Common '>{Profile.username}</p>
          <p className='m-0 text-xs text-white dark:text-TextColor  '>
            <span className='mr-[2px]'>{Profile?.meta?.Roles?.length > 0 && Profile?.meta?.Roles[0]?.Name}</span>
          </p>
        </div>
      </div>
    )

    return (
      <nav
        className={`w-[100%] h-[58.61px] bg-[#2355a0] dark:bg-Contentfg mx-auto flex flex-row justify-between items-center fixed top-0 ${Profile.Ismobile ? 'pl-[12px]' : 'pl-[20px]'} z-50`}>
        <div className={`${Profile.Ismobile ? '' : 'hidden'}`} onClick={() => { sethideMobile(hideMobile) }}>  <Icon size='large' className='text-white' name={hideMobile ? 'angle double right' : 'angle double left'} /></div>
        <div className={`group flex flex-col cursor-pointer justify-center items-center ${isMobile ? 'hidden' : 'visible'}`} onClick={() => { seticonOnly(!iconOnly) }}>
          <div className='h-[2px] group-hover:bg-[#747474] bg-white dark:bg-[#3d3d3d]  w-[20px]' />
          <div className='h-[2px] group-hover:bg-[#747474] bg-white dark:bg-[#3d3d3d] my-[3px] w-[20px]' />
          <div className='h-[2px] group-hover:bg-[#747474] bg-white dark:bg-[#3d3d3d]  w-[20px]' />
        </div>
        < div className='p-2 w-[250px] flex justify-center items-center' >
          <div className='flex flex-row justify-center items-center w-full'>
            <p className='select-none m-0 font-Common font-bold text-[1.84em] line-none text-white dark:text-TextColor'>STAR</p>
            {!Profile.Ismobile && <img className='text-[10px] w-[50px] h-[50px]' src={img.translatoricon} alt="" />}
            <p className='select-none m-0 font-Common font-bold text-[1.84em] line-none text-[#7eabc5] dark:text-TextColor'>NOTE</p>
          </div>
        </div >
        <div className='flex flex-row justify-center items-center h-full'>
          <Dropdown icon={null} trigger={trigger} basic className="h-full block">
            <Dropdown.Menu className='!right-[1%] !left-auto '>
              <Dropdown.Item>
                <Link to='/Profile/Edit' className='text-[#3d3d3d] hover:text-[#3d3d3d]'><Icon className='id card ' />{navbarLiterals.editProfile[Profile.Language]}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/profile/change-password' className='text-[#3d3d3d] hover:text-[#3d3d3d]'> <Icon className='lock' />{navbarLiterals.changePassword[Profile.Language]}</Link>
              </Dropdown.Item>
              <Dropdown.Item className='layout-menu-item logout'
              >
                <Modal
                  open={this.state.open}
                  trigger={<Button>{navbarLiterals.exit[Profile.Language]}</Button>}
                  onClose={() => this.handleClose()}
                  onOpen={() => this.handleOpen()}
                >
                  <Header icon='archive' content='Uygulamadan Çıkmak Üzeresiniz!' />
                  <Modal.Content>
                    <p>
                      {navbarLiterals.exitText[Profile.Language]}
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='red' onClick={() => this.handleClose()} >
                      <Icon name='remove' /> {navbarLiterals.No[Profile.Language]}
                    </Button>
                    <Button color='green' onClick={() => { this.LogoutHandler() }}>
                      <Icon name='checkmark' /> {navbarLiterals.Yes[Profile.Language]}
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav >
    )
  }

  LogoutHandler = (e) => {
    const { logOut } = this.props
    this.setState({ open: false })
    logOut()
  }

}
export default Navbar