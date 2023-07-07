import { FormPart } from "../contexts/FromNavigationContext"

export const FINISHING_UP_FORM = new FormPart('Summary', <FinishingUp />)


export default function FinishingUp() {
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
              Arcade (Monthly)
            </span>
            <button className="underline hover:text-accent-400">
              Change
            </button>
          </div>
          <span className="font-bold text-accent-200">$9/mo</span>
        </div>

        <hr className="opacity-20" />

        {/* Addons */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Online service</span>
            <span className="text-accent-200 font-medium">+$1/mo</span>
          </div>
          <div className="flex justify-between">
            <span>Online service</span>
            <span className="text-accent-200 font-medium">+$1/mo</span>
          </div>
        </div>
      </div>
      <div className="text-sm px-4 my-4 flex justify-between" >
        <span className="text-neutral-100">Total (per month)</span>
        <span className="text-accent-400 font-bold">+$12/mo</span>
      </div>
    </div>
  )
}
