import { useSingleFormInputData } from "../contexts/FormInputContext"
import LabeledInput from "../partials/LabeledInput"
import { FormMetaData } from "../contexts/FromNavigationContext"

export const PERSONAL_INFO_FORM = new FormMetaData('Your Info', <PersonalInfo />)

class LabeledInputMetaData {
  constructor(
    readonly id: string,
    readonly type: string,
    readonly label: string,
    readonly placeholder: string,
  ) {}
}

const labeledInputs = [
  new LabeledInputMetaData('name', 'text', 'Name', 'e.g. Stephen King'),
  new LabeledInputMetaData('email', 'email', 'Email', 'e.g. stephenking@lorem.com'),
  new LabeledInputMetaData('phno', 'tel', 'Phone Number', 'e.g. +1 234 567 890'),
]

export default function PersonalInfo() {
  const inputData = useSingleFormInputData(PERSONAL_INFO_FORM.id);
  return (
    <div
      className="
          bg-white
          p-2 sm:p-0
          rounded-xl"
    >
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <div className="mt-4 space-y-4"> {
        labeledInputs.map((labeledInput) => {
          return  <LabeledInput
                    {...labeledInput}
                    required
                    name={labeledInput.id}
                    key={labeledInput.id}
                    inputData={inputData}
                  />
        })
      } </div>
    </div>
  )
}