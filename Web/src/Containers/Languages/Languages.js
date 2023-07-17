import { connect } from 'react-redux'
import Languages from "../../Pages/Languages/Languages"
import {
  GetLanguages, DeleteLanguages, removeLanguagenotification, GetLanguageconfig, EditLanguageconfig,
  fillLanguagenotification, handleDeletemodal, handleSelectedLanguage, AddRecordLanguages
} from "../../Redux/LanguageSlice"

const mapStateToProps = (state) => ({
  Languages: state.Languages,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetLanguages, DeleteLanguages, removeLanguagenotification, GetLanguageconfig, EditLanguageconfig,
  fillLanguagenotification, handleDeletemodal, handleSelectedLanguage, AddRecordLanguages
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages)