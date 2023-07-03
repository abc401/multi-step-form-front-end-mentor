import { Outlet } from 'react-router-dom'
import FormStep from '../partials/FormStep'
import { useContext } from 'react'
import FormStepsContext from '../contexts/FormStepsContext'

export default function MainLayout() {
  const { currentStep, stepTitles } = useContext(FormStepsContext);

  return (
    <div
      className='
        bg-neutral-300 sm:bg-white
        grid 
        grid-cols-[1rem,_auto,_1rem]
        sm:grid-cols-[auto,_minmax(1rem,_5rem),_auto,_minmax(1rem,_5rem)]
        sm:p-4
        sm:m-4
        rounded-xl sm:shadow-2xl
        min-h-screen sm:min-h-0'
    >
      <picture className=' contents ' >
        <source srcSet='/images/bg-sidebar-desktop.svg' media='(min-width: 570px)' className='hidden' />
        <img
          src="/images/bg-sidebar-mobile.svg" alt=""
          className='
            object-contain
            row-span-2 col-start-1 col-span-3 row-start-1
            w-full
            sm:min-w-[210px] sm:max-w-[240px]
            sm:row-start-1 sm:col-start-1 sm:col-span-1 sm:row-span-1 '
        />
      </picture>

      <div
        className='
          z-10

          col-start-2 row-start-1
          sm:col-start-1 sm:row-start-1

          m-auto sm:m-8
          space-x-3 sm:space-x-0 sm:space-y-7

          flex
          sm:flex-col
        '

      >
        {
          stepTitles.map(
            (title: string, index: number) =>
              <FormStep
                index={index + 1}
                active={index == currentStep}
                title={title}
              />
          )

        }

      </div>

      <div
        className='
          grid grid-rows-[auto,_1fr,_auto]
          col-start-2 row-start-2
          z-10
          sm:col-start-3 sm:row-start-1'
      >
        <div className='sm:max-w-sm sm:min-w-[270px] col-start-1 sm:col-start-2 sm:my-0 shadow-2xl rounded-lg overflow-hidden sm:shadow-none' >
          <Outlet />
        </div>

        <div
          className='
            font-bold text-sm bg-white 
            flex justify-between
            p-4
            -mx-4 sm:m-0
            row-start-3
            col-start-1 sm:col-start-2'
        >
          <button className='text-neutral-100 hover:text-accent-200'>Go Back</button>
          <button className='bg-accent-200 hover:bg-accent-400 text-white py-2 px-4 rounded'>Next Step</button>
        </div>
      </div>
    </div>
  )
}
