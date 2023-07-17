import { connect } from 'react-redux'
import Courts from "../../Pages/Courts/Courts"
import {
  GetCourts, DeleteCourts, removeCourtnotification, fillCourtnotification,
  handleDeletemodal, handleSelectedCourt, AddRecordCourts
} from "../../Redux/CourtSlice"

const mapStateToProps = (state) => ({
  Courts: state.Courts,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetCourts, DeleteCourts, removeCourtnotification, fillCourtnotification,
  handleDeletemodal, handleSelectedCourt, AddRecordCourts
}

export default connect(mapStateToProps, mapDispatchToProps)(Courts)