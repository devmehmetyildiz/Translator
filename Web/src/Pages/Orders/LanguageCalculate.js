import React, { Component } from 'react'
import { Form, Grid, Icon, Modal } from 'semantic-ui-react'
import Literals from './Literals'

export default class LanguageCalculate extends Component {

    handleChange = (e, { value, name }) => {
        const { Jobs, updateJobs, Key } = this.props
        const selectedJob = Jobs.find(u => u.key === Key)
        selectedJob[name] = value
        updateJobs(Jobs)
    }

    render() {
        const { Profile, Jobs, Key } = this.props
        const selectedJob = Jobs.find(u => u.key === Key)

        return (
            <Modal trigger={<Icon className='type-conversion-remove-icon' link color='red' name='edit' />}>
                <Modal.Header>{Literals.Page.Pagelanguageeditheader[Profile.Language]}</Modal.Header>
                <Modal.Header>{Literals.Columns.Jobcountorder[Profile.Language]}{` : ${selectedJob.Order}`}</Modal.Header>
                <Modal.Content >
                    <Grid columns={2} divided>
                        <Grid.Column>
                            <Grid.Row>
                                <Form.Input value={selectedJob.Wordcount} onChange={this.handleChange} fluid name='Wordcount' label={Literals.Columns.Wordcount[Profile.Language]} />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input value={selectedJob.Linecount} onChange={this.handleChange} fluid name='Linecount' label={Literals.Columns.Linecount[Profile.Language]} />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input value={selectedJob.Charcount} onChange={this.handleChange} fluid name='Charcount' label={Literals.Columns.Charcount[Profile.Language]} />
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid.Row>
                                <Form.Input value={selectedJob.Preferredprice} onChange={this.handleChange} fluid name='Preferredprice' label={Literals.Columns.Preferredprice[Profile.Language]} />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input disabled label={Literals.Columns.Calculatedprice[Profile.Language]} fluid value={selectedJob.Calculatedprice} />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input disabled label={Literals.Columns.Calculatedamount[Profile.Language]} fluid value={selectedJob.Calculatedamount} />
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
            </Modal>
        )
    }
}
