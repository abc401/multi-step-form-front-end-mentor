import { useContext } from "react"
import FormNavigationContext from "../contexts/FromNavigationContext"
import FormNav from "../partials/FormNav"

export default function SignUpForm() {
  const formNavigation = useContext(FormNavigationContext)

  if (formNavigation == null) return;

  return (
    <>
      <div
        className="
          bg-white
          mb-4
          p-4 sm:p-0
          rounded-xl
          min-w-[250px]
        "
      >
        {formNavigation.currentFormJSX()}
      </div>
      <FormNav />
    </>
  )
}
