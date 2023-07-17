import { connect } from 'react-redux'
import Recordtypes from "../../Pages/Recordtypes/Recordtypes"
import {
  GetRecordtypes, DeleteRecordtypes, removeRecordtypenotification, AddRecordRecordtypes,
  fillRecordtypenotification, handleDeletemodal, handleSelectedRecordtype
} from "../../Redux/RecordtypeSlice"

const mapStateToProps = (state) => ({
  Recordtypes: state.Recordtypes,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetRecordtypes, DeleteRecordtypes, removeRecordtypenotification, AddRecordRecordtypes,
  fillRecordtypenotification, handleDeletemodal, handleSelectedRecordtype
}

export default connect(mapStateToProps, mapDispatchToProps)(Recordtypes)