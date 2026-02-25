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
  const [message, setMessage] = useState({ text: '', type: '' });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('info@tina.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          text: 'error',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessage({
        text: 'error',
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
        <div
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
          {message.type === 'error' && <ImCross className="shrink-0" />}
          {message.type === 'error' ? (
            <span>
              There was an error with the form. Please email us directly at{' '}
              <span className="text-orange-500 font-semibold">
                info@tina.io
              </span>
              <button
                type="button"
                onClick={copyEmail}
                className="ml-1 align-middle inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                title="Copy email address"
              >
                {copied ? (
                  <TiTick className="text-green-500 w-4 h-4" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                    role="img"
                    aria-label="Copy"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </span>
          ) : (
            <span>{message.text}</span>
          )}
        </div>
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
