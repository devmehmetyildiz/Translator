import { connect } from 'react-redux'
import Payments from "../../Pages/Payments/Payments"
import {
  GetPayments, DeletePayments, removePaymentnotification,AddRecordPayments,
  fillPaymentnotification, handleDeletemodal, handleSelectedPayment
} from "../../Redux/PaymentSlice"

const mapStateToProps = (state) => ({
  Payments: state.Payments,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetPayments, DeletePayments, removePaymentnotification,AddRecordPayments,
  fillPaymentnotification, handleDeletemodal, handleSelectedPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)