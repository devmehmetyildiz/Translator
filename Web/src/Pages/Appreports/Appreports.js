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

    componentDidMount() {
        const { GetCasescount, GetCompanycount, GetCostumercount, GetCourtcount,
            GetCourthausecount, GetDocumentcount, GetGoalcount, GetJobcount, GetKdvcount,
            GetLanguagecount, GetOrdercount, GetPaymentcount, GetRecordtypecount, GetRolescount,
            GetTranslatorcount, GetUserscount } = this.props
        GetCasescount()
        GetCompanycount()
        GetCostumercount()
        GetCourtcount()
        GetCourthausecount()
        GetDocumentcount()
        GetGoalcount()
        GetJobcount()
        GetKdvcount()
        GetLanguagecount()
        GetOrdercount()
        GetPaymentcount()
        GetRecordtypecount()
        GetRolescount()
        GetTranslatorcount()
        GetUserscount()
    }

    componentDidUpdate() {
        const { Reports, removeReportnotification } = this.props
        Notification(Reports.notification, removeReportnotification)
    }

    render() {

        const { Profile, Reports } = this.props

        const {
            usercount, casecount, recordtypecount, languagecount, documentcount, goalcount, courtcount,
            courthausecount, companycount, costumercount, filecount, jobcount, kdvcount, mailsettingcount, ordercount,
            paymentcount, printtemplatecount, rolecount, rulecount, translatorcount
        } = Reports

        const items = [
            {
                header: `${Literals.Columns.Usercount[Profile.Language]} : ${usercount}`,
            },
            {
                header: `${Literals.Columns.Casecount[Profile.Language]} : ${casecount}`,
            },
            {
                header: `${Literals.Columns.Recordtypecount[Profile.Language]} : ${recordtypecount}`,
            },
            {
                header: `${Literals.Columns.Languagecount[Profile.Language]} : ${languagecount}`,
            },
            {
                header: `${Literals.Columns.Documentcount[Profile.Language]} : ${documentcount}`,
            },
            {
                header: `${Literals.Columns.Goalcount[Profile.Language]} : ${goalcount}`,
            },
            {
                header: `${Literals.Columns.Courtcount[Profile.Language]} : ${courtcount}`,
            },
            {
                header: `${Literals.Columns.Courthausecount[Profile.Language]} : ${courthausecount}`,
            },
            {
                header: `${Literals.Columns.Costumercount[Profile.Language]} : ${costumercount}`,
            },
            {
                header: `${Literals.Columns.Companycount[Profile.Language]} : ${companycount}`,
            },
            {
                header: `${Literals.Columns.Filecount[Profile.Language]} : ${filecount}`,
            },
            {
                header: `${Literals.Columns.Jobcount[Profile.Language]} : ${jobcount}`,
            },
            {
                header: `${Literals.Columns.Kdvcount[Profile.Language]} : ${kdvcount}`,
            },
            {
                header: `${Literals.Columns.Mailsettingcount[Profile.Language]} : ${mailsettingcount}`,
            },
            {
                header: `${Literals.Columns.Ordercount[Profile.Language]} : ${ordercount}`,
            },
            {
                header: `${Literals.Columns.Paymentcount[Profile.Language]} : ${paymentcount}`,
            },
            {
                header: `${Literals.Columns.Printtemplatecount[Profile.Language]} : ${printtemplatecount}`,
            },
            {
                header: `${Literals.Columns.Rolecount[Profile.Language]} : ${rolecount}`,
            },
            {
                header: `${Literals.Columns.Rulecount[Profile.Language]} : ${rulecount}`,
            },
            {
                header: `${Literals.Columns.Translatorcount[Profile.Language]} : ${translatorcount}`,
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
                        { name: 'D', y: 20 },
                        { name: 'E', y: 20 },
                        { name: 'F', y: 20 },
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
                                    <Grid columns={'2'} divided stackable>
                                        <GridColumn width={8}>
                                            <HighchartsReact highcharts={Highcharts} options={options} />
                                        </GridColumn>
                                        <GridColumn width={8}>
                                            <HighchartsReact highcharts={Highcharts} options={options} />
                                        </GridColumn>
                                    </Grid>
                                </GridColumn>
                                <GridColumn width={8}>
                                    <HighchartsReact highcharts={Highcharts} options={lineoptions} />
                                </GridColumn>
                            </Grid>
                        </div>
                    </Pagewrapper >
                </React.Fragment >
        )
    }

}
Appreports.contextType = FormContext