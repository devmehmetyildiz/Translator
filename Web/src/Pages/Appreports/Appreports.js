import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Divider, GridRow, Icon } from 'semantic-ui-react'
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
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
export default class Appreports extends Component {




    render() {

        const { Profile } = this.props

        const items = [
            {
                header: 'Aktif Kullanıcı Sayısı:2',
            },
            {
                header: 'Tamamlanan Toplam Sipariş Sayısı:2',
            },
            {
                header: 'Tamamlanmayan Sipariş Sayısı:2',
            },
            {
                header: 'Toplam Sipariş Sayısı:2',
            },
            {
                header: 'Bu Ayki Tamamlanan Sipariş Sayısı:2',
            },
        ]

        const options = {
            chart: {
                type: 'pie',
            },
            title: {
                text: 'Örnek Pie Chart',
            },
            series: [
                {
                    name: 'Veri',
                    data: [
                        { name: 'A', y: 30 },
                        { name: 'B', y: 25 },
                        { name: 'C', y: 45 },
                    ],
                },
            ],
        };

        const lineoptions = {
            chart: {
              type: 'line',
            },
            title: {
              text: 'Example Line Chart',
            },
            xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yAxis: {
              title: {
                text: 'Values',
              },
            },
            series: [
              {
                name: 'Series 1',
                data: [10, 25, 18, 30, 15, 20, 35, 40, 28, 22, 17, 12],
              },
              {
                name: 'Series 2',
                data: [5, 12, 8, 18, 10, 15, 25, 30, 20, 16, 10, 8],
              },
            ],
          };


        return (
            false ? <LoadingPage /> :
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
                            </Grid>
                        </Headerwrapper>
                        <Pagedivider />
                        <div className='w-full flex flex-row justify-center items-center p-'>
                            <Card.Group items={items} centered />
                        </div>
                        <Pagedivider />
                        <div className='w-full mt-8'>
                            <Grid columns='2' divided stackable>
                                <GridColumn width={8}>
                                    <Grid>
                                        <GridRow>
                                            <HighchartsReact highcharts={Highcharts} options={options} />
                                        </GridRow>
                                        <GridRow>
                                            <HighchartsReact highcharts={Highcharts} options={options} />
                                        </GridRow>
                                    </Grid>
                                </GridColumn>
                                <GridColumn width={8}>
                                    <HighchartsReact highcharts={Highcharts} options={lineoptions} />
                                </GridColumn>
                            </Grid>
                        </div>
                    </Pagewrapper>
                </React.Fragment >
        )
    }

}
Appreports.contextType = FormContext