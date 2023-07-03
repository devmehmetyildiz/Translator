import { connect } from 'react-redux'
import CasesEdit from '../../Pages/Cases/CasesEdit'
import { EditCases, GetCase, handleSelectedCase, removeCasenotification, fillCasenotification } from "../../Redux/CaseSlice"

const mapStateToProps = (state) => ({
  Cases: state.Cases,
  Profile: state.Profile
})

const mapDispatchToProps = {
  EditCases, GetCase, handleSelectedCase, removeCasenotification, fillCasenotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(CasesEdit)