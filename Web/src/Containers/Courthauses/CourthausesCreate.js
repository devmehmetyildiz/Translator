import { connect } from 'react-redux'
import CourthausesCreate from '../../Pages/Courthauses/CourthausesCreate'
import { AddCourthauses, removeCourthausenotification, fillCourthausenotification } from "../../Redux/CourthauseSlice"


const mapStateToProps = (state) => ({
    Courthauses: state.Courthauses,
    Profile: state.Profile
})

const mapDispatchToProps = { AddCourthauses, removeCourthausenotification, fillCourthausenotification }

export default connect(mapStateToProps, mapDispatchToProps)(CourthausesCreate)