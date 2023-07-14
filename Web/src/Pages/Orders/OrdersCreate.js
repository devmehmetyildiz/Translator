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
import LanguagesCreate from '../../Containers/Languages/LanguagesCreate'
import { FormContext } from '../../Provider/FormProvider'
import DocumentsCreate from '../../Containers/Documents/DocumentsCreate'
import CasesCreate from '../../Containers/Cases/CasesCreate'
import RecordtypesCreate from '../../Containers/Recordtypes/RecordtypesCreate'
import CourthausesCreate from '../../Containers/Courthauses/CourthausesCreate'
import CourtsCreate from '../../Containers/Courts/CourtsCreate'
import DefinedcompaniesCreate from '../../Containers/Definedcompanies/DefinedcompaniesCreate'
import DefinedcostumersCreate from '../../Containers/Definedcostumers/DefinedcostumersCreate'
import PaymentsCreate from '../../Containers/Payments/PaymentsCreate'
import KdvsCreate from '../../Containers/Kdvs/KdvsCreate'
import TranslatorsCreate from '../../Containers/Translators/TranslatorsCreate'
import CasesEdit from '../../Containers/Cases/CasesEdit'
import DocumentsEdit from '../../Containers/Documents/DocumentsEdit'
import LanguagesEdit from '../../Containers/Languages/LanguagesEdit'
import PaymentsEdit from '../../Containers/Payments/PaymentsEdit'
import KdvsEdit from '../../Containers/Kdvs/KdvsEdit'
import TranslatorsEdit from '../../Containers/Translators/TranslatorsEdit'
import DefinedcompaniesEdit from '../../Containers/Definedcompanies/DefinedcompaniesEdit'
import DefinedcostumersEdit from '../../Containers/Definedcostumers/DefinedcostumersEdit'
import CourtsEdit from '../../Containers/Courts/CourtsEdit'
import CourthausesEdit from '../../Containers/Courthauses/CourthausesEdit'
import RecordtypesEdit from '../../Containers/Recordtypes/RecordtypesEdit'
import LanguageCalculate from './LanguageCalculate'
export default class OrdersCreate extends Component {

  PAGE_NAME = 'OrdersCreate'

  constructor(props) {
    super(props)
    this.state = {
      selectedJobs: [],
      modelOpened: false,
      editModalopen: false,
      selectedModal: null
    }
  }

  componentDidMount() {
    const { GetRecordtypes, GetCourthauses, GetCourts, GetDefinedcostumers,
      GetDefinedcompanies, GetTranslators, GetKdvs, GetPayments, GetLanguages,
      GetDocuments, GetCases, GetLanguageconfig } = this.props
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
    GetLanguageconfig()
    if (this.context.formstates[`${this.PAGE_NAME}/Jobs`]) {
      this.setState({ selectedJobs: this.context.formstates[`${this.PAGE_NAME}/Jobs`] })
    }
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
    Notification(Orders.notifications, removeOrdernotification, this.context.clearForm)
    Notification(Recordtypes.notifications, removeRecordtypenotification, this.context.clearForm)
    Notification(Courthauses.notifications, removeCourthausenotification, this.context.clearForm)
    Notification(Courts.notifications, removeCourtnotification, this.context.clearForm)
    Notification(Definedcostumers.notifications, removeDefinedcostumernotification, this.context.clearForm)
    Notification(Definedcompanies.notifications, removeDefinedcompanynotification, this.context.clearForm)
    Notification(Translators.notifications, removeTranslatornotification, this.context.clearForm)
    Notification(Kdvs.notifications, removeKdvnotification, this.context.clearForm)
    Notification(Payments.notifications, removePaymentnotification, this.context.clearForm)
    Notification(Languages.notifications, removeLanguagenotification, this.context.clearForm)
    Notification(Documents.notifications, removeDocumentnotification, this.context.clearForm)
    Notification(Cases.notifications, removeCasenotification, this.context.clearForm)

  }

