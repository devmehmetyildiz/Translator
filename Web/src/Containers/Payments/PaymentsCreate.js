import { connect } from 'react-redux'
import PaymentsCreate from '../../Pages/Payments/PaymentsCreate'
import { AddPayments, removePaymentnotification, fillPaymentnotification } from "../../Redux/PaymentSlice"


const mapStateToProps = (state) => ({
    Payments: state.Payments,
    Profile: state.Profile
})

const mapDispatchToProps = { AddPayments, removePaymentnotification, fillPaymentnotification }

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsCreate)