import { connect } from 'react-redux'
import Jobs from "../../Pages/Jobs/Jobs"
import { GetJobs, removeJobnotification, handleDeletemodal, handleSelectedJob } from "../../Redux/JobSlice"

const mapStateToProps = (state) => ({
    Jobs: state.Jobs,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetJobs, removeJobnotification, handleDeletemodal, handleSelectedJob
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)