import { Addon } from "../pages/AddonSelection"
import { BillingPeriod } from "./PlanCard";

interface Props {
  addon: Addon
  billingPeriod: BillingPeriod
  selected?: boolean
  onSelected?: (addon: Addon) => void
  onDeselected?: (addon: Addon) => void
}

export default function AddonCheckBox(props: Props) {
  const {addon, billingPeriod, onSelected, onDeselected} = props;
  return (
    <label
      htmlFor={addon.title.toLowerCase()}
      className={`
        grid grid-cols-[auto,_1fr,_auto]
        place-items-center
        gap-x-4
        p-3
        selectable
        ${props.selected && "selectable-selected"}
      `}
    >
      <input
        className="
          h-[1em] accent-accent-400
        "
        type="checkbox"
        defaultChecked={props.selected}
        onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            const target = event.target;
            if (target.checked) {
              onSelected && onSelected(addon)
            } else {
              onDeselected && onDeselected(addon)
            }
          }
        }
        id={addon.title.toLowerCase()}
      />
      <div className="flex flex-col place-self-start">
        <span
          className="
            font-bold text-sm
          "
        >{ addon.title }</span>
        <span
          className="
            text-neutral-100 text-xs
          "
        >{ addon.description }</span>
      </div>
      <span
        className="
          text-xs text-accent-400
        "
      >{ 
        billingPeriod === "monthly"?
          `+$${addon.monthlyPrice}/mo`
        :
          `+$${addon.yearlyPrice}/yr`
      }</span>
    </label>
  )
}
