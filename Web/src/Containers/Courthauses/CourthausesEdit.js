import { connect } from 'react-redux'
import CourthausesEdit from '../../Pages/Courthauses/CourthausesEdit'
import { EditCourthauses, GetCourthause, handleSelectedCourthause, removeCourthausenotification, fillCourthausenotification } from "../../Redux/CourthauseSlice"

const mapStateToProps = (state) => ({
    Courthauses: state.Courthauses,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditCourthauses, GetCourthause, handleSelectedCourthause, removeCourthausenotification, fillCourthausenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(CourthausesEdit)