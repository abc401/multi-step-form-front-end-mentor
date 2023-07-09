import { useState, useEffect } from 'react'
import { FormMetaData } from "../contexts/FromNavigationContext"
import AddonCheckBox from "../partials/AddonCheckBox"
import { useSingleFormInputData, FormEntry } from '../contexts/FormInputContext';
import { BillingPeriod } from '../partials/PlanCard';

export const ADDON_SELECTION_FORM  = new FormMetaData('Add-ons', <AddonSelection />)

export const SELECTED_ADDON_ENTRY_KEY = "ADDONS_ENTRY_KEY";

const ENTRY_KEYS = [SELECTED_ADDON_ENTRY_KEY]

export class Addon {

  constructor(
    readonly title: string,
    readonly description: string,
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

const addons = [
  new Addon('Online service', 'Access to multiplayer games', 1, 10),
  new Addon('Larger storage', 'Extra 1TB of cloud save', 2, 20),
  new Addon('Customizable profile', 'Custom theme on your profile', 2, 20),
]

export default function AddonSelection() {
  const inputData = useSingleFormInputData(ADDON_SELECTION_FORM.id);
  let entries = inputData.getOrInitEntries(ENTRY_KEYS)
  let selectedAddonsEntry = entries.get(SELECTED_ADDON_ENTRY_KEY) as FormEntry<Set<Addon>>;
  if (selectedAddonsEntry.entry == null) {
    selectedAddonsEntry.entry = new Set<Addon>()
    selectedAddonsEntry.isValid = true
  }

  const [selectedAddons, setSelectedAddons] = useState<Set<Addon>>(selectedAddonsEntry.entry)

  useEffect(() => {
    selectedAddonsEntry.entry = selectedAddons
    selectedAddonsEntry.isValid = true
  }, [selectedAddons])

  return (
    <div>
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>
      <div
        className='
          space-y-2
        '
      >{
        addons.map((addon) => {
          return <AddonCheckBox
            addon={addon}
            selected={selectedAddons.has(addon)}
            onSelected={
              (addon) => {
                const newAddonSelection = new Set(selectedAddons);
                newAddonSelection.add(addon)
                setSelectedAddons(newAddonSelection)
              }
            }
            onDeselected={
              (addon: Addon) => {
                const newAddonSelection = new Set(selectedAddons)
                newAddonSelection.delete(addon)
                setSelectedAddons(newAddonSelection)
              }
            }
            billingPeriod="monthly"
            key={addon.title.toLowerCase()}
          />
        })
      } </div>
    </div>
  )
}
