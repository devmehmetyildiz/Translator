import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import CourtsDelete from '../../Containers/Courts/CourtsDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'
import ExcelImport from '../../Containers/Utils/ExcelImport'
import ExcelExport from '../../Containers/Utils/ExcelExport'
import Settings from '../../Common/Settings'
import MobileTable from '../../Utils/MobileTable'

export default class Courts extends Component {

  componentDidMount() {
    const { GetCourts } = this.props
    GetCourts()
  }

  componentDidUpdate() {
    const { Courts, removeCourtnotification } = this.props
    Notification(Courts.notifications, removeCourtnotification)
  }

  render() {


    const { Courts, Profile, handleSelectedCourt, handleDeletemodal, AddRecordCourts } = this.props
    const { isLoading, isDispatching } = Courts

    const Columns = [
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: true, canFilter: true, Firstheader: true },
      { Header: Literals.Columns.Isdefaultprincible[Profile.Language], accessor: 'Isdefaultprincible', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.boolCellhandler(col) },
      { Header: Literals.Columns.Isdefaultdirective[Profile.Language], accessor: 'Isdefaultdirective', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.boolCellhandler(col) },
      { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const metaKey = "Courts"
    let tableMeta = (Profile.tablemeta || []).find(u => u.Meta === metaKey)
    const initialConfig = {
      hiddenColumns: tableMeta ? JSON.parse(tableMeta.Config).filter(u => u.isVisible === false).map(item => {
        return item.key
      }) : ["Uuid", "Createduser", "Updateduser", "Createtime", "Updatetime"],
      columnOrder: tableMeta ? JSON.parse(tableMeta.Config).sort((a, b) => a.order - b.order).map(item => {
        return item.key
      }) : [],
      groupBy: tableMeta ? JSON.parse(tableMeta.Config).filter(u => u.isGroup === true).map(item => {
        return item.key
      }) : [],
    };

    const list = (Courts.list || []).filter(u => u.Isactive).map(item => {

      return {
        ...item,
        edit: <Link to={`/Courts/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
        delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
          handleSelectedCourt(item)
          handleDeletemodal(true)
        }} />,
      }
    })

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
              <Grid columns='2' >
                <GridColumn width={8}>
                  <Breadcrumb size='big'>
                    <Link to={"/Courts"}>
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
                <Settings
                  Profile={Profile}
                  Pagecreateheader={Literals.Page.Pagecreateheader[Profile.Language]}
                  Pagecreatelink={"/Courts/Create"}
                  Columns={Columns}
                  list={list}
                  initialConfig={initialConfig}
                  metaKey={metaKey}
                  AddRecord={AddRecordCourts}
                />
              </Grid>
            </Headerwrapper>
            <Pagedivider />
            {
              list.length > 0 ?
                <div className='w-full mx-auto '>
                  {Profile.Ismobile ? <MobileTable Columns={Columns} Data={list} Config={initialConfig} Profile={Profile} /> : <DataTable Columns={Columns} Data={list} Config={initialConfig} />}
                </div> : <NoDataScreen message={Literals.Messages.Nodatafind[Profile.Language]} />
            }
          </Pagewrapper >
          <CourtsDelete />
        </React.Fragment >
    )
  }
  boolCellhandler = (col) => {
    const { Profile } = this.props
    return col.value !== null && (col.value ? Literals.Messages.Yes[Profile.Language] : Literals.Messages.No[Profile.Language])
  }
}