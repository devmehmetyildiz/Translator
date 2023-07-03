import { connect } from 'react-redux'
import RecordtypesDelete from "../../Pages/Recordtypes/RecordtypesDelete"
import {
    DeleteRecordtypes, removeRecordtypenotification, fillRecordtypenotification,
    handleDeletemodal, handleSelectedRecordtype
} from "../../Redux/RecordtypeSlice"

const mapStateToProps = (state) => ({
    Recordtypes: state.Recordtypes,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteRecordtypes, removeRecordtypenotification, fillRecordtypenotification,
    handleDeletemodal, handleSelectedRecordtype
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordtypesDelete)