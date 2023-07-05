import { connect } from 'react-redux'
import Orders from "../../Pages/Orders/Orders"
import { GetOrders, removeOrdernotification, handleDeletemodal, handleSelectedOrder } from "../../Redux/OrderSlice"

const mapStateToProps = (state) => ({
    Orders: state.Orders,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetOrders, removeOrdernotification, handleDeletemodal, handleSelectedOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)