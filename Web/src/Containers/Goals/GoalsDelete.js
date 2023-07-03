import { connect } from 'react-redux'
import GoalsDelete from "../../Pages/Goals/GoalsDelete"
import {
    DeleteGoals, removeGoalnotification, fillGoalnotification,
    handleDeletemodal, handleSelectedGoal
} from "../../Redux/GoalSlice"

const mapStateToProps = (state) => ({
    Goals: state.Goals,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteGoals, removeGoalnotification, fillGoalnotification,
    handleDeletemodal, handleSelectedGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalsDelete)