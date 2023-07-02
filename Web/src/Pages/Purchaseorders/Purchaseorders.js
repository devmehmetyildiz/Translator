import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn } from 'semantic-ui-react'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import PurchaseordersList from './PurchaseordersList'
import Notification from '../../Utils/Notification'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Pagedivider from '../../Common/Styled/Pagedivider'
import PurchaseordersDelete from '../../Containers/Purchaseorders/PurchaseordersDelete'
import PurchaseordersComplete from '../../Containers/Purchaseorders/PurcaseordersComplete'

export default class Purchaseorders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expandedRow: []
    }
  }

  componentDidMount() {
    const { GetPurchaseorders, GetPurchaseorderstocks } = this.props
    GetPurchaseorders()
    GetPurchaseorderstocks()
  }

  componentDidUpdate() {
    const { Purchaseorders, removePurchaseordernotification, Purchaseorderstocks,
      removePurchaseorderstocknotification } = this.props
    Notification(Purchaseorders.notifications, removePurchaseordernotification)
    Notification(Purchaseorderstocks.notifications, removePurchaseorderstocknotification)
  }

  render() {


    const { Purchaseorders, Profile, handleCompletemodal, handleDeletemodal, handleSelectedPurchaseorder } = this.props
    const { isLoading, isDispatching } = Purchaseorders

    const Columns = [
      {
        Header: () => null,
        id: 'expander', accessor: 'expander', sortable: false, canGroupBy: false, canFilter: false, filterDisable: true,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <Icon name='triangle down' /> : <Icon name='triangle right' />}
          </span>
        ),

      },
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Company[Profile.Language], accessor: 'Company', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Purchasenumber[Profile.Language], accessor: 'Purchasenumber', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Personelname[Profile.Language], accessor: 'Personelname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Companypersonelname[Profile.Language], accessor: 'Companypersonelname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Username[Profile.Language], accessor: 'Username', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Purchasedate[Profile.Language], accessor: 'Purchasedate', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.CaseName[Profile.Language], accessor: 'Case.Name', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.complete[Profile.Language], accessor: 'complete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const metaKey = "Purchaseorders"
    let tableMeta = (Profile.tablemeta || []).find(u => u.Meta === metaKey)
    const initialConfig = {
      hiddenColumns: tableMeta ? JSON.parse(tableMeta.Config).filter(u => u.isVisible === false).map(item => {
        return item.key
      }) : ["Uuid", "Createduser", "Updateduser", "Createtime", "Updatetime"],
      columnOrder: tableMeta ? JSON.parse(tableMeta.Config).sort((a, b) => a.order - b.order).map(item => {
        return item.key
      }) : []
    };

    const list = (Purchaseorders.list || []).map(item => {
      return {
        ...item,
        complete: <Icon link size='large' color='red' name='check square' onClick={() => {
          handleSelectedPurchaseorder(item)
          handleCompletemodal(true)
        }} />,
        edit: <Link to={`/Purchaseorders/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
        delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
          handleSelectedPurchaseorder(item)
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
                <GridColumn width={8}>
                  <Breadcrumb size='big'>
                    <Link to={"/Purchaseorders"}>
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
                <GridColumn width={8} >
                  <Link to={"/Purchaseorders/Create"}>
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
                <PurchaseordersList
                  Data={list}
                  Columns={Columns}
                  initialConfig={initialConfig}
                  Profile={Profile}
                />
              </div> : <NoDataScreen message={Literals.Messages.Nodatafind[Profile.Language]} />
            }
          </Pagewrapper>
          <PurchaseordersDelete />
          <PurchaseordersComplete />
        </React.Fragment >
    )
  }

  handleChangeModal = (value) => {
    this.setState({ modal: value })
  }

  handleRowExpender = (newvalue) => {
    this.setState({ expandedRow: newvalue })
  }

}