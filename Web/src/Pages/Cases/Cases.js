import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import CasesDelete from '../../Containers/Cases/CasesDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'
import { FormContext } from '../../Provider/FormProvider'
import ExcelImport from '../../Containers/Utils/ExcelImport'
import ExcelExport from '../../Containers/Utils/ExcelExport'

export default class Cases extends Component {


  componentDidMount() {
    const { GetCases } = this.props
    GetCases()
  }

  componentDidUpdate() {
    const { Cases, removeCasenotification } = this.props
    Notification(Cases.notifications, removeCasenotification)
  }

  render() {


    const { Cases, Profile, handleSelectedCase, handleDeletemodal, AddRecordCases } = this.props
    const { isLoading, isDispatching } = Cases
    const casestatusOption = [
      {
        key: '-1',
        text: Literals.Options.caseStatusoption.value0[Profile.Language],
        value: -1,
      },
      {
        key: '0',
        text: Literals.Options.caseStatusoption.value1[Profile.Language],
        value: 0,
      },
      {
        key: '1',
        text: Literals.Options.caseStatusoption.value2[Profile.Language],
        value: 1,
      }
    ]

    const Columns = [
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Shortname[Profile.Language], accessor: 'Shortname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.CaseStatus[Profile.Language], accessor: 'CaseStatus', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.casesstatusCellhandler(col, casestatusOption) },
      { Header: Literals.Columns.Casecolor[Profile.Language], accessor: 'Casecolor', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.casecolorCellhandler(col) },
      { Header: Literals.Columns.Isdefaultcancelcase[Profile.Language], accessor: 'Isdefaultcancelcase', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.boolCellhandler(col) },
      { Header: Literals.Columns.Isdefaultendcase[Profile.Language], accessor: 'Isdefaultendcase', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.boolCellhandler(col) },
      { Header: Literals.Columns.Isdefaultpassivecase[Profile.Language], accessor: 'Isdefaultpassivecase', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.boolCellhandler(col) },
      { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const metaKey = "Cases"
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

    const list = (Cases.list || []).map(item => {

      return {
        ...item,
        edit: <Link to={`/Cases/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
        delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
          handleSelectedCase(item)
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
                    <Link to={"/Cases"} >
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
                <GridColumn width={8} >
                  <Link to={"/Cases/Create"}>
                    <Button color='blue' floated='right' className='list-right-green-button'>
                      {Literals.Page.Pagecreateheader[Profile.Language]}
                    </Button>
                  </Link>
                  <ColumnChooser meta={Profile.tablemeta} columns={Columns} metaKey={metaKey} />
                  <ExcelImport columns={Columns} addData={AddRecordCases} />
                  <ExcelExport data={list} name={metaKey} Config={initialConfig} />
                </GridColumn>
              </Grid>
            </Headerwrapper>
            <Pagedivider />
            {list.length > 0 ?
              <div className='w-full mx-auto '>
                <DataTable Columns={Columns} Data={list} Config={initialConfig} />
              </div> : <NoDataScreen message={Literals.Messages.Nocasefind[Profile.Language]} />
            }
          </Pagewrapper>
          <CasesDelete />
        </React.Fragment >
    )
  }


  casesstatusCellhandler = (col, casestatusOption) => {
    return casestatusOption.find(u => u.value === col.value) ? casestatusOption.find(u => u.value === col.value).text : ''
  }

  casecolorCellhandler = (col) => {
    if (col.value) {
      return <div className='flex flex-row justify-center items-center text-center'><p className='m-0 p-0'>{col.value}</p><Icon style={{ color: col.value }} className="ml-2" name='circle' /></div>
    }
    return null
  }

  boolCellhandler = (col) => {
    const { Profile } = this.props
    return col.value !== null && (col.value ? Literals.Messages.Yes[Profile.Language] : Literals.Messages.No[Profile.Language])
  }
}
Cases.contextType = FormContext