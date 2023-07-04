import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Literals from './Literals'

export default class PaymentsDelete extends Component {

    render() {
        const { Profile, Payments, DeletePayments, handleDeletemodal, handleSelectedPayment } = this.props
        const { isDeletemodalopen, selected_record } = Payments
        return (
            <Modal
                onClose={() => handleDeletemodal(false)}
                onOpen={() => handleDeletemodal(true)}
                open={isDeletemodalopen}
            >
                <Modal.Header>{Literals.Page.Pagedeleteheader[Profile.Language]}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <p>
                            <span className='font-bold'>{selected_record?.Name} </span>
                            {Literals.Messages.Deletecheck[Profile.Language]}
                        </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => {
                        handleDeletemodal(false)
                        handleSelectedPayment({})
                    }}>
                        {Literals.Button.Giveup[Profile.Language]}
                    </Button>
                    <Button
                        content={Literals.Button.Delete[Profile.Language]}
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {
                            DeletePayments(selected_record)
                            handleDeletemodal(false)
                            handleSelectedPayment({})
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}
