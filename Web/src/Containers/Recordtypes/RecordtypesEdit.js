import { connect } from 'react-redux'
import RecordtypesEdit from '../../Pages/Recordtypes/RecordtypesEdit'
import {
    EditRecordtypes, GetRecordtype, handleDeletemodal,
    removeRecordtypenotification, fillRecordtypenotification
} from "../../Redux/RecordtypeSlice"

const mapStateToProps = (state) => ({
    Recordtypes: state.Recordtypes,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditRecordtypes, GetRecordtype, handleDeletemodal,
    removeRecordtypenotification, fillRecordtypenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordtypesEdit)