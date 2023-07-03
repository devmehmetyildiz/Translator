import { connect } from 'react-redux'
import DocumentsCreate from '../../Pages/Documents/DocumentsCreate'
import { AddDocuments, removeDocumentnotification, fillDocumentnotification } from "../../Redux/DocumentSlice"


const mapStateToProps = (state) => ({
    Documents: state.Documents,
    Profile: state.Profile
})

const mapDispatchToProps = { AddDocuments, removeDocumentnotification, fillDocumentnotification }

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsCreate)