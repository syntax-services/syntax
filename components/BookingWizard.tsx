'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const Step1Schema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(6),
  project_type: z.string().min(2)
})
// Define additional schemas for other steps...

export default function BookingWizard() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(Step1Schema),
    defaultValues: { full_name: '', phone: '', project_type: '', details: '' }
  })

  // autosave to localStorage
  useEffect(() => {
    const sub = watch((value) => {
      localStorage.setItem('booking-draft', JSON.stringify(value))
      // optionally debounce & call server draft endpoint here
    })
    return () => sub.unsubscribe()
  }, [watch])

  const onNext = async (data: any) => {
    // validate and move to next
    setStep((s) => s + 1)
    // optionally POST partial draft to /api/bookings/draft
  }

  return (
    <form onSubmit={handleSubmit(onNext)}>
      {step === 1 && (
        <div>
          <input {...register('full_name')} />
          <input {...register('phone')} />
          <input {...register('project_type')} />
          <button type="button" onClick={handleSubmit(onNext)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          {/* more fields */}
          <button type="button" onClick={() => setStep(1)}>Back</button>
          <button type="button" onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {/* final step: review & submit -> call /api/bookings to create */}
    </form>
  )
}
