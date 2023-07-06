import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Form, Icon, Modal, Tab, Table, Label } from 'semantic-ui-react'
import { Breadcrumb, Button } from 'semantic-ui-react'
import Notification from '../../Utils/Notification'
import LoadingPage from '../../Utils/LoadingPage'
import formToObject from 'form-to-object'
import FormInput from '../../Utils/FormInput'
import Literals from './Literals'
import validator from "../../Utils/Validator"
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Footerwrapper from '../../Common/Wrappers/Footerwrapper'
import Headerbredcrump from '../../Common/Wrappers/Headerbredcrump'
export default class OrdersCreate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRecordtype: '',
      selectedJobs: [],
      selectedPrinciblecourthause: '',
      selectedPrinciblecourt: '',
      selectedDirectivecourthause: '',
      selectedDirectivecourt: '',
      selectedCostumer: '',
      selectedCompany: '',
      selectedTranslator: '',
      selectedKdv: '',
      selectedPayment: '',
      selectedCase: '',
    }
  }

  componentDidMount() {
    const { GetRecordtypes, GetCourthauses, GetCourts, GetDefinedcostumers,
      GetDefinedcompanies, GetTranslators, GetKdvs, GetPayments, GetLanguages,
      GetDocuments, GetCases } = this.props
    GetRecordtypes()
    GetCourthauses()
    GetCourts()
    GetDefinedcostumers()
    GetDefinedcompanies()
    GetTranslators()
    GetKdvs()
    GetPayments()
    GetLanguages()
    GetDocuments()
    GetCases()
  }

  componentDidUpdate() {
    const {
      removeOrdernotification, removeRecordtypenotification,
      removeCourthausenotification, removeCourtnotification,
      removeDefinedcostumernotification, removeDefinedcompanynotification,
      removeTranslatornotification, removeKdvnotification, removePaymentnotification,
      removeLanguagenotification, removeDocumentnotification, removeCasenotification,
      Orders, Recordtypes, Courthauses, Courts, Definedcompanies,
      Definedcostumers, Translators, Kdvs, Payments, Languages, Documents, Cases
    } = this.props
    Notification(Orders.notifications, removeOrdernotification)
    Notification(Recordtypes.notifications, removeRecordtypenotification)
    Notification(Courthauses.notifications, removeCourthausenotification)
    Notification(Courts.notifications, removeCourtnotification)
    Notification(Definedcostumers.notifications, removeDefinedcostumernotification)
    Notification(Definedcompanies.notifications, removeDefinedcompanynotification)
    Notification(Translators.notifications, removeTranslatornotification)
    Notification(Kdvs.notifications, removeKdvnotification)
    Notification(Payments.notifications, removePaymentnotification)
    Notification(Languages.notifications, removeLanguagenotification)
    Notification(Documents.notifications, removeDocumentnotification)
    Notification(Cases.notifications, removeCasenotification)
  }

  render() {

    const { Orders, Recordtypes, Courthauses, Courts, Definedcompanies,
      Definedcostumers, Translators, Kdvs, Payments, Languages, Documents, Cases, Profile,
    } = this.props
    const { isLoading, isDispatching } = Orders

    const Recordtypeoption = (Recordtypes.list || []).map(recordtype => {
      return { key: recordtype.Uuid, text: recordtype.Name, value: recordtype.Uuid }
    })
    const Courthauseoption = (Courthauses.list || []).map(courthause => {
      return { key: courthause.Uuid, text: courthause.Name, value: courthause.Uuid }
    })
    const Courtoption = (Courts.list || []).map(court => {
      return { key: court.Uuid, text: court.Name, value: court.Uuid }
    })
    const Definedcompanyoption = (Definedcompanies.list || []).map(definecompany => {
      return { key: definecompany.Uuid, text: definecompany.Name, value: definecompany.Uuid }
    })
    const Definedcostumeroption = (Definedcostumers.list || []).map(definedcompany => {
      return { key: definedcompany.Uuid, text: definedcompany.Name, value: definedcompany.Uuid }
    })
    const Translatoroption = (Translators.list || []).map(translator => {
      return { key: translator.Uuid, text: translator.Name, value: translator.Uuid }
    })
    const Kdvoption = (Kdvs.list || []).map(kdv => {
      return { key: kdv.Uuid, text: kdv.Name, value: kdv.Uuid }
    })
    const Paymentoption = (Payments.list || []).map(payment => {
      return { key: payment.Uuid, text: payment.Name, value: payment.Uuid }
    })
    const Languageoption = (Languages.list || []).map(language => {
      return { key: language.Uuid, text: language.Name, value: language.Uuid }
    })
    const Documentoption = (Documents.list || []).map(document => {
      return { key: document.Uuid, text: document.Name, value: document.Uuid }
    })
    const Caseoption = (Cases.list || []).map(cases => {
      return { key: cases.Uuid, text: cases.Name, value: cases.Uuid }
    })


    return (
      isLoading || isDispatching ||
        Recordtypes.isLoading || Recordtypes.isDispatching ||
        Courthauses.isLoading || Courthauses.isDispatching ||
        Courts.isLoading || Courts.isDispatching ||
        Definedcompanies.isLoading || Definedcompanies.isDispatching ||
        Definedcostumers.isLoading || Definedcostumers.isDispatching ||
        Kdvs.isLoading || Kdvs.isDispatching ||
        Payments.isLoading || Payments.isDispatching ||
        Languages.isLoading || Languages.isDispatching ||
        Documents.isLoading || Documents.isDispatching ||
        Cases.isLoading || Cases.isDispatching ? <LoadingPage /> :
        <Pagewrapper>
          <Headerwrapper>
            <Headerbredcrump>
              <Link to={"/Orders"}>
                <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{Literals.Page.Pagecreateheader[Profile.Language]}</Breadcrumb.Section>
            </Headerbredcrump>
          </Headerwrapper>
          <Pagedivider />
          <Contentwrapper>
            <Form onSubmit={this.handleSubmit}>
              <Tab className='station-tab m-[1px]'
                panes={[
                  {
                    menuItem: Literals.Columns.orders[Profile.Language],
                    pane: {
                      key: 'save',
                      content: <React.Fragment>
                        <div className='h-[calc(62vh)] overflow-y-auto overflow-x-auto'>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Orderno[Profile.Language]} name="Orderno" />
                            <FormInput placeholder={Literals.Columns.Recordtype[Profile.Language]} value={this.state.selectedRecordtype} options={Recordtypeoption} onChange={(e, data) => { this.setState({ selectedRecordtype: data.value }) }} formtype='dropdown' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Princiblecourthause[Profile.Language]} value={this.state.selectedPrinciblecourthause} options={Courthauseoption} onChange={(e, data) => { this.setState({ selectedPrinciblecourthause: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Princiblecourt[Profile.Language]} value={this.state.selectedPrinciblecourt} options={Courtoption} onChange={(e, data) => { this.setState({ selectedPrinciblecourt: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Princibleno[Profile.Language]} name="Princibleno" />
                            <FormInput placeholder={Literals.Columns.Desicionno[Profile.Language]} name="Desicionno" />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Directivecourthause[Profile.Language]} value={this.state.selectedDirectivecourthause} options={Courthauseoption} onChange={(e, data) => { this.setState({ selectedDirectivecourthause: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Directivecourt[Profile.Language]} value={this.state.selectedDirectivecourt} options={Courtoption} onChange={(e, data) => { this.setState({ selectedDirectivecourt: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Directiveno[Profile.Language]} name="Directiveno" />
                            <FormInput placeholder={Literals.Columns.Directiveinfo[Profile.Language]} name="Directiveinfo" />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Company[Profile.Language]} value={this.state.selectedCompany} options={Definedcompanyoption} onChange={(e, data) => { this.setState({ selectedCompany: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Costumer[Profile.Language]} value={this.state.selectedCostumer} options={Definedcostumeroption} onChange={(e, data) => { this.setState({ selectedCostumer: data.value }) }} formtype='dropdown' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Registerdate[Profile.Language]} name="Registerdate" type='date' />
                            <FormInput placeholder={Literals.Columns.Deliverydate[Profile.Language]} name="Registerdate" type='date' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Prepayment[Profile.Language]} name="Prepayment" type='number' step='0.01' />
                            <FormInput placeholder={Literals.Columns.Notaryexpense[Profile.Language]} name="Notaryexpense" type='number' step='0.01' />
                            <FormInput placeholder={Literals.Columns.Netprice[Profile.Language]} name="Netprice" type='number' step='0.01' />
                            <FormInput placeholder={Literals.Columns.Calculatedprice[Profile.Language]} name="Calculatedprice" type='number' step='0.01' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput placeholder={Literals.Columns.Translator[Profile.Language]} value={this.state.selectedTranslator} options={Translatoroption} onChange={(e, data) => { this.setState({ selectedTranslator: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Kdv[Profile.Language]} value={this.state.selectedKdv} options={Kdvoption} onChange={(e, data) => { this.setState({ selectedKdv: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Payment[Profile.Language]} value={this.state.selectedPayment} options={Paymentoption} onChange={(e, data) => { this.setState({ selectedPayment: data.value }) }} formtype='dropdown' />
                            <FormInput placeholder={Literals.Columns.Case[Profile.Language]} value={this.state.selectedCase} options={Caseoption} onChange={(e, data) => { this.setState({ selectedCase: data.value }) }} formtype='dropdown' />
                          </Form.Group>
                        </div>
                      </React.Fragment>
                    }
                  },
                  {
                    menuItem: Literals.Columns.jobs[Profile.Language],
                    pane: {
                      key: 'design',
                      content: <React.Fragment>
                        <div className='h-[calc(62vh-10px)] overflow-y-auto overflow-x-auto'>
                          <Table celled className='list-table ' key='product-create-type-conversion-table ' >
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell width={1}>{Literals.Columns.Jobcountorder[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Jobno[Profile.Language]} </Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Sourcelanguage[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Targetlanguage[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Document[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{Literals.Columns.Amount[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Price[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Case[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={10}>{Literals.Columns.Info[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={0}>{Literals.Columns.delete[Profile.Language]}</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {this.state.selectedJobs.sort((a, b) => a.Order - b.Order).map((job, index) => {
                                return <Table.Row key={job.key}>
                                  <Table.Cell>
                                    <Button.Group basic size='small'>
                                      <Button type='button' disabled={index === 0} icon='angle up' onClick={() => { this.selectedJobChangeHandler(job.key, 'Order', job.Order - 1) }} />
                                      <Label basic>{job.Order}</Label>
                                      <Button type='button' disabled={index + 1 === this.state.selectedJobs.length} icon='angle down' onClick={() => { this.selectedJobChangeHandler(job.key, 'Order', job.Order + 1) }} />
                                    </Button.Group>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Jobno[Profile.Language]} name="Jobno" fluid value={job.Jobno} onChange={(e) => { this.selectedJobChangeHandler(job.key, 'Jobno', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Field>
                                      <Dropdown placeholder={Literals.Columns.Sourcelanguage[Profile.Language]} name="SourcelanguageID" clearable search fluid selection options={Languageoption} value={job.SourcelanguageID} onChange={(e, data) => { this.selectedJobChangeHandler(job.key, 'SourcelanguageID', data.value) }} />
                                    </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Field>
                                      <Dropdown placeholder={Literals.Columns.Targetlanguage[Profile.Language]} name="TargetlanguageID" clearable search fluid selection options={Languageoption} value={job.TargetlanguageID} onChange={(e, data) => { this.selectedJobChangeHandler(job.key, 'TargetlanguageID', data.value) }} />
                                    </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Field>
                                      <Dropdown placeholder={Literals.Columns.Document[Profile.Language]} name="DocumentID" clearable search fluid selection options={Documentoption} value={job.DocumentID} onChange={(e, data) => { this.selectedJobChangeHandler(job.key, 'DocumentID', data.value) }} />
                                    </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Amount[Profile.Language]} name="Amount" type='number' fluid value={job.Amount} onChange={(e) => { this.selectedJobChangeHandler(job.key, 'Amount', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Price[Profile.Language]} name="Price" type="number" step='0.01' fluid value={job.Price} onChange={(e) => { this.selectedJobChangeHandler(job.key, 'Price', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Field>
                                      <Dropdown placeholder={Literals.Columns.Case[Profile.Language]} name="CaseID" clearable search fluid selection options={Caseoption} value={job.CaseID} onChange={(e, data) => { this.selectedJobChangeHandler(job.key, 'CaseID', data.value) }} />
                                    </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <Form.Input placeholder={Literals.Columns.Info[Profile.Language]} name="Info" fluid value={job.Info} onChange={(e) => { this.selectedJobChangeHandler(job.key, 'Info', e.target.value) }} />
                                  </Table.Cell>
                                  <Table.Cell className='table-last-section'>
                                    <Icon className='type-conversion-remove-icon' link color='red' name='minus circle'
                                      onClick={() => { this.removeJobs(job.key, job.Order) }} />
                                  </Table.Cell>
                                </Table.Row>
                              })}
                            </Table.Body>
                            <Table.Footer>
                              <Table.Row>
                                <Table.HeaderCell colSpan='10'>
                                  <Button type="button" color='green' className='addMoreButton' size='mini' onClick={() => { this.AddNewJob() }}>{Literals.Button.AddJob[Profile.Language]}</Button>
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Footer>
                          </Table>
                        </div>
                      </React.Fragment>
                    }
                  }
                ]}
                renderActiveOnly={false} />
              <Footerwrapper>
                <Link to="/Jobs">
                  <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>{Literals.Button.Create[Profile.Language]}</Button>
              </Footerwrapper>
            </Form>
          </Contentwrapper>
        </Pagewrapper >
    )
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { AddOrders, history, fillOrdernotification, Profile } = this.props
    const jobs = this.state.selectedJobs
    const formData = formToObject(e.target)

    jobs.forEach(data => {
      data.Amount = parseInt(data.Amount)
      data.Price = parseFloat(data.Price)
      delete data.key
    });

    const responseData = {
      Info: Array.isArray(formData.Info) ? formData.Info[0] : formData.Info,
      Orderno: formData.Orderno,
      Princibleno: formData.Princibleno,
      Desicionno: formData.Desicionno,
      Directiveno: formData.Directiveno,
      Directiveinfo: formData.Directiveinfo,
      Registerdate: formData.Registerdate,
      Deliverydate: formData.Deliverydate,
      Prepayment: parseFloat(formData.Prepayment),
      Notaryexpense: parseFloat(formData.Notaryexpense),
      Netprice: parseFloat(formData.Netprice),
      Calculatedprice: parseFloat(formData.Calculatedprice),
      RecordtypeID: this.state.selectedRecordtype,
      PrinciblecourthauseID: this.state.selectedPrinciblecourthause,
      PrinciblecourtID: this.state.selectedPrinciblecourt,
      DirectivecourthauseID: this.state.selectedDirectivecourthause,
      DirectivecourtID: this.state.selectedDirectivecourt,
      CostumerID: this.state.selectedCostumer,
      CompanyID: this.state.selectedCompany,
      TranslatorID: this.state.selectedTranslator,
      KdvID: this.state.selectedKdv,
      PaymentID: this.state.selectedPayment,
      Jobs: jobs
    }

    let errors = []
    responseData.Jobs.forEach(data => {
      if (!validator.isUUID(data.SourcelanguageID)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Sourcelanguagerequired[Profile.Language] })
      }
      if (!validator.isUUID(data.TargetlanguageID)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Targetlanguagerequired[Profile.Language] })
      }
      if (!validator.isUUID(data.DocumentID)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Documentrequired[Profile.Language] })
      }
      if (!validator.isNumber(data.Amount)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Amountrequired[Profile.Language] })
      }
      if (!validator.isNumber(data.Price)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Pricerequired[Profile.Language] })
      }
      if (!validator.isUUID(data.CaseID)) {
        errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Caserequired[Profile.Language] })
      }
    });

    if (!validator.isString(responseData.Orderno)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Companyrequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.RecordtypeID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Purchasepricerequired[Profile.Language] })
    }
    if (!validator.isISODate(responseData.Registerdate)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Companypersonelnamerequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.TranslatorID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Purchasenumberrequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.CaseID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Personelnamerequired[Profile.Language] })
    }
    if (!validator.isArray(responseData.Jobs)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Caserequired[Profile.Language] })
    }

    if (errors.length > 0) {
      errors.forEach(error => {
        fillOrdernotification(error)
      })
    } else {
      await AddOrders({ data: responseData, history })
    }
  }

  AddNewJob = () => {
    this.setState({
      selectedJobs: [...this.state.selectedJobs,
      {
        OrderID: '',
        Jobno: '',
        SourcelanguageID: '',
        TargetlanguageID: '',
        DocumentID: '',
        Amount: 0,
        Price: 0,
        CaseID: '',
        Info: '',
        key: Math.random(),
        Order: this.state.selectedJobs.length,
      }]
    })
  }

  removeJobs = (key, order) => {
    let jobs = this.state.selectedJobs.filter(jobroute => jobroute.key !== key)
    jobs.filter(job => job.Order > order).forEach(job => job.Order--)
    this.setState({ selectedJobs: jobs })
  }

  selectedJobChangeHandler = (key, property, value) => {
    let jobRoutes = this.state.selectedJobs
    const index = jobRoutes.findIndex(jobroute => jobroute.key === key)
    if (property === 'Order') {
      jobRoutes.filter(jobroute => jobroute.Order === value)
        .forEach((jobroute) => jobroute.Order = jobRoutes[index].Order > value ? jobroute.Order + 1 : jobroute.Order - 1)
    }
    jobRoutes[index][property] = value
    this.setState({ selectedJobs: jobRoutes })
  }

}


