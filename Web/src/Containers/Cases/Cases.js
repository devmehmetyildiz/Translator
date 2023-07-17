import { connect } from 'react-redux'
import Cases from "../../Pages/Cases/Cases"
import { GetCases, DeleteCases, removeCasenotification, fillCasenotification, handleDeletemodal, handleSelectedCase, AddRecordCases } from "../../Redux/CaseSlice"

const mapStateToProps = (state) => ({
  Cases: state.Cases,
  Profile: state.Profile
})

const mapDispatchToProps = { GetCases, DeleteCases, removeCasenotification, AddRecordCases, fillCasenotification, handleDeletemodal, handleSelectedCase }

export default connect(mapStateToProps, mapDispatchToProps)(Cases)