import { connect } from 'react-redux'
import CasesCreate from '../../Pages/Cases/CasesCreate'
import { AddCases, removeCasenotification, fillCasenotification } from "../../Redux/CaseSlice"


const mapStateToProps = (state) => ({
  Cases: state.Cases,
  Profile: state.Profile
})

const mapDispatchToProps = { AddCases, removeCasenotification, fillCasenotification }

export default connect(mapStateToProps, mapDispatchToProps)(CasesCreate)