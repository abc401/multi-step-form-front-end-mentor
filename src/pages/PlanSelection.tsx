
import PlanCardRadio, {BillingPeriod} from "../partials/PlanCard"
import React, { useEffect, useState } from 'react'

import arcadeIcon from '/images/icon-arcade.svg'
import proIcon from '/images/icon-pro.svg'
import advancedIcon from '/images/icon-advanced.svg'

import { FormMetaData } from "../contexts/FromNavigationContext"
import { FormEntry, useSingleFormInputData } from "../contexts/FormInputContext"

export const PLAN_SELECTION_FORM = new FormMetaData('Select Plan', <PlanSelection />)

export const BILLING_PLAN_KEY = "BILLING_PLAN_KEY";
export const BILLING_PERIOD_KEY = "BILLING_PERIOD_KEY";

const entryKeys = [
  BILLING_PLAN_KEY,
  BILLING_PERIOD_KEY
]

export class BillingPlan {
  constructor(
    readonly iconSrc: string,
    readonly title: string, 
    readonly monthlyPrice: number,
    readonly yearlyPrice: number
  ) { }
  
  public get id() : string {
    return this.title.toLowerCase()
  }

  public priceString(billingPeriod: BillingPeriod) {
    if (billingPeriod === "monthly") {
      return `$${this.monthlyPrice}/mo`
    } else {
      return `$${this.yearlyPrice}/yr`
    }
  }

  public price(billingPeriod: BillingPeriod) {
    if (billingPeriod === "monthly") {
      return this.monthlyPrice
    } else {
      return this.yearlyPrice
    }
  }
}

const billingPlans = [
  new BillingPlan(arcadeIcon, 'Arcade', 9, 90),
  new BillingPlan(advancedIcon, 'Advanced', 12, 120),
  new BillingPlan(proIcon, 'Pro', 15, 150)
]

export default function PlanSelection() {

  const inputData = useSingleFormInputData(PLAN_SELECTION_FORM.id);
  let entries = inputData.getOrInitEntries(entryKeys);

  let billingPlanEntry = entries.get(BILLING_PLAN_KEY) as FormEntry<BillingPlan>;
  let billingPeriodEntry = entries.get(BILLING_PERIOD_KEY) as FormEntry<BillingPeriod>;
  if (billingPeriodEntry.entry == null) {
    billingPeriodEntry.entry = "monthly"
  }

  const [currentPlanType, setCurrentPlanType] = useState<BillingPlan | undefined>(billingPlanEntry.entry);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(billingPeriodEntry.entry)

  // Set billing plan
  useEffect(() => {
    if (currentPlanType == null) return;

    billingPlanEntry.entry = currentPlanType
    billingPlanEntry.isValid = true
  }, [currentPlanType])

  // Set billing period
  useEffect(() => {
    billingPeriodEntry.entry = billingPeriod
    billingPeriodEntry.isValid = true;
  }, [billingPeriod])

  const setPlanType = (plan: BillingPlan) => {
    setCurrentPlanType(plan)
  }

  return (
    <div>
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>

      {/* Billing plan selection */}
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

      {/* Billing Period Selection Check box */}
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
          defaultChecked={billingPeriod === "yearly"}
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
