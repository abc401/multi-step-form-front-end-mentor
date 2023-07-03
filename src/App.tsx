import { redirect, RouterProvider, createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom'
import './App.css'

// Pages
import PersonalInfo from './pages/PersonalInfo'
import PlanSelection from './pages/PlanSelection'
import AddonSelection from './pages/AddonSelection'
import FinishingUp from './pages/FinishingUp'
import ThankYou from './pages/ThankYou'
import MainLayout from './layouts/MainLayout'
import FormStepsContext, { FormSteps } from './contexts/FormStepsContext'

const redirectToPersonalInfo = () => {
  return redirect("personal-info")
}

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<MainLayout />}>
      <Route index loader={redirectToPersonalInfo} />
      <Route path="personal-info" element={<PersonalInfo />}></Route>
      <Route path="plan-selection" element={<PlanSelection />}></Route>
      <Route path="addon-selection" element={<AddonSelection />}></Route>
      <Route path="finish-up" element={<FinishingUp />}></Route>
      <Route path="thank-you" element={<ThankYou />}></Route>
    </Route>
  )
);

function App() {
  const formStepsContext: FormSteps = {
    currentStep: 0,
    stepTitles: [
        'Your Info',
        'Select Plan',
        'Add-ons',
        'Summary'
    ]
  }

  return (
    <FormStepsContext.Provider value={formStepsContext}>
      <RouterProvider router={router} />
    </FormStepsContext.Provider>
  )
}

export default App
