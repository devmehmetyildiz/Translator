import { connect } from 'react-redux'
import TranslatorsDelete from "../../Pages/Translators/TranslatorsDelete"
import {
    DeleteTranslators, removeTranslatornotification, fillTranslatornotification,
    handleDeletemodal, handleSelectedTranslator
} from "../../Redux/TranslatorSlice"

const mapStateToProps = (state) => ({
    Translators: state.Translators,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteTranslators, removeTranslatornotification, fillTranslatornotification,
    handleDeletemodal, handleSelectedTranslator
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorsDelete)