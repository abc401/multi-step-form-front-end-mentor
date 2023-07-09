import { useRef } from 'react'
import { BillingPlan } from '../pages/PlanSelection';

export type BillingPeriod = "monthly" | "yearly";

interface Props {
    billingPlan: BillingPlan
    currentPlan?: BillingPlan
    billingPeriod: BillingPeriod
    setPlanType: (plan: BillingPlan) => void
    checked?: boolean
}

export default function PlanCardRadio(props: Props) {
  const {title, iconSrc, monthlyPrice, yearlyPrice} = props.billingPlan
  const radioRef = useRef<HTMLInputElement>(null)

  const onChange = () => {
    props.setPlanType(props.billingPlan)
  }

  return (
    <label htmlFor={title.toLowerCase()}
      className={`
        flex
        sm:flex-col
        selectable
        ${props.checked && "selectable-selected"}
        py-4 sm:p-3
        space-x-4 sm:space-x-0
      `}
    >
      <input
        ref={radioRef}
        onChange={onChange}
        type="radio"
        name="plan-selection"
        id={title.toLowerCase()}
        className="hidden"
      />
      <img
        src={iconSrc}
        className='
          w-8 sm:mb-10
        '
      />
      <div>
        <h2 className="font-bold text-sm">{ title }</h2>
        <div className="text-xs text-neutral-100">${props.billingPeriod == "yearly" ? `${yearlyPrice}/yr` : `${monthlyPrice}/mo`}</div>
        {
          props.billingPeriod == "yearly" &&
          <div className="text-xs">2 months free</div>
        }
      </div>
    </label>
  )
}
