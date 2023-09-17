import React, { Component } from 'react'
import LoadingPage from '../../Utils/LoadingPage'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import { Breadcrumb, Form, Grid, GridColumn, Header, Icon, Label, Segment, Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Literals from './Literals'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import RoundProgressBar from '../../Utils/RoundProgressBar'
import validator from '../../Utils/Validator'
import { Collapse } from 'react-collapse'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
export default class Flowreports extends Component {

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
      recordtypeID: ''
    }
  }

  componentDidMount() {
    const { GetOrdersforchart, GetRecordtypes, GetGoals, location, GetOrdercountbydate, GetOrdercountwithjob, GetPriceexpence, GetPricenet,
      GetPricepotancial, GetPricereal } = this.props
    const search = new URLSearchParams(location.search)
    const recordTypeUuid = search.get('recordType') ? search.get('recordType') : ''
    let params = {
      Startdate: this.state.startDate,
      Enddate: this.state.endDate
    }
    validator.isUUID(recordTypeUuid) && (params.RecordtypeID = recordTypeUuid)
    GetRecordtypes()
    GetGoals()
    GetOrdercountbydate(params)
    GetOrdercountwithjob(params)
    GetPriceexpence(params)
    GetPricenet(params)
    GetPricepotancial(params)
    GetPricereal(params)
    GetOrdersforchart(params)
    this.setState({ recordtypeID: recordTypeUuid })
  }

  componentDidUpdate(_, prevStates) {
    const { location, GetOrdercountbydate, GetOrdercountwithjob, GetPriceexpence, GetPricenet,
      GetPricepotancial, GetOrdersforchart, GetPricereal } = this.props
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
      GetOrdercountbydate(params)
      GetOrdercountwithjob(params)
      GetPriceexpence(params)
      GetPricenet(params)
      GetPricepotancial(params)
      GetPricereal(params)
      GetOrdersforchart(params)
      this.setState({ recordtypeID: recordTypeUuid })
    }
  }

  render() {

    const { Profile, Recordtypes, location, history, Flows, Goals } = this.props

    const search = new URLSearchParams(location.search)
    const recordTypeUuid = search.get('recordType') ? search.get('recordType') : ''

    const { Chartdatas, Pricenet, Pricepotancial, Priceexpence, Pricereal, Ordercount, Jobcount } = Flows
    const labels = [
      [
        { name: "Potansiyel ", value: `${Pricepotancial} ₺` },
        { name: "Net ", value: `${Pricenet} ₺` },
      ],
      [
        { name: "Gerçek ", value: `${Pricereal} ₺` },
        { name: "Toplam Gider", value: `${Priceexpence} ₺` },
      ],
      [
        { name: "Müşteri Sayısı", value: `${Ordercount}` },
        { name: "Dosya Sayısı", value: `${Jobcount}` },
      ],
    ]

    const Recordtypeslist = [{ name: Literals.Columns.General[Profile.Language], Uuid: '' }].concat((Recordtypes.list || []).map(u => { return { name: u.Name, Uuid: u.Uuid } }))
    let Goal;

    (Recordtypes.list || []).forEach(element => {
      if (validator.isUUID(recordTypeUuid) && recordTypeUuid === element.Uuid) {
        Goal = (Goals.list || []).find(u => u.Uuid === element.GoalID)
      }
    });
    if (!Goal) {
      Goal = (Goals.list || []).find(u => u.Isgeneralgoal)
    }

    let percentage = 0
    if (Goal && validator.isNumber(Goal.Goal) && validator.isNumber(Pricepotancial)) {
      percentage = Pricepotancial >= Goal.Goal ? 100 : ((Pricepotancial / Goal.Goal) * 100)
      percentage = (Math.round(percentage * 100) / 100).toFixed(2);
    }

    const categories = (Chartdatas || []).map(u => { return u.Deliverydate })
    const calculatedprices = (Chartdatas || []).map(u => { return u.Calculatedprice })
    const netprices = (Chartdatas || []).map(u => { return u.Netprice })
    const options = {
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
      series: [
        {
          name: 'Potansiyel Kazançlar',
          data: calculatedprices,
        },
        {
          name: 'Net Kazançlar',
          data: netprices,
        },
      ],
    };

    return (
      Recordtypes.isLoading ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
            <Grid stackable columns='2' >
                <GridColumn width={8}>
                  <Breadcrumb size='big'>
                    <Link to={"/Flowreports"} >
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
                            onClick={() => { validator.isUUID(recordtype.Uuid) ? history.push(`/Flowreports?recordType=${recordtype.Uuid}`) : history.push('/Flowreports') }}> {recordtype.name}
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
              <Tab className='station-tab h-auto'
                panes={[
                  {
                    menuItem: Literals.Columns.Generalpage[Profile.Language],
                    pane: {
                      key: 'general',
                      content: <Grid stackable columns={4}>
                        <GridColumn>
                          <RoundProgressBar title={'Aylık Hedef'} percentage={percentage} />
                        </GridColumn>
                        {labels.map(segmentvalues => {
                          return <GridColumn key={Math.random()}>
                            <div className='h-full flex justify-between flex-col '>
                              {segmentvalues.map(segmentvalue => {
                                return <div className='my-auto' key={Math.random()}>
                                  <Segment>
                                    <div className=' flex-wrap flex flex-row justify-between items-center'>
                                      <Header icon>
                                        <Icon name='world' />
                                        {segmentvalue.name}
                                      </Header>
                                      <div className='flex justify-center items-center h-full'>
                                        <Label size='huge' color='blue'>  {segmentvalue.value}</Label>
                                      </div>
                                    </div>
                                  </Segment>
                                </div>
                              })}
                            </div>
                          </GridColumn>
                        })}
                      </Grid>
                    }
                  },
                  {
                    menuItem: Literals.Columns.Chartpage[Profile.Language],
                    pane: {
                      key: 'chart',
                      content: <HighchartsReact highcharts={Highcharts} options={options} />
                    }
                  },]}
                renderActiveOnly={false} />

            </Contentwrapper>
          </Pagewrapper >
        </React.Fragment >
    )
  }
}
