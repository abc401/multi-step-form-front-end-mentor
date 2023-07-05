import { useContext, useState } from "react"
import FormStepSequenceContext ,{ ReactState, FormStepSequenceManager } from "../contexts/FormStepSequenceContext"
import { PERSONAL_INFO_FORM } from "./PersonalInfo"
import { PLAN_SELECTION_FORM } from "./PlanSelection"
import MainLayout from "../layouts/MainLayout"
import FormNav from "../partials/FormNav"


export default function SignUpForm() {
  const formStepSequenceManager = useContext(FormStepSequenceContext)
  if (formStepSequenceManager == null) return;
  return (
    <>
      {formStepSequenceManager.currentFormJSX()}
      <FormNav />
    </>
  )
}
