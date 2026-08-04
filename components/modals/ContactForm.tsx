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
const agencySizeOptions = ['1-5', '6-20', '21-50', '50+'];
const availabilityOptions = ['Full-time', 'Part-time', 'Project-based'];

// Radix's Select renders a hidden native select that browsers won't report
// validity on, so this form can't use native constraint validation for the
// selects (https://github.com/radix-ui/primitives/issues/1592). Rather than
// have selects look different to every other field, the form is `noValidate`
// and every field is validated here — one look, one behaviour, every browser.
const ERROR_RING = 'ring-2 ring-red-500';

const FieldError = ({ id, error }: { id: string; error?: string }) =>
  error ? (
    <p id={id} className="mt-1 text-sm text-red-500">
      {error}
    </p>
  ) : null;

const FormInput = ({
  name,
  error,
  ...props
}: React.ComponentProps<typeof Input> & { name: string; error?: string }) => (
  <div className="w-full">
    <Input
      {...props}
      name={name}
      className={`w-full ${error ? ERROR_RING : ''}`}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    <FieldError id={`${name}-error`} error={error} />
  </div>
);

const FormTextarea = ({
  name,
  error,
  className = '',
  ...props
}: React.ComponentProps<typeof Textarea> & {
  name: string;
  error?: string;
}) => (
  <div className="w-full">
    <Textarea
      {...props}
      name={name}
      className={`w-full ${className} ${error ? ERROR_RING : ''}`}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    <FieldError id={`${name}-error`} error={error} />
  </div>
);

const FormSelect = ({
  name,
  placeholder,
  options,
  value,
  onValueChange,
  disabled,
  error,
}: {
  name?: string;
  placeholder: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}) => (
  <div className="w-full">
    <Select
      name={name}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={`w-full ${error ? ERROR_RING : ''}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && name ? `${name}-error` : undefined}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <FieldError id={`${name}-error`} error={error} />
  </div>
);

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Only the partner variant has required selects, and which ones are required
  // depends on the partner type currently chosen. Everything else is left to
  // the browser's own constraint validation, read back in `collectErrors`.
  const requiredSelects =
    variant === 'partner'
      ? [
          { name: 'partnerType', value: formData.partnerType },
          ...(isAgency
            ? [{ name: 'agencySize', value: formData.agencySize }]
            : []),
          ...(isSoleDeveloper
            ? [{ name: 'availability', value: formData.availability }]
            : []),
        ]
      : [];

  const collectErrors = (form: HTMLFormElement) => {
    const found: Record<string, string> = {};
    for (const el of Array.from(form.elements)) {
      const field = el as HTMLInputElement | HTMLTextAreaElement;
      if (!field.name || field.validity?.valid !== false) {
        continue;
      }
      // For format failures the browser says "Please match the requested
      // format", which tells the user nothing — prefer the field's own title.
      const badFormat =
        field.validity.patternMismatch || field.validity.typeMismatch;
      found[field.name] =
        badFormat && field.title ? field.title : field.validationMessage;
    }
    for (const { name, value } of requiredSelects) {
      if (!value) {
        found[name] = 'Please select an option';
      }
    }
    return found;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('info@tina.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = collectErrors(e.currentTarget);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }
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
        setErrors({});
      } else {
        setMessage({
          text: '',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessage({
        text: '',
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
    clearError(name);
  };

  // Once a field has been flagged, drop its error as soon as it's touched
  // rather than leaving stale red text under a field being corrected.
  function clearError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }
      const { [name]: _removed, ...rest } = prev;
      return rest;
    });
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      // The browser still computes validity from the attributes below; only
      // its popup bubbles are suppressed, so every field reports inline.
      noValidate
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
      {message.type && (
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
        <FormInput
          placeholder="First name *"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={isProcessing}
          required
          error={errors.firstName}
        />
        <FormInput
          placeholder="Last name *"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={isProcessing}
          required
          error={errors.lastName}
        />
      </div>
      <FormInput
        placeholder="Email *"
        name="email"
        type="email"
        // type="email" alone accepts "a@b"; the pattern keeps the stricter
        // domain.tld rule. `title` becomes the message the browser reports.
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        title="Enter a valid email address, e.g. name@example.com"
        value={formData.email}
        onChange={handleInputChange}
        disabled={isProcessing}
        required
        error={errors.email}
      />
      <FormInput
        placeholder="Phone number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        disabled={isProcessing}
        error={errors.phone}
      />
      <FormInput
        placeholder={companyPlaceholder}
        name="company"
        type="text"
        value={formData.company}
        onChange={handleInputChange}
        disabled={isProcessing}
        error={errors.company}
      />
      {variant === 'partner' && (
        <>
          <FormSelect
            name="partnerType"
            placeholder="Are you a sole developer or an agency? *"
            options={partnerTypeOptions}
            value={formData.partnerType}
            onValueChange={(value) => {
              // Reset the type-specific answers when switching so hidden fields
              // don't get submitted with stale values.
              setFormData((prev) => ({
                ...prev,
                partnerType: value,
                agencySize: '',
                availability: '',
              }));
              clearError('partnerType');
            }}
            disabled={isProcessing}
            error={errors.partnerType}
          />
          {isAgency && (
            <>
              <FormInput
                placeholder="Agency website *"
                name="portfolioUrl"
                type="url"
                title="Enter a full URL, e.g. https://example.com"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                disabled={isProcessing}
                required
                error={errors.portfolioUrl}
              />
              <FormSelect
                name="agencySize"
                placeholder="How many developers on your team? *"
                options={agencySizeOptions}
                value={formData.agencySize}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, agencySize: value }));
                  clearError('agencySize');
                }}
                disabled={isProcessing}
                error={errors.agencySize}
              />
            </>
          )}
          {isSoleDeveloper && (
            <>
              <FormInput
                placeholder="Portfolio, GitHub, or website *"
                name="portfolioUrl"
                type="url"
                title="Enter a full URL, e.g. https://example.com"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                disabled={isProcessing}
                required
                error={errors.portfolioUrl}
              />
              <FormSelect
                name="availability"
                placeholder="What's your availability? *"
                options={availabilityOptions}
                value={formData.availability}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, availability: value }));
                  clearError('availability');
                }}
                disabled={isProcessing}
                error={errors.availability}
              />
            </>
          )}
          <FormTextarea
            placeholder="How much have you worked with TinaCMS before? *"
            name="tinaExperience"
            rows={3}
            value={formData.tinaExperience}
            onChange={handleInputChange}
            disabled={isProcessing}
            required
            className="resize-y"
            error={errors.tinaExperience}
          />
        </>
      )}
      <FormSelect
        placeholder="How did you hear about us?"
        options={referralOptions}
        value={formData.referralSource}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, referralSource: value }))
        }
        disabled={isProcessing}
      />
      <FormTextarea
        placeholder={messagePlaceholder}
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleInputChange}
        disabled={isProcessing}
        required
        className="min-h-[100px] resize-y"
        error={errors.message}
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
          disabled={isProcessing}
          className="px-6 py-2.5"
        >
          {isProcessing ? 'Sending...' : config.submitLabel}
        </Button>
      </div>
    </form>
  );
};
