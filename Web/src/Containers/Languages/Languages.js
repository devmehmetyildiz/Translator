import { connect } from 'react-redux'
import Languages from "../../Pages/Languages/Languages"
import {
  GetLanguages, DeleteLanguages, removeLanguagenotification, GetLanguageconfig, EditLanguageconfig,
  fillLanguagenotification, handleDeletemodal, handleSelectedLanguage, AddRecordLanguages
} from "../../Redux/LanguageSlice"
import { GetKdvs, removeKdvnotification } from "../../Redux/KdvSlice"

const mapStateToProps = (state) => ({
  Languages: state.Languages,
  Profile: state.Profile,
  Kdvs: state.Kdvs
})

const mapDispatchToProps = {
  GetLanguages, DeleteLanguages, removeLanguagenotification, GetLanguageconfig, EditLanguageconfig,
  fillLanguagenotification, handleDeletemodal, handleSelectedLanguage, AddRecordLanguages, GetKdvs, removeKdvnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages)