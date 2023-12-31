import FormNavigationContext from '../contexts/FromNavigationContext'
import {useContext} from 'react'
import { Link } from 'react-router-dom';
import { useSingleFormInputData } from '../contexts/FormInputContext';

export default function FormNav() {
  const formNavigationManager = useContext(FormNavigationContext);
  if (formNavigationManager == null) return;

  const currentStep = formNavigationManager.currentStep;
  const sequence = formNavigationManager.sequence;
  const currentFormMetaData = sequence[currentStep.get()]
  const inputData = useSingleFormInputData(currentFormMetaData.id);

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
          type='button'
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
            onClick={
              () => {
                if (!inputData.isValid()) {
                  return;
                }
                currentStep.set(currentStep.get() + 1)
              }
            }
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