  render() {

    const { Orders, Recordtypes, Courthauses, Courts, Definedcompanies, history,
      Definedcostumers, Translators, Kdvs, Payments, Languages, Documents, Cases, Profile
    } = this.props
    const { isLoading, isDispatching } = Orders

    const addModal = (content) => {
      return <Modal
        onClose={() => { this.setState({ modelOpened: false }) }}
        onOpen={() => { this.setState({ modelOpened: true }) }}
        trigger={<Icon link name='plus' />}
        content={content}
      />
    }

    const optionContainer = (Name, content) => {
      return <div className='flex flex-row group items-center justify-between'>
        {Name}
        <div className='invisible group-hover:visible opacity-0 group-hover:delay-1000 group-hover:opacity-100 transition-all ease-in-out duration-1000'
          onClick={() => {
            this.setState({
              selectedModal: content,
              editModalopen: true
            })
          }}>
          <Icon
            name="edit"
            color='blue'
            size='small'
          />
        </div>
      </div>
    }


    const Recordtypeoption = (Recordtypes.list || []).map(recordtype => {
      return { key: recordtype.Uuid, text: optionContainer(recordtype.Name, <RecordtypesEdit RecordtypeID={recordtype.Uuid} />), value: recordtype.Uuid }
    })
    const Courthauseoption = (Courthauses.list || []).map(courthause => {
      return { key: courthause.Uuid, text: optionContainer(courthause.Name, <CourthausesEdit CourthauseID={courthause.Uuid} />), value: courthause.Uuid }
    })
    const Courtoption = (Courts.list || []).map(court => {
      return { key: court.Uuid, text: optionContainer(court.Name, <CourtsEdit CourtID={court.Uuid} />), value: court.Uuid }
    })
    const Definedcompanyoption = (Definedcompanies.list || []).map(definecompany => {
      return { key: definecompany.Uuid, text: optionContainer(definecompany.Name, <DefinedcompaniesEdit DefinedcompanyID={definecompany.Uuid} />), value: definecompany.Uuid }
    })
    const Definedcostumeroption = (Definedcostumers.list || []).map(definedcostumer => {
      return { key: definedcostumer.Uuid, text: optionContainer(definedcostumer.Name, <DefinedcostumersEdit DefinedcostumerID={definedcostumer.Uuid} />), value: definedcostumer.Uuid }
    })
    const Translatoroption = (Translators.list || []).map(translator => {
      return { key: translator.Uuid, text: optionContainer(translator.Name, <TranslatorsEdit TranslatorID={translator.Uuid} />), value: translator.Uuid }
    })
    const Kdvoption = (Kdvs.list || []).map(kdv => {
      return { key: kdv.Uuid, text: optionContainer(kdv.Name, <KdvsEdit PaymentID={kdv.Uuid} />), value: kdv.Uuid }
    })
    const Paymentoption = (Payments.list || []).map(payment => {
      return { key: payment.Uuid, text: optionContainer(payment.Name, <PaymentsEdit PaymentID={payment.Uuid} />), value: payment.Uuid }
    })
    const Languageoption = (Languages.list || []).map(language => {
      return { key: language.Uuid, text: optionContainer(language.Name, <LanguagesEdit LanguageID={language.Uuid} />), value: language.Uuid }
    })
    const Documentoption = (Documents.list || []).map(document => {
      return { key: document.Uuid, text: optionContainer(document.Name, <DocumentsEdit DocumentID={document.Uuid} />), value: document.Uuid }
    })
    const Caseoption = (Cases.list || []).map(cases => {
      return { key: cases.Uuid, text: optionContainer(cases.Name, <CasesEdit CaseID={cases.Uuid} />), value: cases.Uuid }
    })

    const formLoading = Recordtypes.isLoading || Recordtypes.isDispatching ||
      Courthauses.isLoading || Courthauses.isDispatching ||
      Courts.isLoading || Courts.isDispatching ||
      Definedcompanies.isLoading || Definedcompanies.isDispatching ||
      Definedcostumers.isLoading || Definedcostumers.isDispatching ||
      Payments.isLoading || Payments.isDispatching ||
      Languages.isLoading || Languages.isDispatching ||
      Documents.isLoading || Documents.isDispatching ||
      Cases.isLoading || Cases.isDispatching ||
      Kdvs.isLoading || Kdvs.isDispatching

    return (
      isLoading || isDispatching
        ? <LoadingPage /> :
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
            <Form loading={formLoading} onSubmit={this.handleSubmit}>
              <Tab className='station-tab '
                panes={[
                  {
                    menuItem: Literals.Columns.orders[Profile.Language],
                    pane: {
                      key: 'save',
                      content: <React.Fragment>
                        <div className='h-[calc(60vh)] overflow-y-auto overflow-x-hidden p-2'>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Orderno[Profile.Language]} name="Orderno" />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Recordtype[Profile.Language]} name="RecordtypeID" options={Recordtypeoption} formtype='dropdown' modal={addModal(<RecordtypesCreate />)} />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Princiblecourthause[Profile.Language]} name="PrinciblecourthauseID" options={Courthauseoption} formtype='dropdown' modal={addModal(<CourthausesCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Princiblecourt[Profile.Language]} name="PrinciblecourtID" options={Courtoption} formtype='dropdown' modal={addModal(<CourtsCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Princibleno[Profile.Language]} name="Princibleno" />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Desicionno[Profile.Language]} name="Desicionno" />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Directivecourthause[Profile.Language]} name="DirectivecourthauseID" options={Courthauseoption} formtype='dropdown' modal={addModal(<CourthausesCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Directivecourt[Profile.Language]} name="DirectivecourtID" options={Courtoption} formtype='dropdown' modal={addModal(<CourtsCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Directiveno[Profile.Language]} name="Directiveno" />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Directiveinfo[Profile.Language]} name="Directiveinfo" />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Company[Profile.Language]} name="CompanyID" options={Definedcompanyoption} formtype='dropdown' modal={addModal(<DefinedcompaniesCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Costumer[Profile.Language]} name="CostumerID" options={Definedcostumeroption} formtype='dropdown' modal={addModal(<DefinedcostumersCreate />)} />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Registerdate[Profile.Language]} name="Registerdate" type='date' />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Deliverydate[Profile.Language]} name="Deliverydate" type='date' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Prepayment[Profile.Language]} name="Prepayment" type='number' step='0.01' />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Notaryexpense[Profile.Language]} name="Notaryexpense" type='number' step='0.01' />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Netprice[Profile.Language]} name="Netprice" type='number' step='0.01' />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Calculatedprice[Profile.Language]} name="Calculatedprice" type='number' step='0.01' />
                          </Form.Group>
                          <Form.Group widths={'equal'}>
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Translator[Profile.Language]} name="TranslatorID" options={Translatoroption} formtype='dropdown' modal={addModal(<TranslatorsCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Kdv[Profile.Language]} name="KdvID" options={Kdvoption} formtype='dropdown' modal={addModal(<KdvsCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Payment[Profile.Language]} name="PaymentID" options={Paymentoption} formtype='dropdown' modal={addModal(<PaymentsCreate />)} />
                            <FormInput page={this.PAGE_NAME} placeholder={Literals.Columns.Case[Profile.Language]} name="CaseID" options={Caseoption} formtype='dropdown' modal={addModal(<CasesCreate />)} />
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
                        <div className='h-[calc(60vh)] overflow-y-auto overflow-x-auto'>
                          <Table celled className='list-table ' key='product-create-type-conversion-table p-2' >
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell width={1}>{Literals.Columns.Jobcountorder[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Jobno[Profile.Language]} </Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Sourcelanguage[Profile.Language]}{addModal(<LanguagesCreate />)}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Targetlanguage[Profile.Language]}{addModal(<LanguagesCreate />)}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Document[Profile.Language]} {addModal(<DocumentsCreate />)}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{Literals.Columns.Amount[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Price[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{Literals.Columns.Case[Profile.Language]}{addModal(<CasesCreate />)} </Table.HeaderCell>
                                <Table.HeaderCell width={10}>{Literals.Columns.Info[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{Literals.Columns.calculate[Profile.Language]}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{Literals.Columns.delete[Profile.Language]}</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {this.state.selectedJobs.sort((a, b) => a.Order - b.Order).map((job, index) => {
                                return <Table.Row key={job.key}>
                                  <Table.Cell>
                                    <Button.Group basic size='small'>
                                      <Button type='button' disabled={index === 0} icon='angle up' onClick={() => { this.selectedJobChangeHandler(job.key, 'Order', job.Order - 1) }} />
                                      <Label basic>{job.Order+1}</Label>
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
                                  <Table.Cell>
                                    <LanguageCalculate
                                      Key={job.key}
                                      Jobs={this.state.selectedJobs}
                                      updateJobs={(data) => { this.setState({ selectedJobs: data }) }}
                                      Profile={Profile}
                                      Languages={Languages}
                                      context={this.context.formstates}
                                    />
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
                                <Table.HeaderCell colSpan='11'>
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
                <Form.Group widths={'equal'}>
                  {history && <Link to="/Jobs">
                    <Button floated="left" color='grey'>{Literals.Button.Goback[Profile.Language]}</Button>
                  </Link>}
                  <Button floated="right" type="button" color='grey' onClick={(e) => {
                    this.setState({ selectedJobs: [] })
                    this.context.clearForm(this.PAGE_NAME)
                  }}>{Literals.Button.Clear[Profile.Language]}</Button>
                </Form.Group>
                <Button floated="right" type='submit' color='blue'>{Literals.Button.Create[Profile.Language]}</Button>
              </Footerwrapper>
            </Form>
          </Contentwrapper>
          <Modal
            open={this.state.editModalopen}
            onClose={() => { this.setState({ editModalopen: false }) }}
            onOpen={() => { this.setState({ editModalopen: true }) }}
            trigger={<div className='invisible group-hover:visible opacity-0 group-hover:delay-1000 group-hover:opacity-100 transition-all ease-in-out duration-1000'
            >
              <Icon
                name="edit"
                color='blue'
                size='small'
              />
            </div>}
            content={<div>
              {this.state.selectedModal}
            </div>}
          />
        </Pagewrapper >
    )
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { modelOpened, editModalopen } = this.state
    if (modelOpened || editModalopen) {
      return
    }
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
      RecordtypeID: this.context.formstates[`${this.PAGE_NAME}/RecordtypeID`],
      PrinciblecourthauseID: this.context.formstates[`${this.PAGE_NAME}/PrinciblecourthauseID`],
      PrinciblecourtID: this.context.formstates[`${this.PAGE_NAME}/PrinciblecourtID`],
      DirectivecourthauseID: this.context.formstates[`${this.PAGE_NAME}/DirectivecourthauseID`],
      DirectivecourtID: this.context.formstates[`${this.PAGE_NAME}/DirectivecourtID`],
      CostumerID: this.context.formstates[`${this.PAGE_NAME}/CostumerID`],
      CompanyID: this.context.formstates[`${this.PAGE_NAME}/CompanyID`],
      TranslatorID: this.context.formstates[`${this.PAGE_NAME}/TranslatorID`],
      KdvID: this.context.formstates[`${this.PAGE_NAME}/KdvID`],
      PaymentID: this.context.formstates[`${this.PAGE_NAME}/PaymentID`],
      CaseID: this.context.formstates[`${this.PAGE_NAME}/CaseID`],
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
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Ordernorequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.RecordtypeID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Recordtyperequired[Profile.Language] })
    }
    if (!validator.isISODate(responseData.Registerdate)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Registerdaterequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.TranslatorID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Translatorrequired[Profile.Language] })
    }
    if (!validator.isUUID(responseData.CaseID)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Caserequired[Profile.Language] })
    }
    if (!validator.isArray(responseData.Jobs)) {
      errors.push({ type: 'Error', code: Literals.Page.Pageheader[Profile.Language], description: Literals.Messages.Jobsrequired[Profile.Language] })
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
        Wordcount: 0,
        Linecount: 0,
        Charcount: 0,
        Calculatedamount: 0,
        Preferredprice: 0,
        Calculatedprice: 0,
        Order: this.state.selectedJobs.length,
      }]
    }, () => {
      this.context.setFormstates({ ...this.context.formstates, [`${this.PAGE_NAME}/Jobs`]: this.state.selectedJobs })
    })
  }

  removeJobs = (key, order) => {
    let jobs = this.state.selectedJobs.filter(jobroute => jobroute.key !== key)
    jobs.filter(job => job.Order > order).forEach(job => job.Order--)
    this.setState({ selectedJobs: jobs }, () => {
      this.context.setFormstates({ ...this.context.formstates, [`${this.PAGE_NAME}/Jobs`]: this.state.selectedJobs })
    })
  }

  selectedJobChangeHandler = (key, property, value) => {
    let jobRoutes = this.state.selectedJobs
    const index = jobRoutes.findIndex(jobroute => jobroute.key === key)
    if (property === 'Order') {
      jobRoutes.filter(jobroute => jobroute.Order === value)
        .forEach((jobroute) => jobroute.Order = jobRoutes[index].Order > value ? jobroute.Order + 1 : jobroute.Order - 1)
    }
    jobRoutes[index][property] = value
    this.setState({ selectedJobs: jobRoutes }, () => {
      this.context.setFormstates({ ...this.context.formstates, [`${this.PAGE_NAME}/Jobs`]: this.state.selectedJobs })
    })
  }
}
OrdersCreate.contextType = FormContext