import { connect } from 'react-redux'
import DefinedcompaniesEdit from '../../Pages/Definedcompanies/DefinedcompaniesEdit'
import {
    EditDefinedcompanies, GetDefinedcompany, handleDeletemodal,
    removeDefinedcompanynotification, fillDefinedcompanynotification
} from "../../Redux/DefinedcompanySlice"

const mapStateToProps = (state) => ({
    Definedcompanies: state.Definedcompanies,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditDefinedcompanies, GetDefinedcompany, handleDeletemodal,
    removeDefinedcompanynotification, fillDefinedcompanynotification
}

export default connect(mapStateToProps, mapDispatchToProps)(DefinedcompaniesEdit)