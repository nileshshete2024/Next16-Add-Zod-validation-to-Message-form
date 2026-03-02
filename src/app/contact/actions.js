"use server"; // Required to mark this as a server action

import { sendEmail } from "@/lib/sendEmail";

/**
 * Server Action to handle contact form submissions
 * @param {FormData} formData - Submitted form data
 */

export async function sendContactMessage(formData) {
  try {
    // Extract and sanitize form fields
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validate required fields
    if (!name || !email || !message) {
      // If any field is missing, return an object indicating failure
      return { success: false, message: "Missing fields" };
    }

    // Construct the HTML content for the email
    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    // Attempt to send the email using the sendEmail utility
    const success = await sendEmail({
      to: 'codefastsmart@gmail.com',
      subject: `Contact Form Message from ${name}`,
      html
    });

    // Return success or failure depending on whether email was sent
    if (success) {
      return { success: true };
    } else {
      return { success: false, message: "Failed to send email" };
    }

  } catch (err) {
    // Log unexpected errors for debugging
    console.error("Contact form error:", err.message, err.stack);
    // Return a generic server error to the client
    return { success: false, message: "Server error" };
  }
}