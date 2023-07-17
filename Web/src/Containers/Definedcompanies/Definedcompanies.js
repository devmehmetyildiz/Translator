import { connect } from 'react-redux'
import Definedcompanies from "../../Pages/Definedcompanies/Definedcompanies"
import {
  GetDefinedcompanies, DeleteDefinedcompanies, removeDefinedcompanynotification,
  fillDefinedcompanynotification, handleDeletemodal, handleSelectedDefinedcompany,AddRecordDefinedcompanies
} from "../../Redux/DefinedcompanySlice"

const mapStateToProps = (state) => ({
  Definedcompanies: state.Definedcompanies,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetDefinedcompanies, DeleteDefinedcompanies, removeDefinedcompanynotification,
  fillDefinedcompanynotification, handleDeletemodal, handleSelectedDefinedcompany,AddRecordDefinedcompanies
}

export default connect(mapStateToProps, mapDispatchToProps)(Definedcompanies)