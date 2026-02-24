'use client';
import type React from 'react';
import { useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { Button, Input, Textarea } from '../ui';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  referralSource: string;
  message: string;
}

const referralOptions = [
  '',
  'Conference',
  'Google',
  'Referral',
  'Social Media',
  'Other',
];

export const ContactForm = () => {
  const defaultValues = useRef<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    referralSource: '',
    message: '',
  });
  const [formData, setFormData] = useState<FormData>(defaultValues.current);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{
    text: React.ReactNode;
    type: string;
  }>({ text: '', type: '' });

  const buildErrorMessage = () => {
    const fullName =
      [formData.firstName, formData.lastName].filter(Boolean).join(' ') ||
      'N/A';
    const subject = encodeURIComponent(`TinaCMS Contact Form: ${fullName}`);
    const body = encodeURIComponent(
      [
        `Name: ${fullName}`,
        `Email: ${formData.email}`,
        `Company: ${formData.company || 'N/A'}`,
        `How did you hear about us: ${formData.referralSource || 'N/A'}`,
        '',
        'Message:',
        formData.message,
      ].join('\n'),
    );
    const mailto = `mailto:info@tina.io?subject=${subject}&body=${body}`;
    return (
      <>
        There was an error with the form. Please{' '}
        <a href={mailto} className="underline font-semibold">
          mail us
        </a>{' '}
        directly at info@tina.io.
      </>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({
          text: "Thanks for reaching out! We'll be in touch soon.",
          type: 'success',
        });
        setFormData(defaultValues.current);
      } else {
        setMessage({
          text: buildErrorMessage(),
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessage({
        text: 'There was an error. Please try again.',
        type: 'error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="flex flex-col justify-center px-6 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10"
    >
      <h2 className="inline-block m-0 md:text-4xl font-ibm-plex text-2xl lg:text-3xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        Contact Us
      </h2>
      <p className="text-left w-full mt-2 mb-4">
        Have a question or want to learn more about TinaCMS? Fill out the form
        below and we&apos;ll get back to you.
      </p>
      {message.text && (
        <p
          className={`font-ibm-plex text-sm mb-4 flex items-center gap-2 ${
            message.type === 'success'
              ? 'text-green-500'
              : message.type === 'warning'
                ? 'text-orange-500'
                : 'text-red-500'
          }`}
        >
          {message.type === 'success' && <TiTick />}
          {message.type === 'warning' && <IoIosWarning />}
          {message.type === 'error' && <ImCross />}
          <span>{message.text}</span>
        </p>
      )}
      <div className="flex flex-col gap-1.5 md:flex-row md:gap-2 w-full md:mb-1">
        <Input
          placeholder="First name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={isProcessing}
          className="w-full"
        />
        <Input
          placeholder="Last name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={isProcessing}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 mt-2 mb-1 w-full">
        <Input
          placeholder="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isProcessing}
          required
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 mt-2 mb-1 w-full">
        <Input
          placeholder="Company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleInputChange}
          disabled={isProcessing}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 mt-2 mb-1 w-full">
        <select
          name="referralSource"
          value={formData.referralSource}
          onChange={handleInputChange}
          disabled={isProcessing}
          className="block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>
            How did you hear about us?
          </option>
          {referralOptions
            .filter((opt) => opt !== '')
            .map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5 mt-2 mb-1 w-full">
        <Textarea
          placeholder="Message *"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          disabled={isProcessing}
          required
          className="w-full"
        />
      </div>
      <div className="w-full flex justify-end mt-6">
        <Button
          type="submit"
          color="orange"
          disabled={isProcessing}
          className="px-6 py-2.5"
        >
          {isProcessing ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};
