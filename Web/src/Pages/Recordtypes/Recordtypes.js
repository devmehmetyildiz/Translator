import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Loader } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import RecordtypesDelete from '../../Containers/Recordtypes/RecordtypesDelete'
import Pagedivider from '../../Common/Styled/Pagedivider'
import ExcelImport from '../../Containers/Utils/ExcelImport'
import ExcelExport from '../../Containers/Utils/ExcelExport'
import validator from '../../Utils/Validator'

export default class Recordtypes extends Component {

    componentDidMount() {
        const { GetRecordtypes, GetGoals } = this.props
        GetRecordtypes()
        GetGoals()
    }

    componentDidUpdate() {
        const { Recordtypes, removeRecordtypenotification, Goals, removeGoalnotification } = this.props
        Notification(Recordtypes.notifications, removeRecordtypenotification)
        Notification(Goals.notifications, removeGoalnotification)
    }

    render() {

        const { Recordtypes, Profile, handleSelectedRecordtype, handleDeletemodal, AddRecordRecordtypes } = this.props
        const { isLoading, isDispatching } = Recordtypes

        const Columns = [
            { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Uuid[Profile.Language], accessor: 'Uuid', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: true, canFilter: true },
            { Header: Literals.Columns.Ishaveprice[Profile.Language], accessor: 'Ishaveprice', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.boolCellhandler(col) },
            { Header: Literals.Columns.Price[Profile.Language], accessor: 'Price', sortable: true, canGroupBy: true, canFilter: true, Cell: col => { return col.value ? col.value + ' ₺' : 0 + ' ₺' } },
            { Header: Literals.Columns.Pricetype[Profile.Language], accessor: 'Pricetype', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.pricetypeCellhandler(col) },
            { Header: Literals.Columns.Goal[Profile.Language], accessor: 'GoalID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.goalCellhandler(col) },
            { Header: Literals.Columns.Createduser[Profile.Language], accessor: 'Createduser', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Updateduser[Profile.Language], accessor: 'Updateduser', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Createtime[Profile.Language], accessor: 'Createtime', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.Updatetime[Profile.Language], accessor: 'Updatetime', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: Literals.Columns.edit[Profile.Language], accessor: 'edit', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
            { Header: Literals.Columns.delete[Profile.Language], accessor: 'delete', canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

        const metaKey = "Recordtypes"
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

        const list = (Recordtypes.list || []).map(item => {

            return {
                ...item,
                edit: <Link to={`/Recordtypes/${item.Uuid}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>,
                delete: <Icon link size='large' color='red' name='alternate trash' onClick={() => {
                    handleSelectedRecordtype(item)
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
                                        <Link to={"/Recordtypes"}>
                                            <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                                        </Link>
                                    </Breadcrumb>
                                </GridColumn>
                                <GridColumn width={8} >
                                    <Link to={"/Recordtypes/Create"}>
                                        <Button color='blue' floated='right' className='list-right-green-button'>
                                            {Literals.Page.Pagecreateheader[Profile.Language]}
                                        </Button>
                                    </Link>
                                    <ColumnChooser meta={Profile.tablemeta} columns={Columns} metaKey={metaKey} />
                                    <ExcelImport columns={Columns} addData={AddRecordRecordtypes} />
                                    <ExcelExport columns={Columns} data={list} name={metaKey} Config={initialConfig} />
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
                    <RecordtypesDelete />
                </React.Fragment >
        )
    }

    boolCellhandler = (col) => {
        const { Profile } = this.props
        return col.value !== null && (col.value ? Literals.Messages.Yes[Profile.Language] : Literals.Messages.No[Profile.Language])
    }

    pricetypeCellhandler = (col) => {
        const Pricetypeoptions = [
            { key: 1, text: 'GELİR', value: 1 },
            { key: 2, text: 'GİDER', value: -1 },
            { key: 3, text: 'PASİF', value: 0 },
        ]
        return col.value !== null && validator.isNumber(col.value) && Pricetypeoptions.find(u => u.value === col.value)?.text
    }

    goalCellhandler = (col) => {
        const { Goals } = this.props
        if (Goals.isLoading) {
            return <Loader size='small' active inline='centered' ></Loader>
        } else {
            return (Goals.list || []).find(u => u.Uuid === col.value)?.Name
        }
    }
}