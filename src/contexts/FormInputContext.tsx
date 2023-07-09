import { createContext, useContext } from 'react'

export class FormEntry<T> {
  constructor(
    public entry: T | undefined,
    public isValid: boolean
  ) {}
}

export class SingleFormInput extends Map<string, FormEntry<any>> {
  public initEntry(entryKey: string) {
    let entry = new FormEntry(undefined, false);
    this.set(
      entryKey,
      entry
    )
    return entry;
  } 

  public initEntries(entryKeys: string[]) {
    entryKeys.map((key) => {
      this.initEntry(key)
    })
  }

  public getOrInitEntry(entryKey: string) {
    const entry = this.get(entryKey);
    if (entry) return entry;
    return this.initEntry(entryKey);
  }

  public getOrInitEntries(entryKeys: string[]) {
    let entries = new Map<string, FormEntry<any>>()
    for (let key of entryKeys) {
      entries.set(
        key,
        this.getOrInitEntry(key)
      )
    }
    return entries;
  }

  public isValid() {
    if (this.size === 0) {
      return false;
    }

    for (let entry of this.values()) {
      if (!entry.isValid) {
        return false;
      }
    }
    return true;
  }

}
export type CompleteFormInput = Map<string, SingleFormInput>;

const FormInputContext = createContext<CompleteFormInput>(new Map())

export const useSingleFormInputData = (currentFormId: string) => {
  const formInputContext = useContext(FormInputContext);
  const inputData = formInputContext.get(currentFormId);
  if (inputData) return inputData;

  formInputContext.set(currentFormId, new SingleFormInput())
  return formInputContext.get(currentFormId) as SingleFormInput;
}

export default FormInputContext;
