import { connect } from 'react-redux'
import Translators from "../../Pages/Translators/Translators"
import {
  GetTranslators, DeleteTranslators, removeTranslatornotification, AddRecordTranslators,
  fillTranslatornotification, handleDeletemodal, handleSelectedTranslator
} from "../../Redux/TranslatorSlice"

const mapStateToProps = (state) => ({
  Translators: state.Translators,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetTranslators, DeleteTranslators, removeTranslatornotification, AddRecordTranslators,
  fillTranslatornotification, handleDeletemodal, handleSelectedTranslator
}

export default connect(mapStateToProps, mapDispatchToProps)(Translators)