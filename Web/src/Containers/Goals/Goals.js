import { connect } from 'react-redux'
import Goals from "../../Pages/Goals/Goals"
import {
  GetGoals, DeleteGoals, removeGoalnotification,AddRecordGoals,
  fillGoalnotification, handleDeletemodal, handleSelectedGoal
} from "../../Redux/GoalSlice"

const mapStateToProps = (state) => ({
  Goals: state.Goals,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetGoals, DeleteGoals, removeGoalnotification,AddRecordGoals,
  fillGoalnotification, handleDeletemodal, handleSelectedGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)