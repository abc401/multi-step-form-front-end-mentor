import LabeledInput from "../partials/LabeledInput"

export default function PersonalInfo() {
  return (
    <div className='px-4 bg-white'>
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <div className="my-4 space-y-4">
        <LabeledInput
          type="text"
          id="name"
          name="name"
          label="Name"
          placeholder="e.g. Stephen King"
        />
        <LabeledInput
          type="email"
          name="email"
          required
          label="Email Address"
          id="email"
          placeholder="e.g. stephenking@lorem.com"
        />
        <LabeledInput 
          type="tel"
          name="phno"
          id="phno"
          label="Phone Number"
          required
          placeholder="e.g. +1 234 567 890"
        />
      </div>
    </div>





  )
}
