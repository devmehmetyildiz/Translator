import { connect } from 'react-redux'
import PaymentsEdit from '../../Pages/Payments/PaymentsEdit'
import {
    EditPayments, GetPayment, handleDeletemodal,
    removePaymentnotification, fillPaymentnotification
} from "../../Redux/PaymentSlice"

const mapStateToProps = (state) => ({
    Payments: state.Payments,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditPayments, GetPayment, handleDeletemodal,
    removePaymentnotification, fillPaymentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsEdit)