import { connect } from 'react-redux'
import OrdersDelete from "../../Pages/Orders/OrdersDelete"
import { DeleteOrders, handleDeletemodal, handleSelectedOrder, removeOrdernotification } from "../../Redux/OrderSlice"

const mapStateToProps = (state) => ({
    Orders: state.Orders,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteOrders, handleDeletemodal, handleSelectedOrder, removeOrdernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersDelete)