import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import { Breadcrumb, Grid, GridColumn } from 'semantic-ui-react'
import LoadingPage from '../../Utils/LoadingPage'
import Notification from '../../Utils/Notification'
import Literals from './Literals'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Pagedivider from '../../Common/Styled/Pagedivider'
import { FormContext } from '../../Provider/FormProvider'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import config from '../../Config'
export default class Appreports extends Component {

    componentDidMount() {
        const { GetCasescount, GetCompanycount, GetCostumercount, GetCourtcount, GetLogs,
            GetCourthausecount, GetDocumentcount, GetGoalcount, GetJobcount, GetKdvcount,
            GetLanguagecount, GetOrdercount, GetPaymentcount, GetRecordtypecount, GetRolescount, GetUsers,
            GetTranslatorcount, GetUserscount, GetMailsettingcount, GetPrinttemplatecount, GetRulecount } = this.props
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
        GetMailsettingcount()
        GetPrinttemplatecount()
        GetRulecount()
        GetLogs()
        GetUsers()
    }

    componentDidUpdate() {
        const { Reports, removeReportnotification, Users, removeUsernotification } = this.props
        Notification(Reports.notification, removeReportnotification)
        Notification(Users.notification, removeUsernotification)
    }

    render() {

        const { Profile, Reports, Users } = this.props

        const {
            usercount, casecount, recordtypecount, languagecount, documentcount, goalcount, courtcount,
            courthausecount, companycount, costumercount, filecount, jobcount, kdvcount, mailsettingcount, ordercount,
            paymentcount, printtemplatecount, rolecount, rulecount, translatorcount, logs
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

        const services = Object.keys(config.services)
        const servicesUsage = (services.map(service => {
            const usage = (logs.filter(u => new Date(u.Createtime).getMonth() === new Date().getMonth() &&
                new Date(u.Createtime).getFullYear() === new Date().getFullYear() && u.Servername === service) || []).length
            if (usage > 0)
                return {
                    name: service,
                    y: usage
                }
            else {
                return null
            }
        })).filter(u => u !== null)

        const pieoptions = {
            chart: {
                type: 'pie',
            },
            title: {
                text: 'Aylık Servis Kullanımı',
            },
            series: {
                name: 'Servisler',
                data: servicesUsage
            }
        };

        const userLog = [...new Set(logs.map(u => { return u.RequestuserID }) || [])]
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const lineoptions = {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Uygulama Girişleri',
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yAxis: {
                title: {
                    text: 'Giriş Sayısı',
                },
            },
            series: (userLog || []).map(user => {
                return {
                    name: Users.list.find(u => u.Uuid === user)?.Username,
                    data: months.map(month => {
                        return ((logs.filter(u => u.RequestuserID === user &&
                            new Date(u.Createtime).getMonth() === month &&
                            new Date(u.Createtime).getFullYear() === new Date().getFullYear() &&
                            u.Targeturl === "/Oauth/Login")) || []).length
                    })
                }
            })
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
                                    <HighchartsReact highcharts={Highcharts} options={pieoptions} />
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