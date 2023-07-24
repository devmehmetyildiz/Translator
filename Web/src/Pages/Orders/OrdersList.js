import React, { useEffect, useState } from 'react'
import { Header, Loader } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import Literals from './Literals'
export default function OrdersList({ Data, Columns, subColumns, initialConfig, Profile, Jobs, setselectedRow, Cases, Languages, Documents }) {


    const renderRowSubComponent = React.useCallback(
        ({ row }) => {
            if (row && row.original && row.original.Id) {
                let jobs = (Jobs.list || []).filter(u => u.OrderID === Data.find(u => u.Id === row.original.Id).Uuid)
                return <div className='w-full p-4'>
                    <Header as='h5' attached='top' floated='left' className='w-full'>{Literals.Columns.jobs[Profile.Language]}</Header>
                    <DataTable
                        Columns={subColumns}
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
