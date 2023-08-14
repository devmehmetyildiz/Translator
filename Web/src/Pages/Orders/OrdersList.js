import React from 'react'
import { Label, Loader } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import Literals from './Literals'
export default function OrdersList({ Data, Columns, initialConfig, Profile, Jobs, Files, Cases, Languages, Documents }) {

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
                let jobs = (Jobs.list || []).filter(u => u.OrderID === Data.find(u => u.Id === row.original.Id)?.Uuid)
                let files = (Files.list || []).filter(u => u.ParentID === Data.find(u => u.Id === row.original.Id)?.Fileuuid)
                const jobcolumns = [
                    { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
                    { Header: Literals.Columns.Jobno[Profile.Language], accessor: 'Jobno', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Sourcelanguage[Profile.Language], accessor: 'SourcelanguageID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => languageCellhandler(col) },
                    { Header: Literals.Columns.Targetlanguage[Profile.Language], accessor: 'TargetlanguageID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => languageCellhandler(col) },
                    { Header: Literals.Columns.Document[Profile.Language], accessor: 'DocumentID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => documentCellhandler(col) },
                    { Header: Literals.Columns.Amount[Profile.Language], accessor: 'Amount', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Price[Profile.Language], accessor: 'Price', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Case[Profile.Language], accessor: 'CaseID', sortable: true, canGroupBy: true, canFilter: true, Cell: col => caseCellhandler(col) },
                    { Header: Literals.Columns.Info[Profile.Language], accessor: 'Info', sortable: true, canGroupBy: true, canFilter: true },
                ]

                const filecolumns = [
                    { Header: Literals.Columns.Id[Profile.Language], accessor: 'Id', sortable: true, canGroupBy: true, canFilter: true, },
                    { Header: Literals.Columns.File_Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Filename[Profile.Language], accessor: 'Filename', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Filefolder[Profile.Language], accessor: 'Filefolder', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Filepath[Profile.Language], accessor: 'Filepath', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Filetype[Profile.Language], accessor: 'Filetype', sortable: true, canGroupBy: true, canFilter: true },
                    { Header: Literals.Columns.Usagetype[Profile.Language], accessor: 'Usagetype', sortable: true, canGroupBy: true, canFilter: true },
                ]

                return <div className='w-full p-4'>
                    <div className='p-2'>
                        <Label as='a' color='grey' ribbon>
                            {Literals.Columns.jobs[Profile.Language]}
                        </Label>
                        <DataTable
                            Columns={jobcolumns}
                            Data={jobs.sort((a, b) => a.Order - b.Order)}
                            thColor={'#f0f4f5'}
                            Cases={Cases}
                        />
                    </div>
                    <div className='p-2'>
                        <Label as='a' color='grey' ribbon>
                            {Literals.Columns.files[Profile.Language]}
                        </Label>
                        <DataTable
                            Columns={filecolumns}
                            Data={files.sort((a, b) => a.Order - b.Order)}
                            thColor={'#f0f4f5'}
                            Cases={Cases}
                        />
                    </div>
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
            Cases={Cases}
        />
    )
}
