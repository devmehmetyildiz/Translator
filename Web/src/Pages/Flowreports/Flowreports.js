import React, { Component } from 'react'
import LoadingPage from '../../Utils/LoadingPage'
import Pagewrapper from '../../Common/Wrappers/Pagewrapper'
import Headerwrapper from '../../Common/Wrappers/Headerwrapper'
import { Breadcrumb, Grid, GridColumn } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Pagedivider from '../../Common/Styled/Pagedivider'
import Literals from './Literals'

export default class Flowreports extends Component {
  render() {

    const { Profile } = this.props

    return (
      false ? <LoadingPage /> :
        <React.Fragment>
          <Pagewrapper>
            <Headerwrapper>
              <Grid columns='2' >
                <GridColumn width={8}>
                  <Breadcrumb size='big'>
                    <Link to={"/Cases"} >
                      <Breadcrumb.Section>{Literals.Page.Pageheader[Profile.Language]}</Breadcrumb.Section>
                    </Link>
                  </Breadcrumb>
                </GridColumn>
              </Grid>
            </Headerwrapper>
            <Pagedivider />
          </Pagewrapper >
        </React.Fragment >
    )
  }
}
