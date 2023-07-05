import PlanCardRadio from "../partials/PlanCard"
import arcadeIcon from '/images/icon-arcade.svg'
import { FormPart } from "../contexts/FormStepSequenceContext"

export const PLAN_SELECTION_FORM = new FormPart('Select Plan', <PlanSelection />)

export default function PlanSelection() {
  return (
    <div>
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>
      <PlanCardRadio imgSrc={arcadeIcon} price={10} title="Hello" />
      <PlanCardRadio imgSrc={arcadeIcon} price={10} title="Hello2" />
      <div>
        <span>Monthly</span>
        <input type="checkbox" name="" id="" />
        <span>Yearly</span>
      </div>
    </div>
  )
}
