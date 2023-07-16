import React, { Component } from 'react'
import { Icon, Button, Modal, Table, Label, Checkbox, Form } from 'semantic-ui-react'
import Literals from './Literals'
import { read, utils } from 'xlsx';

class ExcelImport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opened: false,
            columns: [],
            dataUploaded: false
        }
    }

    componentDidMount() {

    }

    render() {

        const { Profile } = this.props
        const { columns } = this.state

        return <React.Fragment>
            <Button color='violet' floated='right' onClick={() => { this.setState({ opened: !this.state.opened }) }} >{Literals.Columns.Excelimport[Profile.Language]}</Button>
            <Modal
                open={this.state.opened}
                size={'large'}
                centered={true}>
                <Modal.Header><Icon name='file' />{Literals.Page.Pageheaderexcelimport[Profile.Language]}</Modal.Header>
                <Modal.Content scrolling>
                    <Form.Input label={Literals.Columns.File} type='file' accept=".xlsx, .xls" fluid onChange={this.handleFileChange}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button type='button' floated='left' negative onClick={() => this.resetTable()}>{Literals.Button.Reset[Profile.Language]}</Button>
                    <Form.Group widths={'equal'}>
                        <Button type='button' negative onClick={() => this.setState({ opened: false })}>{Literals.Button.Giveup[Profile.Language]}</Button>
                        <Button floated='right' type='submit' positive onClick={() => this.saveChanges()}>{Literals.Button.Create[Profile.Language]}</Button>
                    </Form.Group>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target.result;
            const workbook = read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(sheet, { header: 1 });
            console.log('jsonData: ', jsonData);
            // Assuming the first row contains headers, you can adjust the options as needed.
            // By default, sheet_to_json uses the first row as headers.
        };
    };

    saveChanges = () => {
        const { SaveTableMeta, meta, metaKey } = this.props
        let tableMeta = (meta || []).find(u => u.Meta === metaKey)
        const { decoratedColumns } = this.state
        delete decoratedColumns['name']
        const data = tableMeta ? {
            Id: tableMeta.Id,
            UserID: tableMeta.UserID,
            Meta: tableMeta.Meta,
            Config: JSON.stringify(decoratedColumns)
        } :
            {
                Id: 0,
                UserID: "",
                Meta: metaKey,
                Config: JSON.stringify(decoratedColumns)
            }
        this.setState({ opened: false })
        SaveTableMeta({ data })
    }

    resetTable = () => {
        const { metaKey, ResetTableMeta } = this.props
        ResetTableMeta(metaKey)
    }

    orderChanged = (property, value) => {
        const Columns = this.state.decoratedColumns
        const index = Columns.findIndex(column => column.key === property)
        Columns.filter(column => column.order === value)
            .forEach((column) => column.order = Columns[index].order > value ? column.order + 1 : column.order - 1)
        Columns[index].order = value
        this.setState({ decoratedColumns: Columns })
    }

    visibleChanged = (property) => {
        const Columns = this.state.decoratedColumns
        const index = Columns.findIndex(column => column.key === property)
        Columns[index].isVisible = !Columns[index].isVisible
        this.setState({ decoratedColumns: Columns })
    }
}


export default ExcelImport