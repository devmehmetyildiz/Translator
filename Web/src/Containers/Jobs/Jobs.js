import { connect } from 'react-redux'
import Jobs from "../../Pages/Jobs/Jobs"
import { GetJobs, removeJobnotification, handleDeletemodal, handleSelectedJob } from "../../Redux/JobSlice"
import { GetLanguages, removeLanguagenotification } from "../../Redux/LanguageSlice"
import { GetDocuments, removeDocumentnotification } from "../../Redux/DocumentSlice"
import { GetCases, removeCasenotification } from "../../Redux/CaseSlice"

const mapStateToProps = (state) => ({
    Jobs: state.Jobs,
    Languages: state.Languages,
    Documents: state.Documents,
    Cases: state.Cases,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetJobs, removeJobnotification, handleDeletemodal, handleSelectedJob, GetCases, removeCasenotification,
    GetLanguages, removeLanguagenotification, GetDocuments, removeDocumentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)