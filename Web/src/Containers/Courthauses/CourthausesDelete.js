import { connect } from 'react-redux'
import CourthausesDelete from "../../Pages/Courthauses/CourthausesDelete"
import { DeleteCourthauses, removeCourthausenotification, fillCourthausenotification, handleDeletemodal, handleSelectedCourthause } from "../../Redux/CourthauseSlice"

const mapStateToProps = (state) => ({
    Courthauses: state.Courthauses,
    Profile: state.Profile
})

const mapDispatchToProps = { DeleteCourthauses, removeCourthausenotification, fillCourthausenotification, handleDeletemodal, handleSelectedCourthause }

export default connect(mapStateToProps, mapDispatchToProps)(CourthausesDelete)