import { connect } from 'react-redux'
import CourtsCreate from '../../Pages/Courts/CourtsCreate'
import { AddCourts, removeCourtnotification, fillCourtnotification } from "../../Redux/CourtSlice"


const mapStateToProps = (state) => ({
    Courts: state.Courts,
    Profile: state.Profile
})

const mapDispatchToProps = { AddCourts, removeCourtnotification, fillCourtnotification }

export default connect(mapStateToProps, mapDispatchToProps)(CourtsCreate)