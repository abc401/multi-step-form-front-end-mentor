import { useState } from 'react'
import { FormPart } from "../contexts/FromNavigationContext"
import AddonCheckBox from "../partials/AddonCheckBox"

export const ADDON_SELECTION_FORM  = new FormPart('Add-ons', <AddonSelection />)

export class Addon {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly monthlyPrice: number,
    readonly yearlyPrice: number
  ) { }
}

const addons = [
  new Addon('Online service', 'Access to multiplayer games', 1, 10),
  new Addon('Larger storage', 'Extra 1TB of cloud save', 2, 20),
  new Addon('Customizable profile', 'Custom theme on your profile', 2, 20),
]

export default function AddonSelection() {
  const [selectedAddons, setSelectedAddons] = useState<Set<Addon>>(new Set())
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
