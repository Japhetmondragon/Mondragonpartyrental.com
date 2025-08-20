import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../api/client";
import toast from "react-hot-toast";

export const LeadSchema = z.object({
  firstName:z.string().min(1,"Required"),
  lastName:z.string().min(1,"Required"),
  email:z.string().email("Invalid email"),
  phone:z.string().min(7,"Phone required"),
  event_date:z.string().min(1,"Date required"),
  event_time:z.string().min(1,"Time required"),
  guests:z.coerce.number().min(0,"Guests required"),
  street:z.string().min(1,"Street required"),
  city:z.string().min(1,"City required"),
  state:z.string().min(1,"State required"),
  zip:z.string().min(4,"ZIP required"),
  notes:z.string().optional(),
  recaptcha:z.string().optional()
});

export default function LeadForm({ selectedItems = [], onSubmitted }){
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(LeadSchema),
    defaultValues:{ guests: 50 }
  });

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(async (v)=>{
      const payload = {
        firstName:v.firstName, lastName:v.lastName, email:v.email, phone:v.phone,
        event_date:v.event_date, event_time:v.event_time,
        address:{ street:v.street, city:v.city, state:v.state, zip:v.zip },
        guests:v.guests, notes:v.notes, items: selectedItems.map(i=>({ itemId:i._id, qty:i.qty || 1 })),
        recaptcha:v.recaptcha
      };
      await api.post("/leads", payload);
      toast.success("Thanks! We’ll reach out shortly.");
      reset();
      onSubmitted?.();
    })}>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="First name" error={errors.firstName?.message}><input {...register("firstName")} className="input" id="firstName"/></Field>
        <Field label="Last name" error={errors.lastName?.message}><input {...register("lastName")} className="input" id="lastName"/></Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Email" error={errors.email?.message}><input type="email" {...register("email")} className="input" id="email"/></Field>
        <Field label="Phone" error={errors.phone?.message}><input {...register("phone")} className="input" id="phone"/></Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Event date" error={errors.event_date?.message}><input type="date" {...register("event_date")} className="input" id="event_date"/></Field>
        <Field label="Event time" error={errors.event_time?.message}><input type="time" {...register("event_time")} className="input" id="event_time"/></Field>
        <Field label="Guests" error={errors.guests?.message}><input type="number" min="0" {...register("guests")} className="input" id="guests"/></Field>
      </div>
      <div className="grid sm:grid-cols-4 gap-3">
        <Field label="Street" error={errors.street?.message}><input {...register("street")} className="input" id="street"/></Field>
        <Field label="City" error={errors.city?.message}><input {...register("city")} className="input" id="city"/></Field>
        <Field label="State" error={errors.state?.message}><input {...register("state")} className="input" id="state"/></Field>
        <Field label="ZIP" error={errors.zip?.message}><input {...register("zip")} className="input" id="zip"/></Field>
      </div>
      {/* reCAPTCHA widget placeholder: set v.recaptcha before submit */}
      <button disabled={isSubmitting} className="rounded-lg bg-blue-600 text-white px-4 py-2 focus:outline-none focus:ring-2">
        {isSubmitting ? "Sending…" : "Request Quote"}
      </button>
    </form>
  );
}

function Field({ label, children, error }){
  return (
    <label className="text-sm block">
      <span className="block mb-1 font-medium">{label}</span>
      {children}
      {error && <span role="alert" className="text-red-600 text-xs">{error}</span>}
    </label>
  );
}
