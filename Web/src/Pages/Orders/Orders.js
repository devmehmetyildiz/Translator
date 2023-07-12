import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Loader } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import OrdersDelete from '../../Containers/Orders/OrdersDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'
import OrdersList from './OrdersList'

export default class Orders extends Component {

  componentDidMount() {
    const { GetOrders, GetJobs, GetDefinedcompanies,
      GetCourthauses, GetCourts, GetDefinedcostumers,
      GetPayments, GetKdvs, GetTranslators, GetCases, GetRecordtypes, GetLanguages, GetDocuments } = this.props
    GetOrders()
    GetJobs()
    GetCourthauses()
    GetCourts()
    GetDefinedcompanies()
    GetDefinedcostumers()
    GetPayments()
    GetKdvs()
    GetTranslators()
    GetCases()
    GetRecordtypes()
    GetLanguages()
    GetDocuments()
  }

  componentDidUpdate() {
    const { removeOrdernotification, removeDefinedcompanynotification,
      removeJobnotification, removeCourthausenotification, removeCourtnotification, removeDefinedcostumernotification,
      removePaymentnotification, removeKdvnotification, removeTranslatornotification, Orders, Jobs, Documents, removeDocumentNotification, Languages, removeLanguagenotification
      , Courthauses, Courts, Definedcompanies, Definedcostumers, Kdvs, Translators, Payments, Cases, removeCasenotification, Recordtypes, removeRecordtypenotification
    } = this.props
    Notification(Orders.notifications, removeOrdernotification)
    Notification(Jobs.notifications, removeJobnotification)
    Notification(Definedcompanies.notifications, removeDefinedcompanynotification)
    Notification(Courthauses.notifications, removeCourthausenotification)
    Notification(Definedcostumers.notifications, removeDefinedcostumernotification)
    Notification(Payments.notifications, removePaymentnotification)
    Notification(Courts.notifications, removeCourtnotification)
    Notification(Translators.notifications, removeTranslatornotification)
    Notification(Kdvs.notifications, removeKdvnotification)
    Notification(Cases.notifications, removeCasenotification)
    Notification(Recordtypes.notifications, removeRecordtypenotification)
    Notification(Documents.notifications, removeDocumentNotification)
    Notification(Languages.notifications, removeLanguagenotification)
  }

