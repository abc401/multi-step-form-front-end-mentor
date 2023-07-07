import { RouterProvider, createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import FormNavigationContext, { ReactState } from './contexts/FromNavigationContext'
import { FormNavigationManager } from './contexts/FromNavigationContext'
import { PERSONAL_INFO_FORM } from './pages/PersonalInfo'
import { PLAN_SELECTION_FORM } from './pages/PlanSelection'

// Pages
import ThankYou from './pages/ThankYou'
import MainLayout from './layouts/MainLayout'
import SignUpForm from './layouts/SignUpForm'
import { ADDON_SELECTION_FORM } from './pages/AddonSelection'

const formStepSequence = [
    PERSONAL_INFO_FORM,
    PLAN_SELECTION_FORM,
    ADDON_SELECTION_FORM
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

  const formNavigation = new FormNavigationManager(formStepSequence, currentStepState)
  return (
    <FormNavigationContext.Provider value={formNavigation} >
      <RouterProvider router={router} />
    </FormNavigationContext.Provider>
  )
}

export default App
