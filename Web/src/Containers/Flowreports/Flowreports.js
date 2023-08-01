import { connect } from 'react-redux'
import Flowreports from "../../Pages/Flowreports/Flowreports"
import { GetRecordtypes, removeRecordtypenotification } from "../../Redux/RecordtypeSlice"
import { GetGoals, removeGoalnotification } from "../../Redux/GoalSlice"
import {
    GetOrdercountbydate, GetOrdercountwithjob, GetPriceexpence, GetPricenet,
    GetPricepotancial, GetPricereal, removeFlownotification, GetOrdersforchart
} from "../../Redux/FlowSlice"

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Flows: state.Flows,
    Recordtypes: state.Recordtypes,
    Goals: state.Goals
})

const mapDispatchToProps = {
    GetRecordtypes, removeRecordtypenotification,
    GetOrdercountbydate, GetOrdercountwithjob, GetPriceexpence, GetPricenet,
    GetPricepotancial, GetPricereal, removeFlownotification,
    GetGoals, removeGoalnotification, GetOrdersforchart
}

export default connect(mapStateToProps, mapDispatchToProps)(Flowreports)