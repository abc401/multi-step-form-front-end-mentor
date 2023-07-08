import { ReactNode, createContext, useContext } from 'react'

export class FormMetaData {
  constructor(
    readonly title: string,
    readonly element: ReactNode,
  ) { }

  
  public get id() : string {
    return this.title.toLowerCase()
  }
  
}

export interface ReactState<T> {
  set: (value: T) => void,
  get: () => T
}

export class FormNavigationManager {
  constructor(
    readonly sequence: FormMetaData[],
    readonly currentStep: ReactState<number>
  ) { }

  indexOf(formMetaData: FormMetaData) {
    return this.sequence.indexOf(formMetaData)
  }

  currentFormJSX() {
    const currentFormMetaData = this.sequence[this.currentStep.get()]
    return currentFormMetaData.element
  }

  goto(formMetaData: FormMetaData) {
    const formIndex = this.indexOf(formMetaData)
    this.currentStep.set(formIndex)
  }
}

export const useFormIndex = (formMetaData: FormMetaData) => {
  const formNavigation = useContext(FormNavigationContext);
  if (formNavigation == null) return;
  for (let i = 0; i < formNavigation.sequence.length; i++) {
    if (formNavigation.sequence[i].title === formMetaData.title) {
      return i;
    }
  }
}

const FormNavigationContext = createContext<FormNavigationManager | undefined>(undefined)

export default FormNavigationContext;