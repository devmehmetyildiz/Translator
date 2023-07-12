import React, { useEffect, useState } from 'react'
import { Header, Loader } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import Literals from './Literals'
export default function OrdersList({ Data, Columns, initialConfig, Profile, Jobs, setselectedRow, Cases, Languages, Documents }) {


    const caseCellhandler = (col) => {
        if (Cases.isLoading) {
            return <Loader size='small' active inline='centered' ></Loader>
        } else {
            return (Cases.list || []).find(u => u.Uuid === col.value)?.Name
        }
    }
    const languageCellhandler = (col) => {
        if (Languages.isLoading) {
            return <Loader size='small' active inline='centered' ></Loader>
        } else {
            return (Languages.list || []).find(u => u.Uuid === col.value)?.Name
        }
    }
    const documentCellhandler = (col) => {
        if (Documents.isLoading) {
            return <Loader size='small' active inline='centered' ></Loader>
        } else {
            return (Documents.list || []).find(u => u.Uuid === col.value)?.Name
        }
    }

    const renderRowSubComponent = React.useCallback(
        ({ row }) => {
            if (row && row.original && row.original.Id) {
                let jobs = (Jobs.list || []).filter(u => u.OrderID === Data.find(u => u.Id === row.original.Id).Uuid)
                const jobcolumns = [
                    { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
                    { Header: Literals.Columns.Jobno[Profile.Language], accessor: 'Jobno', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Sourcelanguage[Profile.Language], accessor: 'SourcelanguageID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => languageCellhandler(col) },
                    { Header: Literals.Columns.Targetlanguage[Profile.Language], accessor: 'TargetlanguageID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => languageCellhandler(col) },
                    { Header: Literals.Columns.Document[Profile.Language], accessor: 'Document.Name', sortable: true, canGroupBy: true, canFilter: true, Cell: col => documentCellhandler(col) },
                    { Header: Literals.Columns.Amount[Profile.Language], accessor: 'Amount', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Price[Profile.Language], accessor: 'Price', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Case[Profile.Language], accessor: 'CaseID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => caseCellhandler(col) },
                    { Header: Literals.Columns.Info[Profile.Language], accessor: 'Info', sortable: true, canGroupBy: true, canFilter: true },
                ]
                return <div className='w-full p-4'>
                    <Header as='h5' attached='top' floated='left' className='w-full'>{Literals.Columns.jobs[Profile.Language]}</Header>
                    <DataTable
                        Columns={jobcolumns}
                        Data={jobs.sort((a, b) => a.Order - b.Order)}
                    />
                </div>
            } else {
                return null
            }
        }
        , [Cases, Languages, Documents])


    return (
        <DataTable
            Columns={Columns}
            Data={Data}
            Config={initialConfig}
            renderRowSubComponent={renderRowSubComponent}
        />
    )
}
