import { connect } from 'react-redux'
import Recordtypes from "../../Pages/Recordtypes/Recordtypes"
import {
  GetRecordtypes, DeleteRecordtypes, removeRecordtypenotification, AddRecordRecordtypes,
  fillRecordtypenotification, handleDeletemodal, handleSelectedRecordtype
} from "../../Redux/RecordtypeSlice"
import { GetGoals, removeGoalnotification } from "../../Redux/GoalSlice"

const mapStateToProps = (state) => ({
  Recordtypes: state.Recordtypes,
  Profile: state.Profile,
  Goals: state.Goals
})

const mapDispatchToProps = {
  GetRecordtypes, DeleteRecordtypes, removeRecordtypenotification, AddRecordRecordtypes,
  fillRecordtypenotification, handleDeletemodal, handleSelectedRecordtype, GetGoals, removeGoalnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Recordtypes)