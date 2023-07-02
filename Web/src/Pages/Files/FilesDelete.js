import React, { Component } from 'react'
import Literals from "./Literals"
import { Button, Modal } from 'semantic-ui-react'
export default class FilesDelete extends Component {
  render() {
    const { Profile, Files, DeleteFiles, handleDeletemodal, handleSelectedFile } = this.props
    const { isDeletemodalopen, selected_record } = Files
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
            handleSelectedFile({})
          }}>
            {Literals.Button.Giveup[Profile.Language]}
          </Button>
          <Button
            content={Literals.Button.Delete[Profile.Language]}
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              DeleteFiles(selected_record)
              handleDeletemodal(false)
              handleSelectedFile({})
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
