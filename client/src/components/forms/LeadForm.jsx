import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../api/client";
import toast from "react-hot-toast";

export const LeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  event_date: z.string().min(1, "Event date is required"),
  event_time: z.string().min(1, "Event time is required"),
  guests: z.coerce.number().min(1, "Guest count must be at least 1"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  eventType: z.string().optional(),
  notes: z.string().optional(),
  recaptcha: z.string().optional()
});

const EVENT_TYPES = [
  "Wedding",
  "Birthday Party", 
  "Corporate Event",
  "Anniversary",
  "Graduation",
  "Baby Shower",
  "Holiday Party",
  "Other"
];

export default function LeadForm({ selectedItems = [], onSubmitted }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
    watch,
    trigger
  } = useForm({
    resolver: zodResolver(LeadSchema),
    defaultValues: { 
      guests: 50,
      eventType: ""
    }
  });

  const watchedFields = watch();
  
  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await trigger(['firstName', 'lastName', 'email', 'phone']);
    } else if (currentStep === 2) {
      isValid = await trigger(['event_date', 'event_time', 'guests', 'eventType']);
    }
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        event_date: data.event_date,
        event_time: data.event_time,
        eventType: data.eventType,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip
        },
        guests: data.guests,
        notes: data.notes,
        items: selectedItems.map(item => ({
          itemId: item._id,
          qty: item.qty || 1
        })),
        recaptcha: data.recaptcha
      };

      await api.post("/leads", payload);
      toast.success("Thanks! We'll reach out within 24 hours with your custom quote.");
      reset();
      setCurrentStep(1);
      onSubmitted?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again or call us directly.");
      console.error("Form submission error:", error);
    }
  };

  const stepProgress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-blue-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {currentStep === 1 && "Contact Information"}
            {currentStep === 2 && "Event Details"}
            {currentStep === 3 && "Event Location"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${stepProgress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Let's start with your contact info
              </h2>
              <p className="text-gray-600">
                We'll use this to send you a personalized quote
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field 
                label="First name" 
                error={errors.firstName?.message}
                required
              >
                <input 
                  {...register("firstName")} 
                  className="input" 
                  id="firstName"
                  placeholder="John"
                />
              </Field>
              
              <Field 
                label="Last name" 
                error={errors.lastName?.message}
                required
              >
                <input 
                  {...register("lastName")} 
                  className="input" 
                  id="lastName"
                  placeholder="Smith"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field 
                label="Email address" 
                error={errors.email?.message}
                required
              >
                <input 
                  type="email" 
                  {...register("email")} 
                  className="input" 
                  id="email"
                  placeholder="john@example.com"
                />
              </Field>
              
              <Field 
                label="Phone number" 
                error={errors.phone?.message}
                required
              >
                <input 
                  type="tel" 
                  {...register("phone")} 
                  className="input" 
                  id="phone"
                  placeholder="(555) 123-4567"
                />
              </Field>
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tell us about your event
              </h2>
              <p className="text-gray-600">
                This helps us prepare the perfect setup for you
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field 
                label="Event date" 
                error={errors.event_date?.message}
                required
              >
                <input 
                  type="date" 
                  {...register("event_date")} 
                  className="input" 
                  id="event_date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </Field>
              
              <Field 
                label="Event time" 
                error={errors.event_time?.message}
                required
              >
                <input 
                  type="time" 
                  {...register("event_time")} 
                  className="input" 
                  id="event_time"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field 
                label="Number of guests" 
                error={errors.guests?.message}
                required
              >
                <input 
                  type="number" 
                  min="1" 
                  max="1000"
                  {...register("guests")} 
                  className="input" 
                  id="guests"
                  placeholder="50"
                />
              </Field>
              
              <Field 
                label="Event type" 
                error={errors.eventType?.message}
              >
                <select 
                  {...register("eventType")} 
                  className="input" 
                  id="eventType"
                >
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field 
              label="Special requests or notes" 
              error={errors.notes?.message}
            >
              <textarea 
                {...register("notes")} 
                className="input min-h-[100px] resize-y" 
                id="notes"
                placeholder="Tell us about any special requirements, themes, or questions you have..."
              />
            </Field>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Where's your event?
              </h2>
              <p className="text-gray-600">
                We deliver throughout Los Angeles and surrounding areas
              </p>
            </div>

            <Field 
              label="Street address" 
              error={errors.street?.message}
              required
            >
              <input 
                {...register("street")} 
                className="input" 
                id="street"
                placeholder="123 Main Street"
              />
            </Field>

            <div className="grid sm:grid-cols-6 gap-4">
              <div className="sm:col-span-3">
                <Field 
                  label="City" 
                  error={errors.city?.message}
                  required
                >
                  <input 
                    {...register("city")} 
                    className="input" 
                    id="city"
                    placeholder="Los Angeles"
                  />
                </Field>
              </div>
              
              <div className="sm:col-span-2">
                <Field 
                  label="State" 
                  error={errors.state?.message}
                  required
                >
                  <select {...register("state")} className="input" id="state">
                    <option value="">State</option>
                    <option value="CA">California</option>
                    <option value="NV">Nevada</option>
                    <option value="AZ">Arizona</option>
                  </select>
                </Field>
              </div>
              
              <div className="sm:col-span-1">
                <Field 
                  label="ZIP" 
                  error={errors.zip?.message}
                  required
                >
                  <input 
                    {...register("zip")} 
                    className="input" 
                    id="zip"
                    placeholder="90210"
                    maxLength="5"
                  />
                </Field>
              </div>
            </div>

            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Items in your quote ({selectedItems.length})
                </h3>
                <div className="space-y-2">
                  {selectedItems.map(item => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-blue-800">
                        {item.name} × {item.qty}
                      </span>
                      <span className="font-medium text-blue-900">
                        ${(item.pricePerDay * item.qty).toFixed(2)}/day
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex justify-between font-semibold text-blue-900">
                    <span>Estimated Daily Total:</span>
                    <span>
                      ${selectedItems.reduce((sum, item) => sum + (item.pricePerDay * item.qty), 0).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    *Final pricing may vary based on delivery, setup, and additional services
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending Quote Request...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Request My Quote
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure submission • We'll respond within 24 hours</span>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children, error, required }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm" role="alert">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}