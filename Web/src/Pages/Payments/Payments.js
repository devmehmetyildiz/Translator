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
import PaymentsDelete from '../../Containers/Payments/PaymentsDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'

export default class Payments extends Component {

    componentDidMount() {
        const { GetPayments } = this.props
        GetPayments()
    }

    componentDidUpdate() {
        const { Payments, removePaymentnotification } = this.props
        Notification(Payments.notifications, removePaymentnotification)
    }

    render() {

        const { Payments, Profile, handleSelectedPayment, handleDeletemodal } = this.props
        const { isLoading, isDispatching } = Payments

        const Columns = [
            { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: true, canFilter: true },
            { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
            { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

        const metaKey = "Payments"
        let tableMeta = (Profile.tablemeta || []).find(u => u.Meta === metaKey)
        const initialConfig = {
            hiddenColumns: tableMeta ? JSON.parse(tableMeta.Config).filter(u => u.isVisible === false).map(item => {
                return item.key
            }) : ["Uuid", "Createduser", "Updateduser", "Createtime", "Updatetime"],
            columnOrder: tableMeta ? JSON.parse(tableMeta.Config).sort((a, b) => a.order - b.order).map(item => {
                return item.key
            }) : []
        };

        const list = (Payments.list || []).map(item => {

            return {
                ...item,
                edit: <Link to={`/Payments/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
                delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
                    handleSelectedPayment(item)
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
                                        <Link to={"/Payments"}>
                                            <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                                        </Link>
                                    </Breadcrumb>
                                </GridColumn>
                                <GridColumn width={8} >
                                    <Link to={"/Payments/Create"}>
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
                    <PaymentsDelete />
                </React.Fragment >
        )
    }
}