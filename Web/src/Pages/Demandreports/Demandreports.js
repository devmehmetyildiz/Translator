import React, { Component } from 'react'
import LoadingPage from '../../Utils/LoadingPage'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import { Breadcrumb, Form, Grid, GridColumn, Label, Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Literals from './Literals'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import validator from '../../Utils/Validator'
import { Collapse } from 'react-collapse'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import DataTable from '../../Utils/DataTable'
import NoDataScreen from './../../Utils/NoDataScreen';
export default class Demandreports extends Component {

  constructor(props) {
    super(props)

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const startmonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const endmonth = String(currentDate.getMonth() + 2).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedstartDate = `${year}-${startmonth}-${day}`;
    const formattedendDate = `${year}-${endmonth}-${day}`;

    this.state = {
      startDate: formattedstartDate,
      endDate: formattedendDate,
      isSearchopened: true,
      recordtypeID: '',
      selectedLanguage: '',
      selectedDocument: ''
    }
  }

  componentDidMount() {
    const { Getjobpricewithdocumentlanguage, GetRecordtypes, location, GetLanguages, GetDocuments } = this.props
    const search = new URLSearchParams(location.search)
    const recordTypeUuid = search.get('recordType') ? search.get('recordType') : ''
    let params = {
      Startdate: this.state.startDate,
      Enddate: this.state.endDate
    }
    validator.isUUID(recordTypeUuid) && (params.RecordtypeID = recordTypeUuid)
    GetRecordtypes()
    GetLanguages()
    GetDocuments()
    Getjobpricewithdocumentlanguage(params)
    this.setState({ recordtypeID: recordTypeUuid })
  }

  componentDidUpdate(_, prevStates) {
    const { location, Getjobpricewithdocumentlanguage } = this.props
    const search = new URLSearchParams(location.search)
    const recordTypeUuid = search.get('recordType') ? search.get('recordType') : ''
    if ((prevStates.startDate !== this.state.startDate) ||
      (prevStates.endDate !== this.state.endDate) ||
      prevStates.recordtypeID !== recordTypeUuid) {
      let params = {
        Startdate: this.state.startDate,
        Enddate: this.state.endDate
      }
      validator.isUUID(recordTypeUuid) && (params.RecordtypeID = recordTypeUuid)
      Getjobpricewithdocumentlanguage(params)
      this.setState({ recordtypeID: recordTypeUuid })
    }
  }

  render() {

    const { Profile, Recordtypes, location, history, Flows, Languages, Documents } = this.props

    const search = new URLSearchParams(location.search)
    const recordTypeUuid = search.get('recordType') ? search.get('recordType') : ''

    const { Demanddatas } = Flows
    const Recordtypeslist = [{ name: Literals.Columns.General[Profile.Language], Uuid: '' }].concat((Recordtypes.list || []).map(u => { return { name: u.Name, Uuid: u.Uuid } }))

    const Columns = [
      { Header: Literals.Columns.Name[Profile.Language], accessor: 'Name', sortable: true, canGroupBy: false, canFilter: true, },
      { Header: Literals.Columns.Price[Profile.Language], accessor: 'Price', sortable: true, canGroupBy: false, canFilter: true, },
      { Header: Literals.Columns.Count[Profile.Language], accessor: 'Count', sortable: true, canGroupBy: false, canFilter: true },
    ]

    const LanguageHeaders = Object.keys(Demanddatas.Languages).map(u => { return Languages.list.find(key => key.Uuid === u) })
    const DocumentHeaders = Object.keys(Demanddatas.Documents).map(u => { return Documents.list.find(key => key.Uuid === u) })
    let Languagegriddata = []
    Object.keys(Demanddatas.Languages).forEach(data => {
      Languagegriddata.push({
        Name: Languages.list.find(u => u.Uuid === data)?.Name,
        Price: (Demanddatas.Languages[data] || []).filter(u => u.Count > 0).map(u => { return u.Price }).reduce((total, num) => { return (total + num) }),
        Count: (Demanddatas.Languages[data] || []).filter(u => u.Count > 0).map(u => { return u.Count }).reduce((total, num) => { return (total + num) })
      })
    })
    let Documentgriddata = []
    Object.keys(Demanddatas.Documents).forEach(data => {
      Documentgriddata.push({
        Name: Documents.list.find(u => u.Uuid === data)?.Name,
        Price: (Demanddatas.Documents[data] || []).filter(u => u.Count > 0).map(u => { return u.Price }).reduce((total, num) => { return (total + num) }),
        Count: (Demanddatas.Documents[data] || []).filter(u => u.Count > 0).map(u => { return u.Count }).reduce((total, num) => { return (total + num) })
      })
    })

    const categories = this.createDateArray(this.state.startDate, this.state.endDate)
    const Languagechartoptions = {
      chart: {
        type: 'line',
        zoomType: 'x'
      },
      title: {
        text: 'Kazanç Grafiği',
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Değerler',
        },
      },
      series: Object.keys(Demanddatas.Languages).map(languagechartdata => {
        return {
          name: (Languages.list || []).find(u => u.Uuid === languagechartdata)?.Name,
          data: (Demanddatas.Languages[languagechartdata] || []).map(languagedata => {
            return languagedata.Price
          })
        }
      })
    };
    const Documentchartoptions = {
      chart: {
        type: 'line',
        zoomType: 'x'
      },
      title: {
        text: 'Kazanç Grafiği',
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Değerler',
        },
      },
      series: Object.keys(Demanddatas.Documents).map(documentchartdata => {
        return {
          name: (Documents.list || []).find(u => u.Uuid === documentchartdata)?.Name,
          data: (Demanddatas.Documents[documentchartdata] || []).map(documentdata => {
            return documentdata.Price
          })
        }
      })
    };

    return (
      Recordtypes.isLoading ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
              <Grid stackable columns='2' >
                <GridColumn width={8}>
                  <Breadcrumb size='big'>
                    <Link to={"/Demandreports"} >
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
              </Grid>
            </Headerwrapper>
            <Pagedivider />
            <Contentwrapper>
              {!this.state.isSearchopened &&
                <div className='w-full flex justify-end items-center'>
                  <div className='cursor-pointer' onClick={() => { this.setState({ isSearchopened: !this.state.isSearchopened }) }}>
                    <IoIosArrowDown className='text-md  text-TextColor ' />
                  </div>
                </div>
              }
              <Collapse isOpened={this.state.isSearchopened}>
                <Form>
                  <Form.Group widths={'equal'}>
                    <div className='w-full flex flex-row justify-between items-center'>
                      <div>
                        {Recordtypeslist.map((recordtype, index) => {
                          return <Label key={index}
                            color={validator.isString(recordTypeUuid) ? ((recordtype.Uuid === recordTypeUuid) ? 'blue' : 'grey') : (validator.isString(recordtype.Uuid) ? 'grey' : 'blue')}
                            className='cursor-pointer'
                            onClick={() => { validator.isUUID(recordtype.Uuid) ? history.push(`/Demandreports?recordType=${recordtype.Uuid}`) : history.push('/Demandreports') }}> {recordtype.name}
                          </Label>
                        })}
                      </div>
                      <div className={`cursor-pointer ${!this.state.isSearchopened && 'hidden'}`} onClick={() => { this.setState({ isSearchopened: !this.state.isSearchopened }) }}>
                        <IoIosArrowUp className='text-md mr-4 text-TextColor ' />
                      </div>
                    </div>
                  </Form.Group>
                </Form>
                <Pagedivider />
                <Form>
                  <Form.Group widths={'equal'}>
                    <Form.Input label={Literals.Columns.Startdate[Profile.Language]} onChange={(e) => { this.setState({ startDate: e.target.value }) }} type='date' value={this.state.startDate} />
                    <Form.Input label={Literals.Columns.Enddate[Profile.Language]} onChange={(e) => { this.setState({ endDate: e.target.value }) }} type='date' value={this.state.endDate} />
                  </Form.Group>
                </Form>
              </Collapse>
            </Contentwrapper>
            <Pagedivider />
            <Contentwrapper>
              <Tab className='station-tab h-[58vh]'
                panes={[
                  {
                    menuItem: Literals.Columns.Documentpage[Profile.Language],
                    pane: {
                      key: 'general',
                      content: Object.keys(Demanddatas.Documents).length > 0 ? <div className=' h-[52vh]'>
                        <Grid columns={2} divided>
                          <GridColumn>
                            <HighchartsReact highcharts={Highcharts} options={Documentchartoptions} />
                          </GridColumn>
                          <GridColumn>
                            <DataTable Columns={Columns} Data={Documentgriddata.sort((a, b) => b.Price - a.Price)} />
                          </GridColumn>
                        </Grid>
                      </div> : <NoDataScreen message={Literals.Messages.Nodocumentfind[Profile.Language]} style={{ height: '50vh' }} />
                    }
                  },
                  {
                    menuItem: Literals.Columns.Languagepage[Profile.Language],
                    pane: {
                      key: 'chart',
                      content: Object.keys(Demanddatas.Documents).length > 0 ? <div className=' h-[52vh]'>
                        <Grid columns={2} divided>
                          <GridColumn>
                            <HighchartsReact highcharts={Highcharts} options={Languagechartoptions} />
                          </GridColumn>
                          <GridColumn>
                            <DataTable Columns={Columns} Data={Languagegriddata.sort((a, b) => b.Price - a.Price)} />
                          </GridColumn>
                        </Grid>
                      </div> : <NoDataScreen message={Literals.Messages.Nolanguagefind[Profile.Language]} style={{ height: '50vh' }} />
                    }
                  },]}
                renderActiveOnly={false} />

            </Contentwrapper>
          </Pagewrapper >
        </React.Fragment >
    )
  }

  createDateArray = (startDate, endDate) => {
    const priceAndDateArray = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      priceAndDateArray.push(
        this.formatDate(currentDate),
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return priceAndDateArray;
  }

  formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
