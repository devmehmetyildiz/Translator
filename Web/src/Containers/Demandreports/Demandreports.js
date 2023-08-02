import { connect } from 'react-redux'
import Demandreports from "../../Pages/Demandreports/Demandreports"
import { Getjobpricewithdocumentlanguage, removeFlownotification } from "../../Redux/FlowSlice"
import { GetLanguages, removeLanguagenotification } from "../../Redux/LanguageSlice"
import { GetDocuments, removeDocumentnotification } from "../../Redux/DocumentSlice"
import { GetRecordtypes, removeRecordtypenotification } from "../../Redux/RecordtypeSlice"

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Flows: state.Flows,
    Documents: state.Documents,
    Languages: state.Languages,
    Recordtypes: state.Recordtypes,
})

const mapDispatchToProps = {
    Getjobpricewithdocumentlanguage, removeFlownotification, GetRecordtypes, removeRecordtypenotification,
    GetLanguages, removeLanguagenotification, GetDocuments, removeDocumentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Demandreports)