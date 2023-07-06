import { useRef, useState } from 'react'
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPlanType(props.billingPlan)
  }

  return (
    <label htmlFor={title.toLowerCase()}
      className={`
        flex
        rounded-md
        border 
        ${ props.checked?
            "border-accent-400 bg-neutral-300"
          :
            "border-neutral-100/20"
        }
        py-4 space-x-4
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
      <img src={iconSrc} alt="" />
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
