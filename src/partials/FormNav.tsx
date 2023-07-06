import FormNavigationContext from '../contexts/FromNavigationContext'
import {useContext} from 'react'
import { Link } from 'react-router-dom';

export default function FormNav() {
  const formNavigationManager = useContext(FormNavigationContext);
  if (formNavigationManager == null) return;

  const currentStep = formNavigationManager.currentStep;
  const sequence = formNavigationManager.sequence;
  
  return (
    <div
      className='
        font-bold text-sm bg-white 
        grid grid-cols-[auto,_1fr,_auto]
        p-4 sm:p-0
        -mx-4 sm:m-0'
    >
      {
        currentStep.get() > 0 &&
        <button
          onClick={() => currentStep.set(currentStep.get() - 1)}
          className='
            btn btn-secondary
          '
        >
          Go Back
        </button>
      }
      {
        currentStep.get() < (sequence.length - 1) ? 
          <button
            onClick={() => currentStep.set(currentStep.get() + 1)}
            className='
              btn btn-primary
              col-end-[-1]
            '
          >
            Next Step
          </button>
        : 
          <Link
            to="/thank-you"
            className='
              btn btn-primary
              col-end-[-1]
            '
          >Confirm</Link>

      }
    </div>
  )
}
