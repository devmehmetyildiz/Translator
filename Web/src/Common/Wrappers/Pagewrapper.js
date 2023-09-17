import React from 'react'
import { connect } from 'react-redux'

export function Pagewrapper({ children, newHeight, Profile }) {

    const newclass = `w-full h-[calc(${newHeight ? newHeight : '100vh-59px-2rem'})] overflow-y-auto mx-auto flex flex-col  justify-start items-center ${Profile.Ismobile ? '' : ' px-[2rem]'}`

    return (
        <div className={newclass}>
            {children}
        </div>
    )
}
const mapStateToProps = (state) => ({
    Profile: state.Profile,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagewrapper)
