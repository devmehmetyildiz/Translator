import { connect } from 'react-redux'
import Orders from "../../Pages/Orders/Orders"
import { GetOrders, removeOrdernotification, handleDeletemodal, handleSelectedOrder } from "../../Redux/OrderSlice"
import { GetJobs, removeJobnotification } from "../../Redux/JobSlice"

const mapStateToProps = (state) => ({
    Orders: state.Orders,
    Jobs: state.Jobs,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetOrders, removeOrdernotification, handleDeletemodal, handleSelectedOrder, GetJobs, removeJobnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)