  render() {

    const { Orders, Profile, handleSelectedOrder, handleDeletemodal, Jobs, Documents, Languages, Cases } = this.props
    const { isLoading, isDispatching } = Orders

    const Columns = [
      {
        Header: () => null,
        id: 'expander', accessor: 'expander', sortable: false, canGroupBy: false, canFilter: false, filterDisable: true, newWidht: '10px',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()} >
            {row.isExpanded ? <Icon name='triangle down' /> : <Icon name='triangle right' />}
          </span>
        ),
      },
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Orderno[Profile.Language], accessor: 'Orderno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Recordtype[Profile.Language], accessor: 'RecordtypeID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.recordtypeCellhandler(col) },
      { Header: Literals.Columns.Princiblecourthause[Profile.Language], accessor: 'PrinciblecourthauseID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.courthauseCellhandler(col) },
      { Header: Literals.Columns.Princiblecourt[Profile.Language], accessor: 'PrinciblecourtID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.courtCellhandler(col) },
      { Header: Literals.Columns.Princibleno[Profile.Language], accessor: 'Princibleno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Desicionno[Profile.Language], accessor: 'Desicionno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Directivecourthause[Profile.Language], accessor: 'DirectivecourthauseID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.courthauseCellhandler(col) },
      { Header: Literals.Columns.Directivecourt[Profile.Language], accessor: 'DirectivecourtID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.courtCellhandler(col) },
      { Header: Literals.Columns.Directiveno[Profile.Language], accessor: 'Directiveno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Directiveinfo[Profile.Language], accessor: 'Directiveinfo', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Costumer[Profile.Language], accessor: 'CostumerID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.costumerCellhandler(col) },
      { Header: Literals.Columns.Company[Profile.Language], accessor: 'CompanyID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.companyCellhandler(col) },
      { Header: Literals.Columns.Registerdate[Profile.Language], accessor: 'Registerdate', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Deliverydate[Profile.Language], accessor: 'Deliverydate', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Translator[Profile.Language], accessor: 'TranslatorID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.translatorCellhandler(col) },
      { Header: Literals.Columns.Prepayment[Profile.Language], accessor: 'Prepayment', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Notaryexpense[Profile.Language], accessor: 'Notaryexpense', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Netprice[Profile.Language], accessor: 'Netprice', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Calculatedprice[Profile.Language], accessor: 'Calculatedprice', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Kdv[Profile.Language], accessor: 'KdvID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.kdvCellhandler(col) },
      { Header: Literals.Columns.Payment[Profile.Language], accessor: 'PaymentID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.paymentCellhandler(col) },
      { Header: Literals.Columns.Case[Profile.Language], accessor: 'CaseID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.caseCellhandler(col) },
      { Header: Literals.Columns.Info[Profile.Language], accessor: 'Info', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const metaKey = "Orders"
    let tableMeta = (Profile.tablemeta || []).find(u => u.Meta === metaKey)
    const initialConfig = {
      hiddenColumns: tableMeta ? JSON.parse(tableMeta.Config).filter(u => u.isVisible === false).map(item => {
        return item.key
      }) : ["Uuid", "Createduser", "Updateduser", "Createtime", "Updatetime"],
      columnOrder: tableMeta ? JSON.parse(tableMeta.Config).sort((a, b) => a.order - b.order).map(item => {
        return item.key
      }) : []
    };

    const list = (Orders.list || []).map(item => {
      return {
        ...item,
        edit: <Link to={`/Orders/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
        delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
          handleSelectedOrder(item)
          handleDeletemodal(true)
        }} />,
      }
    })

    return (
      isLoading || isDispatching || Jobs.isLoading || Jobs.isDispatching ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
              <Grid columns='2' >
                <GridColumn width={8}>
                  <Breadcrumb size='big'>
                    <Link to={"/Orders"}>
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
                <GridColumn width={8} >
                  <Link to={"/Orders/Create"}>
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
                <OrdersList
                  Data={list}
                  Columns={Columns}
                  initialConfig={initialConfig}
                  Profile={Profile}
                  Jobs={Jobs}
                  setselectedRow={this.setselectedRow}
                  Documents={Documents}
                  Languages={Languages}
                  Cases={Cases}
                />
              </div> : <NoDataScreen message={Literals.Messages.Nodatafind[Profile.Language]} />
            }
          </Pagewrapper>
          <OrdersDelete />
        </React.Fragment >
    )
  }

  courthauseCellhandler = (col) => {
    const { Courthauses } = this.props
    if (Courthauses.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Courthauses.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  courtCellhandler = (col) => {
    const { Courts } = this.props
    if (Courts.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Courts.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  companyCellhandler = (col) => {
    const { Definedcompanies } = this.props
    if (Definedcompanies.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Definedcompanies.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  costumerCellhandler = (col) => {
    const { Definedcostumers } = this.props
    if (Definedcostumers.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Definedcostumers.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  paymentCellhandler = (col) => {
    const { Payments } = this.props
    if (Payments.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Payments.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  translatorCellhandler = (col) => {
    const { Translators } = this.props
    if (Translators.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Translators.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  kdvCellhandler = (col) => {
    const { Kdvs } = this.props
    if (Kdvs.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Kdvs.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  caseCellhandler = (col) => {
    const { Cases } = this.props
    if (Cases.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Cases.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
  recordtypeCellhandler = (col) => {
    const { Recordtypes } = this.props
    if (Recordtypes.isLoading) {
      return <Loader size='small' active inline='centered' ></Loader>
    } else {
      return (Recordtypes.list || []).find(u => u.Uuid === col.value)?.Name
    }
  }
}