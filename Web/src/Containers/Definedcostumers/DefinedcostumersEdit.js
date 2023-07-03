import { connect } from 'react-redux'
import DefinedcostumersEdit from '../../Pages/Definedcostumers/DefinedcostumersEdit'
import {
    EditDefinedcostumers, GetDefinedcostumer, handleDeletemodal,
    removeDefinedcostumernotification, fillDefinedcostumernotification
} from "../../Redux/DefinedcostumerSlice"

const mapStateToProps = (state) => ({
    Definedcostumers: state.Definedcostumers,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditDefinedcostumers, GetDefinedcostumer, handleDeletemodal,
    removeDefinedcostumernotification, fillDefinedcostumernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(DefinedcostumersEdit)