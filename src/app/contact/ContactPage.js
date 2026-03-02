'use client';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';          // React Hook Form for form handling
import { z } from 'zod';                            // Zod for schema validation
import { zodResolver } from '@hookform/resolvers/zod'; // Connects Zod with React Hook Form
import { sendContactMessage } from './actions'; // ✅ Import your Server Action
import FormError from "@/components/FormError";
import SubmitButton from "@/components/ui/SubmitButton";
import { inputClass } from "@/lib/styles";

// ✅ Define a Zod schema to validate form inputs
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.email({ message: 'Please enter a valid email address' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
});

export default function Contact() {
  // Initialize form handling with React Hook Form and Zod validation
  const {
    register,           // Function to register form inputs
    handleSubmit,       // Handles form submission
    reset,              // Resets form fields after submit
    formState: { errors, isSubmitting }, // Provides form state (errors, loading, etc.)
  } = useForm({
    resolver: zodResolver(contactSchema), // Apply Zod validation via the resolver
  });

  // Function that runs when the form is submitted
  const onSubmit = async (data) => {
    try {
      // ✅ Instead of calling an API route, directly call the Server Action
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);

      const result = await sendContactMessage(formData); // Call server action

      // Show success or error toast
      if (result.success) {
        // ✅ Show success toast and clear the form
        toast.success('Message sent successfully!');
        reset();
      } else {
        // ❌ Show an error toast with the server message (if available)
        toast.error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      // Catch any unexpected network or runtime errors
    }
  }

  // JSX for the form UI
  return (
    <div className="p-10 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className={inputClass}
          {...register('name')} // Register the input with React Hook Form
        />
        <FormError>{errors.email?.message}</FormError>

        <input
          type="email"
          placeholder="Your email"
          className={inputClass}
          {...register('email')}
        />
        <FormError>{errors.email?.message}</FormError>

        <textarea
          placeholder="Your message"
          className={inputClass}
          rows="4"
          {...register('message')}
        ></textarea>
        <FormError>{errors.message?.message}</FormError>

        <SubmitButton isLoading={isSubmitting} loadingText="Sending...">
          Send
        </SubmitButton>
      </form>
    </div >
  );
}