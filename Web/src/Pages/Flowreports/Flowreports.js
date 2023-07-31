import React, { Component } from 'react'
import LoadingPage from '../../Utils/LoadingPage'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import { Breadcrumb, Form, Grid, GridColumn, GridRow, Header, Icon, Label, Segment, Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Literals from './Literals'
import Contentwrapper from '../../Common/Wrappers/Contentwrapper'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import RoundProgressBar from '../../Utils/RoundProgressBar'

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
      endDate: formattedendDate
    }
  }

  componentDidMount() {
    const { GetRecordtypes } = this.props
    GetRecordtypes()
  }

  render() {

    const { Profile, Recordtypes } = this.props

    const labels = [
      [
        { name: "Potansiyel ", value: "10000TL" },
        { name: "Net ", value: "10000TL" },
      ],
      [
        { name: "Gerçek ", value: "10000TL" },
        { name: "Toplam Gider", value: "10000TL" },
      ],
      [
        { name: "Müşteri Sayısı", value: "10000TL" },
        { name: "Dosya Sayısı", value: "10000TL" },
      ],
    ]

    return (
      Recordtypes.isLoading ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
              <Grid columns='2' >
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
              <Form>
                <Form.Group widths={'equal'}>
                  {Recordtypes.list.map((recordtype, index) => {
                    return <Label key={index} className='cursor-pointer' >{recordtype.Name}</Label>
                  })}
                </Form.Group>
              </Form>
              <Pagedivider />
              <Form>
                <Form.Group widths={'equal'}>
                  <Form.Input label={Literals.Columns.Startdate[Profile.Language]} type='date' value={this.state.startDate} />
                  <Form.Input label={Literals.Columns.Enddate[Profile.Language]} type='date' value={this.state.endDate} />
                </Form.Group>
              </Form>
            </Contentwrapper>
            <Contentwrapper>
              <Tab className='station-tab '
                panes={[
                  {
                    menuItem: Literals.Columns.General[Profile.Language],
                    pane: {
                      key: 'save',
                      content: <Grid stackable columns={4}>
                        <GridColumn>
                          <RoundProgressBar title={'Aylık Hedef'} percentage={75} />
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
                                        <Label color='blue'>  {segmentvalue.value}</Label>
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
                  },]}
                renderActiveOnly={false} />

            </Contentwrapper>
          </Pagewrapper >
        </React.Fragment >
    )
  }
}
