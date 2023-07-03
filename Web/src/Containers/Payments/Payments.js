import { connect } from 'react-redux'
import Payments from "../../Pages/Payments/Payments"
import {
  GetPayments, DeletePayments, removePaymentnotification,
  fillPaymentnotification, handleDeletemodal, handleSelectedPayment
} from "../../Redux/PaymentSlice"

const mapStateToProps = (state) => ({
  Languages: state.Languages,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetPayments, DeletePayments, removePaymentnotification,
  fillPaymentnotification, handleDeletemodal, handleSelectedPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)