import { connect } from 'react-redux'
import Courthauses from "../../Pages/Courthauses/Courthauses"
import { GetCourthauses, DeleteCourthauses, removeCourthausenotification, fillCourthausenotification, handleDeletemodal, handleSelectedCourthause } from "../../Redux/CourthauseSlice"

const mapStateToProps = (state) => ({
  Courthauses: state.Courthauses,
  Profile: state.Profile
})

const mapDispatchToProps = { GetCourthauses, DeleteCourthauses, removeCourthausenotification, fillCourthausenotification, handleDeletemodal, handleSelectedCourthause }

export default connect(mapStateToProps, mapDispatchToProps)(Courthauses)