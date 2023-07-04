import { connect } from 'react-redux'
import TranslatorsCreate from '../../Pages/Translators/TranslatorsCreate'
import { AddTranslators, removeTranslatornotification, fillTranslatornotification } from "../../Redux/TranslatorSlice"
import { GetUsers, removeUsernotification } from "../../Redux/UserSlice"


const mapStateToProps = (state) => ({
    Translators: state.Translators,
    Users:state.Users,
    Profile: state.Profile
})

const mapDispatchToProps = { AddTranslators, removeTranslatornotification, fillTranslatornotification, GetUsers, removeUsernotification }

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorsCreate)