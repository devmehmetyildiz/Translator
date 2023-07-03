import { connect } from 'react-redux'
import LanguagesDelete from "../../Pages/Languages/LanguagesDelete"
import {
    DeleteLanguages, removeLanguagenotification, fillLanguagenotification,
    handleDeletemodal, handleSelectedLanguage
} from "../../Redux/LanguageSlice"

const mapStateToProps = (state) => ({
    Languages: state.Languages,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteLanguages, removeLanguagenotification, fillLanguagenotification,
    handleDeletemodal, handleSelectedLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesDelete)