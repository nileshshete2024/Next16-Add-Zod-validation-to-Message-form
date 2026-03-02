// Mark this as a Client Component in Next.js  to use hooks: useState, useEffect
'use client';

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputClass } from "@/lib/styles";
import SubmitButton from "@/components/ui/SubmitButton";
import FormError from "@/components/FormError";
import CourseCard from "@/components/CourseCard";

// ✅ Define Zod schema
const messageSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Message cannot be empty" })
    .max(500, { message: "Message is too long" }),
});

export default function MessagesPage() {
  // -------------------------------------------------------------
  // Get the current authentication status
  // (e.g. "authenticated", "unauthenticated", or "loading") from NextAuth
  // -------------------------------------------------------------
  const { status } = useSession();

  // -------------------------------------------------------------
  // ✅ React Hook Form setup
  // -------------------------------------------------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: { text: "" },
  });

  const onSubmit = async (values) => {

  };

  // -------------------------------------------------------------
  // 🔐 Handle auth states
  // -------------------------------------------------------------
  if (status === "loading") {
    return <p className="p-6 text-center">Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">You must be logged in to view messages.</p>
        {/* Trigger the NextAuth sign-in flow when the user clicks the Login button */}
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Login
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------
  // UI Rendering
  // -------------------------------------------------------------
  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4">💬 Chat Rooms</h1>

      {/* Responsive two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Sticky Course Card */}
        <div className="lg:w-2/5 xl:w-1/3">

        </div>

        {/* 💬 Right: Messages + Form */}
        <div className="flex-1">
          {/* Message List */}

          {/* Message Input Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
            {/* Input field for typing new message */}
            <input
              type="text"
              placeholder="Type a message..."
              required
              disabled={isSubmitting} // Disable input while sending
              className={inputClass}
              {...register("text")}
            />
            <FormError>{errors.text?.message}</FormError>

            {/* Submit button */}
            <SubmitButton isLoading={isSubmitting} loadingText="Sending...">
              Send
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}