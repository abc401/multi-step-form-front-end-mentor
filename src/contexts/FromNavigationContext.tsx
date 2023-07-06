import { ReactNode, createContext } from 'react'

export class FormPart {
  title: string
  element: ReactNode
  
  constructor(title: string, element: ReactNode) {
    this.title = title
    this.element = element
  }
}

export interface ReactState<T> {
  set: (value: T) => void,
  get: () => T
}

export class FormNavigationManager {
  sequence: FormPart[]
  currentStep: ReactState<number>

  constructor(sequence: FormPart[], currentStep: ReactState<number>) {
    this.sequence = sequence
    this.currentStep = currentStep
  }
  

  currentFormJSX() {
    const currentFormStep = this.sequence[this.currentStep.get()]
    return currentFormStep.element
  }
}

const FormNavigationContext = createContext<FormNavigationManager | undefined>(undefined)

export default FormNavigationContext;