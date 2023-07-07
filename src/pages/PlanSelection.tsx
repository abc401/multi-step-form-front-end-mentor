
import PlanCardRadio, {BillingPeriod} from "../partials/PlanCard"
import React, { useState } from 'react'

import arcadeIcon from '/images/icon-arcade.svg'
import proIcon from '/images/icon-pro.svg'
import advancedIcon from '/images/icon-advanced.svg'

import { FormPart } from "../contexts/FromNavigationContext"

export const PLAN_SELECTION_FORM = new FormPart('Select Plan', <PlanSelection />)

export class BillingPlan {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  iconSrc: string;

  constructor(iconSrc: string, title: string, monthlyPrice: number, yearlyPrice: number) {
    this.iconSrc = iconSrc
    this.title = title
    this.monthlyPrice = monthlyPrice
    this.yearlyPrice = yearlyPrice
  }
}

const billingPlans = [
  new BillingPlan(arcadeIcon, 'Arcade', 9, 90),
  new BillingPlan(advancedIcon, 'Advanced', 12, 120),
  new BillingPlan(proIcon, 'Pro', 15, 150)
]

export default function PlanSelection() {
  const [currentPlanType, setCurrentPlanType] = useState<BillingPlan | undefined>(undefined);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  console.log(currentPlanType)
  const setPlanType = (plan: BillingPlan) => {
    setCurrentPlanType(plan)
    console.log(plan)
  }
  return (
    <div>
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>
      <div
        className="
          sm:grid sm:grid-cols-3
          sm:gap-x-2
          space-y-2 sm:space-y-0
        "
      > {
        billingPlans.map((plan) => {
          return  <PlanCardRadio
                    currentPlan={currentPlanType}
                    checked={currentPlanType && (currentPlanType.title === plan.title)}
                    billingPlan={plan}
                    billingPeriod={billingPeriod}
                    setPlanType={setPlanType}
                    key={plan.title}
                  />
        })
      } </div>
      <div
        className="
          flex justify-center items-center
          space-x-4
          mt-4 p-2
          rounded-md 
          bg-neutral-400"
      >
        <span>Monthly</span>
        <input 
          type="checkbox"
          className="
            relative appearance-none
            w-[2em] h-[1em] rounded-full
            bg-accent-200 

            after:absolute after:content-[''] 
            after:h-[70%] after:aspect-square after:rounded-full
            after:top-[50%]
            after:-translate-y-[50%] after:-translate-x-[50%]
            after:left-[25%]
            after:transition-[left]
            after:bg-white 

            checked:after:left-[75%]
          "
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const target = event.target;
            if (target.checked) {
              setBillingPeriod("yearly")
            } else {
              setBillingPeriod("monthly")
            }
          }}
        />
        <span>Yearly</span>
      </div>
    </div>
  )
}
