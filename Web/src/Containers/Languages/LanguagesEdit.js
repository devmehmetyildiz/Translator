import { connect } from 'react-redux'
import LanguagesEdit from '../../Pages/Languages/LanguagesEdit'
import {
    EditLanguages, GetLanguage, handleDeletemodal,
    removeLanguagenotification, fillLanguagenotification
} from "../../Redux/LanguageSlice"

const mapStateToProps = (state) => ({
    Languages: state.Languages,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditLanguages, GetLanguage, handleDeletemodal,
    removeLanguagenotification, fillLanguagenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesEdit)