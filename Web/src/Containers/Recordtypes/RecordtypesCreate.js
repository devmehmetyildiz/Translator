import { connect } from 'react-redux'
import RecordtypesCreate from '../../Pages/Recordtypes/RecordtypesCreate'
import { AddRecordtypes, removeRecordtypenotification, fillRecordtypenotification } from "../../Redux/RecordtypeSlice"


const mapStateToProps = (state) => ({
    Recordtypes: state.Recordtypes,
    Profile: state.Profile
})

const mapDispatchToProps = { AddRecordtypes, removeRecordtypenotification, fillRecordtypenotification }

export default connect(mapStateToProps, mapDispatchToProps)(RecordtypesCreate)