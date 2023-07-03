import { connect } from 'react-redux'
import DefinedcostumersCreate from '../../Pages/Definedcostumers/DefinedcostumersCreate'
import { AddDefinedcostumers, removeDefinedcostumernotification, fillDefinedcostumernotification } from "../../Redux/DefinedcostumerSlice"


const mapStateToProps = (state) => ({
    Definedcostumers: state.Definedcostumers,
    Profile: state.Profile
})

const mapDispatchToProps = {AddDefinedcostumers, removeDefinedcostumernotification, fillDefinedcostumernotification }

export default connect(mapStateToProps, mapDispatchToProps)(DefinedcostumersCreate)