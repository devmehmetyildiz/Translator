import { connect } from 'react-redux'
import TranslatorsEdit from '../../Pages/Translators/TranslatorsEdit'
import {
    EditTranslators, GetTranslator, handleDeletemodal,
    removeTranslatornotification, fillTranslatornotification
} from "../../Redux/TranslatorSlice"

const mapStateToProps = (state) => ({
    Translators: state.Translators,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditTranslators, GetTranslator, handleDeletemodal,
    removeTranslatornotification, fillTranslatornotification
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorsEdit)