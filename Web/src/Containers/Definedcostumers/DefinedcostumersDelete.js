import { connect } from 'react-redux'
import DefinedcostumersDelete from "../../Pages/Definedcostumers/DefinedcostumersDelete"
import {
    DeleteDefinedcostumers, removeDefinedcostumernotification, fillDefinedcostumernotification,
    handleDeletemodal, handleSelectedDefinedcostumer
} from "../../Redux/DefinedcostumerSlice"

const mapStateToProps = (state) => ({
    Definedcostumers: state.Definedcostumers,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteDefinedcostumers, removeDefinedcostumernotification, fillDefinedcostumernotification,
    handleDeletemodal, handleSelectedDefinedcostumer
}

export default connect(mapStateToProps, mapDispatchToProps)(DefinedcostumersDelete)