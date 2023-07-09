import thankyouIcon from '/images/icon-thank-you.svg'

export default function ThankYou() {
  return (
    <>
      <div
        className="
        bg-white
        mb-4 sm:my-auto
        p-4 sm:p-0
        rounded-xl
        min-w-[250px]
        sm:max-w-[452px]
      "
      >
        <div
          className="
          flex flex-col items-center text-center
        "
        >
          <img
            className="w-20"
            src={thankyouIcon}
            alt=""
          />
          <h1>Thank You!</h1>
          <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
        </div>
      </div>
      <div className="h-20 sm:hidden"></div>
    </>
  )
}
