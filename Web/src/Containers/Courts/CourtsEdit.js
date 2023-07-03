import { connect } from 'react-redux'
import CourtsEdit from '../../Pages/Courts/CourtsEdit'
import {
    EditCourts, GetCourt, handleDeletemodal,
    removeCourtnotification, fillCourtnotification
} from "../../Redux/CourtSlice"

const mapStateToProps = (state) => ({
    Cases: state.Cases,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditCourts, GetCourt, handleDeletemodal,
    removeCourtnotification, fillCourtnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(CourtsEdit)