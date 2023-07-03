import { connect } from 'react-redux'
import Courts from "../../Pages/Courts/Courts"
import {
  GetCourts, DeleteCourts, removeCourtnotification, fillCourtnotification,
  handleDeletemodal, handleSelectedCourt
} from "../../Redux/CourtSlice"

const mapStateToProps = (state) => ({
  Courts: state.Courts,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetCourts, DeleteCourts, removeCourtnotification, fillCourtnotification,
  handleDeletemodal, handleSelectedCourt
}

export default connect(mapStateToProps, mapDispatchToProps)(Courts)