import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'

export class LoadingPage extends Component {
    render() {

        const { style } = this.props

        return (
            <div className='w-full h-[calc(100vh-59px-2rem)] flex justify-center items-center ' style={style}>
                <Loader size='large' active inline='centered' >Yükleniyor...</Loader>
            </div >
        )
    }
}
export default LoadingPage