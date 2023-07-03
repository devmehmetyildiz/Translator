import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Divider, Grid, GridColumn, Header, Icon, Modal } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import UsersDelete from '../../Containers/Users/UsersDelete'
export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedrecord: {},
      rolesStatus: [],
    }
  }

  componentDidMount() {
    const { GetUsers } = this.props
    GetUsers()
  }

  componentDidUpdate() {
    const { Users, removeUsernotification } = this.props
    Notification(Users.notifications, removeUsernotification)
  }


  render() {
    const { Users, Profile, handleDeletemodal, handleSelectedUser } = this.props
    const { isLoading, isDispatching } = Users

    const Columns = [
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Username[Profile.Language], accessor: 'Username', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.NormalizedUsername[Profile.Language], accessor: 'NormalizedUsername', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Email[Profile.Language], accessor: 'Email', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.EmailConfirmed[Profile.Language], accessor: 'EmailConfirmed', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.AccessFailedCount[Profile.Language], accessor: 'AccessFailedCount', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Surname[Profile.Language], accessor: 'Surname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.PhoneNumber[Profile.Language], accessor: 'PhoneNumber', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.PhoneNumberConfirmed[Profile.Language], accessor: 'PhoneNumberConfirmed', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.City[Profile.Language], accessor: 'City', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Town[Profile.Language], accessor: 'Town', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Address[Profile.Language], accessor: 'Address', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Language[Profile.Language], accessor: 'Language', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.UserID[Profile.Language], accessor: 'UserID', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Roles[Profile.Language], accessor: 'Rolestxt', sortable: true, canGroupBy: true, canFilter: true, isOpen: false, Cell: col => this.rolesCellhandler(col) },
      { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const metaKey = "Users"
    let tableMeta = (Profile.tablemeta || []).find(u => u.Meta === metaKey)
    const initialConfig = {
      hiddenColumns: tableMeta ? JSON.parse(tableMeta.Config).filter(u => u.isVisible === false).map(item => {
        return item.key
      }) : ["Uuid", "Createduser", "Updateduser", "Createtime", "Updatetime"],
      columnOrder: tableMeta ? JSON.parse(tableMeta.Config).sort((a, b) => a.order - b.order).map(item => {
        return item.key
      }) : []
    };

    const list = (Users.list || []).map(item => {
      var rolestext = (item.Roles || []).map((role) => {
        return role.Name;
      }).join(", ")
    
      return {
        ...item,
        Rolestxt: rolestext,
        edit: <Link to={`/Users/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
        delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
          handleSelectedUser(item)
          handleDeletemodal(true)
        }} />
      }
    })

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
              <Grid columns='2' >
                <GridColumn width={8} className="">
                  <Breadcrumb size='big'>
                    <Link to={"/Users"}>
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
                <GridColumn width={8} >
                  <Link to={"/Users/Create"}>
                    <Button color='blue' floated='right' className='list-right-green-button'>
                      {Literals.Page.Pagecreateheader[Profile.Language]}
                    </Button>
                  </Link>
                  <ColumnChooser meta={Profile.tablemeta} columns={Columns} metaKey={metaKey} />
                </GridColumn>
              </Grid>
            </Headerwrapper>
            <Pagedivider />
            {list.length > 0 ?
              <div className='w-full mx-auto '>
                <DataTable Columns={Columns} Data={list} Config={initialConfig} />
              </div> : <NoDataScreen message={Literals.Messages.Nodatafind[Profile.Language]} />
            }
          </Pagewrapper>
          <UsersDelete />
        </React.Fragment>
    )
  }

  
  expandRoles = (rowid) => {
    const prevData = this.state.rolesStatus
    prevData.push(rowid)
    this.setState({ rolesStatus: [...prevData] })
  }

  shrinkRoles = (rowid) => {
    const index = this.state.rolesStatus.indexOf(rowid)
    const prevData = this.state.rolesStatus
    if (index > -1) {
      prevData.splice(index, 1)
      this.setState({ rolesStatus: [...prevData] })
    }
  }
  

  rolesCellhandler = (col) => {
    if (col.value) {
      if (!col.cell.isGrouped) {
        const itemId = col.row.original.Id
        const itemRoles = col.row.original.Roles
        return col.value.length - 35 > 20 ?
          (
            !this.state.rolesStatus.includes(itemId) ?
              [col.value.slice(0, 35) + ' ...(' + itemRoles.length + ')', <Link to='#' className='showMoreOrLess' onClick={() => this.expandRoles(itemId)}> ...Daha Fazla Göster</Link>] :
              [col.value, <Link to='#' className='showMoreOrLess' onClick={() => this.shrinkRoles(itemId)}> ...Daha Az Göster</Link>]
          ) : col.value
      }
      return col.value
    }
    return null
  }

}
