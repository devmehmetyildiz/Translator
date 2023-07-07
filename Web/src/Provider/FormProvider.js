
import React, { useState } from "react"

export const FormContext = React.createContext()

const FormProvider = ({ children }) => {
    const [formstates, setFormstates] = useState({})
    console.log('formstates: ', formstates);
    return (
        <FormContext.Provider value={{ formstates, setFormstates }}>
            {children}
        </FormContext.Provider>
    )
}
export default FormProvider