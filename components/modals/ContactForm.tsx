'use client';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { addToMailchimp } from '@/utils/mailchimp_helper';
import { Button } from '../ui';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  partnerType: string;
  portfolioUrl: string;
  agencySize: string;
  availability: string;
  tinaExperience: string;
  referralSource: string;
  message: string;
  subscribeNewsletter: boolean;
}

const partnerTypeOptions = ['Sole developer', 'Agency'];
const agencySizeOptions = ['1–5', '6–20', '21–50', '50+'];
const availabilityOptions = ['Full-time', 'Part-time', 'Project-based'];

type ContactVariant = 'contact' | 'partner';

interface ContactFormProps {
  variant?: ContactVariant;
}

// Copy + behaviour per variant. `inquiryType` is sent to /api/contact so the
// email is tagged (e.g. so partner applications are easy to triage).
const VARIANTS: Record<
  ContactVariant,
  {
    heading: string;
    intro: string;
    messagePlaceholder: string;
    submitLabel: string;
    inquiryType?: string;
    showNewsletter: boolean;
  }
> = {
  contact: {
    heading: 'Contact Us',
    intro:
      "Have a question or want to learn more about TinaCMS? Fill out the form below and we'll get back to you.",
    messagePlaceholder: 'Message *',
    submitLabel: 'Send',
    showNewsletter: true,
  },
  partner: {
    heading: 'Become a Partner',
    intro:
      "Tell us about yourself and the work you do. We'll be in touch about joining the TinaCMS partner program.",
    messagePlaceholder: 'Tell us about your work *',
    submitLabel: 'Apply',
    inquiryType: 'Partner application',
    showNewsletter: false,
  },
};

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
  phone: '',
  company: '',
  partnerType: '',
  portfolioUrl: '',
  agencySize: '',
  availability: '',
  tinaExperience: '',
  referralSource: '',
  message: '',
  subscribeNewsletter: false,
};

export const ContactForm = ({ variant = 'contact' }: ContactFormProps) => {
  const config = VARIANTS[variant];
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isAgency = formData.partnerType === 'Agency';
  const isSoleDeveloper = formData.partnerType === 'Sole developer';
  const companyPlaceholder =
    variant === 'partner'
      ? isAgency
        ? 'Agency name'
        : 'Company (optional)'
      : 'Company';
  const messagePlaceholder = isAgency
    ? 'Tell us about your agency *'
    : config.messagePlaceholder;
  const partnerFieldsComplete =
    variant !== 'partner' ||
    (Boolean(formData.partnerType) &&
      Boolean(formData.tinaExperience) &&
      Boolean(formData.portfolioUrl) &&
      (isAgency ? Boolean(formData.agencySize) : true) &&
      (isSoleDeveloper ? Boolean(formData.availability) : true));
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
        body: JSON.stringify({ ...formData, inquiryType: config.inquiryType }),
      });

      if (response.ok) {
        if (formData.subscribeNewsletter) {
          await addToMailchimp(
            formData.email,
            formData.firstName,
            formData.lastName,
          );
        }
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
      <div className="flex items-center gap-3">
        <Image
          src="/img/brand-assets/llama.svg"
          alt="Tina llama"
          width={48}
          height={48}
          className="w-12 h-12"
        />
        <h2 className="inline-block m-0 md:text-4xl font-ibm-plex text-2xl lg:text-3xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          {config.heading}
        </h2>
      </div>
      <p className="text-left w-full">{config.intro}</p>
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
          placeholder="First name *"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={isProcessing}
          required
          className="w-full"
        />
        <Input
          placeholder="Last name *"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={isProcessing}
          required
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
        placeholder="Phone number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        disabled={isProcessing}
        className="w-full"
      />
      <Input
        placeholder={companyPlaceholder}
        name="company"
        type="text"
        value={formData.company}
        onChange={handleInputChange}
        disabled={isProcessing}
        className="w-full"
      />
      {variant === 'partner' && (
        <>
          <Select
            value={formData.partnerType}
            onValueChange={(value) =>
              // Reset the type-specific answers when switching so hidden fields
              // don't get submitted with stale values.
              setFormData((prev) => ({
                ...prev,
                partnerType: value,
                agencySize: '',
                availability: '',
              }))
            }
            disabled={isProcessing}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Are you a sole developer or an agency? *" />
            </SelectTrigger>
            <SelectContent>
              {partnerTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isAgency && (
            <>
              <Input
                placeholder="Agency website *"
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                disabled={isProcessing}
                required
                className="w-full"
              />
              <Select
                value={formData.agencySize}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, agencySize: value }))
                }
                disabled={isProcessing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="How many developers on your team? *" />
                </SelectTrigger>
                <SelectContent>
                  {agencySizeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {isSoleDeveloper && (
            <>
              <Input
                placeholder="Portfolio, GitHub, or website *"
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                disabled={isProcessing}
                required
                className="w-full"
              />
              <Select
                value={formData.availability}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, availability: value }))
                }
                disabled={isProcessing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="What's your availability? *" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <Textarea
            placeholder="How much have you worked with TinaCMS before? *"
            name="tinaExperience"
            rows={3}
            value={formData.tinaExperience}
            onChange={handleInputChange}
            disabled={isProcessing}
            required
            className="w-full resize-y"
          />
        </>
      )}
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
        placeholder={messagePlaceholder}
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleInputChange}
        disabled={isProcessing}
        required
        className="w-full min-h-[100px] resize-y"
      />
      {config.showNewsletter && (
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                subscribeNewsletter: e.target.checked,
              }))
            }
            disabled={isProcessing}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
          />
          <span className="text-sm text-gray-600">
            Subscribe to the TinaCMS newsletter
          </span>
        </label>
      )}
      <div className="w-full flex justify-end">
        <Button
          type="submit"
          color="orange"
          disabled={
            isProcessing ||
            !isValidEmail ||
            !formData.message ||
            !partnerFieldsComplete
          }
          className="px-6 py-2.5"
        >
          {isProcessing ? 'Sending...' : config.submitLabel}
        </Button>
      </div>
    </form>
  );
};
