import { connect } from 'react-redux'
import Definedcostumers from "../../Pages/Definedcostumers/Definedcostumers"
import {
  GetDefinedcostumers, DeleteDefinedcostumers, removeDefinedcostumernotification,
  fillDefinedcostumernotification, handleDeletemodal, handleSelectedDefinedcostumer
} from "../../Redux/DefinedcostumerSlice"

const mapStateToProps = (state) => ({
  Definedcostumers: state.Definedcostumers,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetDefinedcostumers, DeleteDefinedcostumers, removeDefinedcostumernotification,
  fillDefinedcostumernotification, handleDeletemodal, handleSelectedDefinedcostumer
}

export default connect(mapStateToProps, mapDispatchToProps)(Definedcostumers)