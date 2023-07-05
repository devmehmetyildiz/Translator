import { connect } from 'react-redux'
import JobsEdit from "../../Pages/Jobs/JobsEdit"
import { GetJob, EditJobs, fillJobnotification, removeJobnotification } from "../../Redux/JobSlice"
import { GetLanguages, removeLanguagenotification } from "../../Redux/LanguageSlice"
import { GetDocuments, removeDocumentnotification } from "../../Redux/DocumentSlice"
import { GetCases, removeCasenotification } from "../../Redux/CaseSlice"
import { GetOrders, removeOrdernotification } from "../../Redux/OrderSlice"

const mapStateToProps = (state) => ({
    Jobs: state.Jobs,
    Orders: state.Orders,
    Languages: state.Languages,
    Documents: state.Documents,
    Cases: state.Cases,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditJobs, fillJobnotification, removeJobnotification,
    GetLanguages, removeLanguagenotification, GetDocuments, removeDocumentnotification,
    GetCases, removeCasenotification, GetJob, GetOrders, removeOrdernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsEdit)