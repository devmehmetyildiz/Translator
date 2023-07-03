import { connect } from 'react-redux'
import DefinedcompaniesCreate from '../../Pages/Definedcompanies/DefinedcompaniesCreate'
import { AddDefinedcompanies, removeDefinedcompanynotification, fillDefinedcompanynotification } from "../../Redux/DefinedcompanySlice"


const mapStateToProps = (state) => ({
    Definedcompanies: state.Definedcompanies,
    Profile: state.Profile
})

const mapDispatchToProps = { AddDefinedcompanies, removeDefinedcompanynotification, fillDefinedcompanynotification }

export default connect(mapStateToProps, mapDispatchToProps)(DefinedcompaniesCreate)