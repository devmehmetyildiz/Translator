import { connect } from 'react-redux'
import Appreports from "../../Pages/Appreports/Appreports"
import {
    GetCasescount, GetCompanycount, GetCostumercount, GetCourtcount,
    GetCourthausecount, GetDocumentcount, GetGoalcount, GetJobcount, GetKdvcount,
    GetLanguagecount, GetOrdercount, GetPaymentcount, GetRecordtypecount, GetRolescount, GetLogs,
    GetTranslatorcount, GetUserscount, removeReportnotification, GetMailsettingcount, GetPrinttemplatecount, GetRulecount
} from "../../Redux/ReportSlice"
import { GetUsers, removeUsernotification } from "../../Redux/UserSlice"

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Reports: state.Reports,
    Users: state.Users
})

const mapDispatchToProps = {
    GetCasescount, GetCompanycount, GetCostumercount, GetCourtcount, GetUsers, removeUsernotification,
    GetCourthausecount, GetDocumentcount, GetGoalcount, GetJobcount, GetKdvcount,
    GetLanguagecount, GetOrdercount, GetPaymentcount, GetRecordtypecount, GetRolescount, GetLogs,
    GetTranslatorcount, GetUserscount, removeReportnotification, GetMailsettingcount, GetPrinttemplatecount, GetRulecount
}

export default connect(mapStateToProps, mapDispatchToProps)(Appreports)