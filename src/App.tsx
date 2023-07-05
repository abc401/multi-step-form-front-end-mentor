import { RouterProvider, createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import FormStepSequenceContext, { ReactState } from './contexts/FormStepSequenceContext'
import { FormStepSequenceManager } from './contexts/FormStepSequenceContext'
import { PERSONAL_INFO_FORM } from './pages/PersonalInfo'
import { PLAN_SELECTION_FORM } from './pages/PlanSelection'

// Pages
import ThankYou from './pages/ThankYou'
import MainLayout from './layouts/MainLayout'
import SignUpForm from './pages/SignUpForm'

const formStepSequence = [
    PERSONAL_INFO_FORM,
    PLAN_SELECTION_FORM
]

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<MainLayout />}>
      <Route 
        index
        element={<SignUpForm />}
      />
      <Route 
        path="thank-you"
        element={<ThankYou />}
      />
    </Route>
  )
);

function App() {
  const [currentStep, setCurrentStep] = useState(0)

  const currentStepState: ReactState<number> = {
    set: (value) => setCurrentStep(value),
    get: () => currentStep
  }

  const formStepSequenceManager = new FormStepSequenceManager(formStepSequence, currentStepState)
  return (
    <FormStepSequenceContext.Provider value={formStepSequenceManager} >
      <RouterProvider router={router} />
    </FormStepSequenceContext.Provider>
  )
}

export default App
