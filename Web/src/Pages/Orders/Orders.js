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
import OrdersDelete from '../../Containers/Orders/OrdersDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'

export default class Orders extends Component {

  componentDidMount() {
    const { GetOrders } = this.props
    GetOrders()
  }

  componentDidUpdate() {
    const { Orders, removeOrdernotification } = this.props
    Notification(Orders.notifications, removeOrdernotification)
  }

  render() {

    const { Orders, Profile, handleSelectedOrder, handleDeletemodal } = this.props
    const { isLoading, isDispatching } = Orders

    const Columns = [
      { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: Literals.Columns.Orderno[Profile.Language], accessor: 'Orderno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Recordtype[Profile.Language], accessor: 'Recordtype.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Princiblecourthause[Profile.Language], accessor: 'Princiblecourthause.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Princiblecourt[Profile.Language], accessor: 'Princiblecourt.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Princibleno[Profile.Language], accessor: 'Princibleno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Desicionno[Profile.Language], accessor: 'Desicionno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Directivecourthause[Profile.Language], accessor: 'Directivecourthause.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Directivecourt[Profile.Language], accessor: 'Directivecourt.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Directiveno[Profile.Language], accessor: 'Directiveno', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Directiveinfo[Profile.Language], accessor: 'Directiveinfo', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Costumer[Profile.Language], accessor: 'Costumer.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Company[Profile.Language], accessor: 'Company.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Registerdate[Profile.Language], accessor: 'Registerdate', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Deliverydate[Profile.Language], accessor: 'Deliverydate', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Translator[Profile.Language], accessor: 'Translator.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Prepayment[Profile.Language], accessor: 'Prepayment.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Notaryexpense[Profile.Language], accessor: 'Notaryexpense', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Netprice[Profile.Language], accessor: 'Netprice', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Calculatedprice[Profile.Language], accessor: 'Calculatedprice', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Kdv[Profile.Language], accessor: 'Kdv.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Payment[Profile.Language], accessor: 'Payment.Name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: Literals.Columns.Case[Profile.Language], accessor: 'Case.Name', sortable: true, canGroupBy: true, canFilter: true },
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
      isLoading || isDispatching ? <LoadingPage /> :
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
                <DataTable Columns={Columns} Data={list} Config={initialConfig} />
              </div> : <NoDataScreen message={Literals.Messages.Nodatafind[Profile.Language]} />
            }
          </Pagewrapper>
          <OrdersDelete />
        </React.Fragment >
    )
  }
}