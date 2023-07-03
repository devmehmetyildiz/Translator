import { connect } from 'react-redux'
import DefinedcompaniesDelete from "../../Pages/Definedcompanies/DefinedcompaniesDelete"
import {
    DeleteDefinedcompanies, removeDefinedcompanynotification, fillDefinedcompanynotification,
    handleDeletemodal, handleSelectedDefinedcompany
} from "../../Redux/DefinedcompanySlice"

const mapStateToProps = (state) => ({
    Definedcompanies: state.Definedcompanies,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteDefinedcompanies, removeDefinedcompanynotification, fillDefinedcompanynotification,
    handleDeletemodal, handleSelectedDefinedcompany
}

export default connect(mapStateToProps, mapDispatchToProps)(DefinedcompaniesDelete)