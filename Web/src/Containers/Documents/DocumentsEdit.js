import { connect } from 'react-redux'
import DocumentsEdit from '../../Pages/Documents/DocumentsEdit'
import {
    EditDocuments, GetDocument, handleDeletemodal,
    removeDocumentnotification, fillDocumentnotification
} from "../../Redux/DocumentSlice"

const mapStateToProps = (state) => ({
    Documents: state.Documents,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditDocuments, GetDocument, handleDeletemodal,
    removeDocumentnotification, fillDocumentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsEdit)