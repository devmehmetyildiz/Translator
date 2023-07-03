import { connect } from 'react-redux'
import Documents from "../../Pages/Documents/Documents"
import {
  GetDocuments, DeleteDocuments, removeDocumentnotification,
  fillDocumentnotification, handleDeletemodal, handleSelectedDocument
} from "../../Redux/DocumentSlice"

const mapStateToProps = (state) => ({
  Documents: state.Documents,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetDocuments, DeleteDocuments, removeDocumentnotification,
  fillDocumentnotification, handleDeletemodal, handleSelectedDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents)