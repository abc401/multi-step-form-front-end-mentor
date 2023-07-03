import {Outlet} from 'react-router-dom'

export default function MainLayout() {
  return (
    <div
      className='
        bg-neutral-300 sm:bg-white
        grid 
        grid-cols-[1rem,_auto,_1rem]
        sm:grid-cols-[auto,_auto]
        sm:p-4 sm:gap-4
        sm:max-w-[660px]
        sm:m-4
        rounded-xl sm:shadow-2xl
        min-h-screen sm:min-h-0
      '
    >
      <picture
        className='
          contents
        '
      >
        <source srcSet='/images/bg-sidebar-desktop.svg' media='(min-width: 654px)' className='hidden' />
        <img 
          src="/images/bg-sidebar-mobile.svg" alt=""
          className='
            row-span-2 col-start-1 col-span-3 row-start-1 w-full
            sm:row-start-1 sm:col-start-1 sm:col-span-1 sm:row-span-1
          '
        />
      </picture>

      <div 
        className='
          h-[50px] z-10
          col-start-2 row-start-1
          sm:col-start-1 sm:row-start-1
          bg-accent-700
        '
      >
        
      </div>
      <div
        className='
          grid grid-rows-[auto,_1fr,_auto]
          col-start-2 row-start-2
          z-10
          sm:row-start-1
        '
      >

        <div className='sm:max-w-sm col-start-1 sm:col-start-2 my-4 sm:my-0 shadow-2xl rounded-lg overflow-hidden sm:shadow-none' >
          <Outlet />
        </div>

        <div
          className='
            font-bold text-sm bg-white 
            flex justify-between
            p-4 -mx-4
            row-start-3
            sm:m-0
            col-start-1 sm:col-start-2
          '
        >
          <button className='text-neutral-100'>Go Back</button>
          <button className='bg-accent-200 hover:bg-accent-400 text-white py-2 px-4 rounded'>Next Step</button>
        </div>
      </div>
    </div>
  )
}
