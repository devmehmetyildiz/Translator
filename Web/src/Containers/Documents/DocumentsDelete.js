import { connect } from 'react-redux'
import DocumentsDelete from "../../Pages/Documents/DocumentsDelete"
import {
    DeleteDocuments, removeDocumentnotification, fillDocumentnotification,
    handleDeletemodal, handleSelectedDocument
} from "../../Redux/DocumentSlice"

const mapStateToProps = (state) => ({
    Documents: state.Documents,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteDocuments, removeDocumentnotification, fillDocumentnotification,
    handleDeletemodal, handleSelectedDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsDelete)