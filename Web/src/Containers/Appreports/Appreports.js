import { connect } from 'react-redux'
import Appreports from "../../Pages/Appreports/Appreports"
import {
    GetCasescount, GetCompanycount, GetCostumercount, GetCourtcount,
    GetCourthausecount, GetDocumentcount, GetGoalcount, GetJobcount, GetKdvcount,
    GetLanguagecount, GetOrdercount, GetPaymentcount, GetRecordtypecount, GetRolescount,
    GetTranslatorcount, GetUserscount, removeReportnotification
} from "../../Redux/ReportSlice"

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Reports: state.Reports
})

const mapDispatchToProps = {
    GetCasescount, GetCompanycount, GetCostumercount, GetCourtcount,
    GetCourthausecount, GetDocumentcount, GetGoalcount, GetJobcount, GetKdvcount,
    GetLanguagecount, GetOrdercount, GetPaymentcount, GetRecordtypecount, GetRolescount,
    GetTranslatorcount, GetUserscount, removeReportnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Appreports)