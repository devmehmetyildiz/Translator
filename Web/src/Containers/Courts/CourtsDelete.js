import { connect } from 'react-redux'
import CourtsDelete from "../../Pages/Courts/CourtsDelete"
import {
    DeleteCourts, removeCourtnotification, fillCourtnotification,
    handleDeletemodal, handleSelectedCourt
} from "../../Redux/CourtSlice"

const mapStateToProps = (state) => ({
    Courts: state.Courts,
    Profile: state.Profile
})

const mapDispatchToProps = {    DeleteCourts, removeCourtnotification, fillCourtnotification,
    handleDeletemodal, handleSelectedCourt }

export default connect(mapStateToProps, mapDispatchToProps)(CourtsDelete)