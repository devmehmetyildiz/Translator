import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Loader } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import JobsDelete from '../../Containers/Jobs/JobsDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'

export default class Jobs extends Component {

  componentDidMount() {
    const { GetJobs, GetDocuments, GetLanguages, GetCases } = this.props
    GetJobs()
    GetDocuments()
    GetLanguages()
    GetCases()
  }

  componentDidUpdate() {
    const { Jobs, Cases, Languages, Documents, removeCasenotification,
      removeLanguagenotification, removeDocumentnotification, removeJobnotification } = this.props
    Notification(Jobs.notifications, removeJobnotification)
    Notification(Cases.notifications, removeCasenotification)
    Notification(Documents.notifications, removeDocumentnotification)
    Notification(Languages.notifications, removeLanguagenotification)
  }

  render() {

    const { Jobs, Profile, handleSelectedJob, handleDeletemodal } = this.props
    const { isLoading, isDispatching } = Jobs

    const Columns = [
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Order[Profile.Language], accessor: 'Order.Orderno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Jobno[Profile.Language], accessor: 'Jobno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Sourcelanguage[Profile.Language], accessor: 'SourcelanguageID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.languageCellhandler(col) },
      { Header: Literals.Columns.Targetlanguage[Profile.Language], accessor: 'TargetlanguageID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.languageCellhandler(col) },
      { Header: Literals.Columns.Document[Profile.Language], accessor: 'DocumentID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.documentCellhandler(col) },
      { Header: Literals.Columns.Amount[Profile.Language], accessor: 'Amount', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Price[Profile.Language], accessor: 'Price', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Case[Profile.Language], accessor: 'CaseID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.caseCellhandler(col) },
      { Header: Literals.Columns.Info[Profile.Language], accessor: 'Info', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const metaKey = "Jobs"
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

    const list = (Jobs.list || []).filter(u=>u.Isactive).map(item => {

      return {
        ...item,
        edit: <Link to={`/Jobs/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
        delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
          handleSelectedJob(item)
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
                    <Link to={"/Jobs"}>
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
                <GridColumn width={8} >
                  <Link to={"/Jobs/Create"}>
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
          <JobsDelete />
        </React.Fragment >
    )
  }

  caseCellhandler = (col) => {
    const { Cases } = this.props
    if (Cases.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Cases.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  languageCellhandler = (col) => {
    const { Languages } = this.props
    if (Languages.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Languages.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  documentCellhandler = (col) => {
    const { Documents } = this.props
    if (Documents.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Documents.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
}