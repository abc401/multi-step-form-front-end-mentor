import { FormPart } from "../contexts/FormStepSequenceContext"

export const FINISHING_UP_FORM_PART     = new FormPart('Summary',     '/finish-up')

export default function FinishingUp() {
  return (
    <div>
      Finishing Up
    </div>
  )
}
