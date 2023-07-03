import {createContext} from 'react'

export interface FormSteps {
    stepTitles: string[]
    currentStep: number
}

const FormStepsContext = createContext<FormSteps>({
    stepTitles: [
        'Your Info',
        'Select Plan',
        'Add-ons',
        'Summary'
    ],
    currentStep: 0
})

export default FormStepsContext;