'use client';
import type React from 'react';
import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { Button } from '../ui';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  referralSource: string;
  message: string;
}

const referralOptions = [
  'Conference',
  'Google',
  'Referral',
  'Social Media',
  'Other',
];

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  referralSource: '',
  message: '',
};

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
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
        setFormData(initialFormData);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      className="flex flex-col justify-center px-6 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10 gap-4"
    >
      <h2 className="inline-block m-0 md:text-4xl font-ibm-plex text-2xl lg:text-3xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        Contact Us
      </h2>
      <p className="text-left w-full">
        Have a question or want to learn more about TinaCMS? Fill out the form
        below and we&apos;ll get back to you.
      </p>
      {message.text && (
        <div
          className={`font-ibm-plex text-sm flex items-center gap-2 ${
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
              <span className="text-black font-semibold">info@tina.io</span>
              <button
                type="button"
                onClick={copyEmail}
                className="ml-1 align-middle inline-flex items-center text-gray-500 hover:text-black transition-colors"
                title="Copy email address"
              >
                {copied ? (
                  <TiTick className="text-green-500 w-4 h-4" />
                ) : (
                  <BiCopy className="w-3.5 h-3.5" />
                )}
              </button>
            </span>
          ) : (
            <span>{message.text}</span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-4 md:flex-row w-full">
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
      <Input
        placeholder="Company"
        name="company"
        type="text"
        value={formData.company}
        onChange={handleInputChange}
        disabled={isProcessing}
        className="w-full"
      />
      <Select
        value={formData.referralSource}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, referralSource: value }))
        }
        disabled={isProcessing}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="How did you hear about us?" />
        </SelectTrigger>
        <SelectContent>
          {referralOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Message *"
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleInputChange}
        disabled={isProcessing}
        required
        className="w-full min-h-[100px] resize-y"
      />
      <div className="w-full flex justify-end">
        <Button
          type="submit"
          color="orange"
          disabled={isProcessing || !formData.email || !formData.message}
          className="px-6 py-2.5"
        >
          {isProcessing ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};
