import React, { useState } from 'react'

import Header from './../../../../components/Headers/Header';
import StaffTable from './../../../../components/Tables/StaffTable'
import Details from './Details';

const StaffDashboard = () => {

    const [modify, setModify] = useState(false)

    return (

        <>
            <div hidden={modify}>
                <Header />

                <StaffTable modifyHook={setModify}/>
            </div>

            <div hidden={!modify}>
                <Details />
            </div>
        </>
    )
}

export default StaffDashboard
