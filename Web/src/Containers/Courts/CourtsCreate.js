import { connect } from 'react-redux'
import CourtsCreate from '../../Pages/Courts/CourtsCreate'
import { AddCourthauses, removeCourthausenotification, fillCourthausenotification } from "../../Redux/CourtSlice"


const mapStateToProps = (state) => ({
    Courts: state.Courts,
    Profile: state.Profile
})

const mapDispatchToProps = { AddCourthauses, removeCourthausenotification, fillCourthausenotification }

export default connect(mapStateToProps, mapDispatchToProps)(CourtsCreate)