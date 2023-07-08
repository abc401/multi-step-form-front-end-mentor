import { useContext, useEffect } from "react"
import FormNavigationContext from "../contexts/FromNavigationContext"
import FormNav from "../partials/FormNav"
import FormInputContext from "../contexts/FormInputContext"


export default function SignUpForm() {
  const formNavigation = useContext(FormNavigationContext)
  const formInput = useContext(FormInputContext);

  if (formInput == null) return;
  if (formNavigation == null) return;

  useEffect(() => {
    return () => {
      formInput.clear()
      formNavigation.currentStep.set(0);
    }
  }, [])

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
