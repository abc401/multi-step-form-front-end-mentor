import {useContext} from 'react'
import FormNavigationContext, { FormMetaData } from "../contexts/FromNavigationContext"
import { FormEntry, useSingleFormInputData } from '../contexts/FormInputContext'
import { BILLING_PERIOD_KEY, BILLING_PLAN_KEY, BillingPlan, PLAN_SELECTION_FORM } from './PlanSelection';
import { ADDON_SELECTION_FORM, Addon, SELECTED_ADDON_ENTRY_KEY } from './AddonSelection';
import { BillingPeriod } from "../partials/PlanCard";

export const FINISHING_UP_FORM = new FormMetaData('Summary', <FinishingUp />)


export default function FinishingUp() {
  const planSelectionData = useSingleFormInputData(PLAN_SELECTION_FORM.id)
  const billingPlanEntry = planSelectionData.get(BILLING_PLAN_KEY) as FormEntry<BillingPlan>;
  const billingPeriodEntry = planSelectionData.get(BILLING_PERIOD_KEY) as FormEntry<BillingPeriod>;

  const addonData = useSingleFormInputData(ADDON_SELECTION_FORM.id);
  const addonsEntry = addonData.get(SELECTED_ADDON_ENTRY_KEY) as FormEntry<Set<Addon>>;

  if (
    billingPlanEntry == null || billingPeriodEntry == null || addonsEntry == null ||
    billingPlanEntry.entry == null || billingPeriodEntry.entry == null || addonsEntry.entry == null
  ) {
    return
  }

  const billingPlan = billingPlanEntry.entry
  const billingPeriod = billingPeriodEntry.entry
  const addons = Array.from(addonsEntry.entry)

  let addonPrice = 0
  for (let addon of addons) {
    addonPrice += addon.price(billingPeriod)
  }
  const totalPrice = billingPlan.price(billingPeriod) + addonPrice

  const formNavigation = useContext(FormNavigationContext);
  if (formNavigation == null) return;

  return (
    <div>
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>
      <div
        className="
          bg-neutral-300 text-neutral-100 text-sm
          p-4 my-4
          space-y-2
          rounded-lg
        "
      >

        {/* Billing Plan */}
        <div className="flex justify-between items-center">
          <div
            className="flex flex-col items-start"
          >
            <span
              className="
                font-bold text-accent-200"
            >
              {billingPlan.title} ({billingPeriod === "monthly" ? "Monthly" : "Yearly"})
            </span>

            <button
              onClick={
                () => {
                  formNavigation.goto(PLAN_SELECTION_FORM)
                }
              }
              className="underline hover:text-accent-400"
            >
              Change
            </button>
          </div>
          <span className="font-bold text-accent-200">{billingPlan.priceString(billingPeriod)}</span>
        </div>

        <hr className="opacity-20" />

        {/* Addons */}
        <div className="space-y-2">
          {
            addons.map((addon) => {
              return (
                <div key={addon.id} className="flex justify-between">
                  <span>{ addon.title }</span>
                  <span className="text-accent-200 font-medium">+{addon.priceString(billingPeriod)}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="text-sm px-4 my-4 flex justify-between" >
        <span className="text-neutral-100">Total (per {billingPeriod === "monthly" ? "month" : "year"})</span>
        <span className="text-accent-400 font-bold">+${totalPrice}/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
      </div>
    </div>
  )
}
