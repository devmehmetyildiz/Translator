import { connect } from 'react-redux'
import TranslatorsCreate from '../../Pages/Translators/TranslatorsCreate'
import { AddTranslators, removeTranslatornotification, fillTranslatornotification } from "../../Redux/TranslatorSlice"


const mapStateToProps = (state) => ({
    Translators: state.Translators,
    Profile: state.Profile
})

const mapDispatchToProps = { AddTranslators, removeTranslatornotification, fillTranslatornotification }

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorsCreate)