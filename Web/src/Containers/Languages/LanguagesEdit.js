import { connect } from 'react-redux'
import LanguagesEdit from '../../Pages/Languages/LanguagesEdit'
import {
    EditLanguages, GetLanguage, handleDeletemodal,
    removeLanguagenotification, fillLanguagenotification
} from "../../Redux/LanguageSlice"
import { GetKdvs, removeKdvnotification } from "../../Redux/KdvSlice"

const mapStateToProps = (state) => ({
    Languages: state.Languages,
    Kdvs: state.Kdvs,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditLanguages, GetLanguage, handleDeletemodal, GetKdvs, removeKdvnotification,
    removeLanguagenotification, fillLanguagenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesEdit)