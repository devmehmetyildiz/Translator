import { connect } from 'react-redux'
import LanguagesCreate from '../../Pages/Languages/LanguagesCreate'
import { AddLanguages, removeLanguagenotification, fillLanguagenotification } from "../../Redux/LanguageSlice"
import { GetKdvs, removeKdvnotification } from "../../Redux/KdvSlice"


const mapStateToProps = (state) => ({
    Languages: state.Languages,
    Kdvs: state.Kdvs,
    Profile: state.Profile
})

const mapDispatchToProps = {
    AddLanguages, removeLanguagenotification, fillLanguagenotification,
    GetKdvs, removeKdvnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesCreate)