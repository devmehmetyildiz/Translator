import { connect } from 'react-redux'
import Translators from "../../Pages/Translators/Translators"
import {
  GetTranslators, DeleteTranslators, removeTranslatornotification, AddRecordTranslators,
  fillTranslatornotification, handleDeletemodal, handleSelectedTranslator
} from "../../Redux/TranslatorSlice"
import { GetUsers, removeUsernotification } from "../../Redux/UserSlice"

const mapStateToProps = (state) => ({
  Translators: state.Translators,
  Profile: state.Profile,
  Users: state.Users
})

const mapDispatchToProps = {
  GetTranslators, DeleteTranslators, removeTranslatornotification, AddRecordTranslators,
  fillTranslatornotification, handleDeletemodal, handleSelectedTranslator, GetUsers, removeUsernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Translators)