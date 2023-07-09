import {useRef} from 'react'
import { Outlet, Form } from 'react-router-dom'
import FormStep from '../partials/FormStep'
import FormNavigationContext, { FormMetaData } from '../contexts/FromNavigationContext'
import { useContext } from 'react'
import FormInputContext, { CompleteFormInput } from '../contexts/FormInputContext'

import desktopSidebarBG from '/images/bg-sidebar-desktop.svg'
import mobileSidebarBG from '/images/bg-sidebar-mobile.svg'


export default function MainLayout() {
  const formNavigationManager = useContext(FormNavigationContext)
  if (formNavigationManager == null) return;
  
  const formInputData = useRef<CompleteFormInput>(new Map())

  return (
    <div
      className='
        bg-neutral-300 sm:bg-white
        grid 
        grid-cols-[1rem,_auto,_1rem]
        sm:grid-cols-[auto,_minmax(1rem,_5rem),_auto,_minmax(1rem,_5rem)]
        sm:p-4 sm:pe-0
        sm:m-4
        rounded-xl sm:shadow-2xl
        min-h-screen sm:min-h-0'
    >
      <picture className=' contents ' >
        <source srcSet={desktopSidebarBG} media='(min-width: 560px)' className='hidden' />
        <img
          src={mobileSidebarBG} alt=""
          className='
            object-contain
            row-span-2 col-start-1 col-span-3 row-start-1
            w-full
            sm:min-w-[210px] sm:max-w-[224px]
            sm:row-start-1 sm:col-start-1 sm:col-span-1 sm:row-span-1 '
        />
      </picture>

      <div
        className='
          z-10

          col-start-2 row-start-1
          sm:col-start-1 sm:row-start-1

          mx-auto my-4 sm:m-8
          space-x-3 sm:space-x-0 sm:space-y-7

          flex
          sm:flex-col
        '

      >
        {
          formNavigationManager.sequence.map(
            (metaData: FormMetaData, index: number) =>
              <FormStep
                index={index + 1}
                active={index === formNavigationManager.currentStep.get()}
                title={metaData.title}
                key={index}
              />
          )

        }

      </div>

      <Form
        onSubmit={() => {
          return false
        }}
        className='
          flex flex-col justify-between
          col-start-2 row-start-2
          min-w-[218px] sm:w-fit
          z-10
          sm:col-start-3 sm:row-start-1'
      >
        <FormInputContext.Provider value={formInputData.current} >
          <Outlet />
        </FormInputContext.Provider>
      </Form>
    </div>
  )
}

        // <div
        //   className='
        //     font-bold text-sm bg-white 
        //     flex justify-between
        //     p-4
        //     -mx-4 sm:m-0
        //     row-start-3
        //     col-start-1 sm:col-start-2'
        // >
        //   <button className='text-neutral-100 hover:text-accent-200'>Go Back</button>
        //   <button className='bg-accent-200 hover:bg-accent-400 text-white py-2 px-4 rounded'>Next Step</button>
        // </div>