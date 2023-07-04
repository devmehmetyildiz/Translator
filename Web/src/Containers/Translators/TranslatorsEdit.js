import { connect } from 'react-redux'
import TranslatorsEdit from '../../Pages/Translators/TranslatorsEdit'
import {
    EditTranslators, GetTranslator, handleDeletemodal,
    removeTranslatornotification, fillTranslatornotification
} from "../../Redux/TranslatorSlice"
import { GetUsers, removeUsernotification } from "../../Redux/UserSlice"


const mapStateToProps = (state) => ({
    Translators: state.Translators,
    Users: state.Users,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditTranslators, GetTranslator, handleDeletemodal,
    removeTranslatornotification, fillTranslatornotification, GetUsers, removeUsernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorsEdit)