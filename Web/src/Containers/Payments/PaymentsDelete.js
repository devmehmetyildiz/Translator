import { connect } from 'react-redux'
import PaymentsDelete from "../../Pages/Payments/PaymentsDelete"
import {
    DeletePayments, removePaymentnotification, fillPaymentnotification,
    handleDeletemodal, handleSelectedPayment
} from "../../Redux/PaymentSlice"

const mapStateToProps = (state) => ({
    Payments: state.Payments,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeletePayments, removePaymentnotification, fillPaymentnotification,
    handleDeletemodal, handleSelectedPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsDelete)