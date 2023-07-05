import { connect } from 'react-redux'
import JobsDelete from "../../Pages/Jobs/JobsDelete"
import { DeleteJobs, handleDeletemodal, handleSelectedJob, removeJobnotification } from "../../Redux/JobSlice"

const mapStateToProps = (state) => ({
    Jobs: state.Jobs,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteJobs, handleDeletemodal, handleSelectedJob, removeJobnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsDelete)