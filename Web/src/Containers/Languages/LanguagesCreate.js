import { connect } from 'react-redux'
import LanguagesCreate from '../../Pages/Languages/LanguagesCreate'
import { AddLanguages, removeLanguagenotification, fillLanguagenotification } from "../../Redux/LanguageSlice"


const mapStateToProps = (state) => ({
    Languages: state.Languages,
    Profile: state.Profile
})

const mapDispatchToProps = { AddLanguages, removeLanguagenotification, fillLanguagenotification }

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesCreate)