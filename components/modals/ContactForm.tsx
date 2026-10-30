'use client';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import {
  BODY,
  BODY_SMALL,
  CARD_TITLE,
  FIELD,
  LINK,
} from '@/component/styles/typography';
import { StatusMessage, type StatusType } from '@/component/ui/StatusMessage';
import { Input } from '@/components/ui/input';
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
  githubUrl: string;
  agencySize: string;
  availability: string;
  tinaSites: string;
  tinaExperience: string;
  referralSource: string;
  message: string;
  subscribeNewsletter: boolean;
}

const partnerTypeOptions = ['Sole developer', 'Agency'];
const agencySizeOptions = ['1-5', '6-20', '21-50', '50+'];
const availabilityOptions = ['Full-time', 'Part-time', 'Project-based'];

// A native <select> so `required` is enforced by the browser exactly like the
// text fields — Radix's Select renders a hidden native select that browsers
// won't report validity on (radix-ui/primitives#1592), which left it as the
// only control in the form that could be submitted empty.
// Styling mirrors `Input`; the empty first option is the placeholder. A select
// has no ::placeholder, so the empty state takes FIELD's placeholder colour.
const FormSelect = ({
  name,
  placeholder,
  options,
  value,
  onChange,
  required,
  disabled,
}: {
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="relative w-full">
    <select
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      disabled={disabled}
      // `bg-none` drops the chevron @tailwindcss/forms paints onto every
      // select, which would otherwise sit under the icon below.
      className={`flex h-10 w-full appearance-none rounded-[5px] border-0 bg-white bg-none pl-4 pr-10 ${FIELD} shadow-input transition-shadow duration-[85ms] ease-out hover:shadow-input-hover focus:shadow-input-focus outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50`}
      // FIELD shows an empty select in the placeholder grey.
      data-empty={value ? undefined : ''}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option} className={FIELD}>
          {option}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
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
  githubUrl: '',
  agencySize: '',
  availability: '',
  tinaSites: '',
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
        ? 'Agency name *'
        : 'Company (optional)'
      : 'Company';
  const messagePlaceholder = isAgency
    ? 'Tell us about your agency *'
    : config.messagePlaceholder;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: StatusType | '';
  }>({ text: '', type: '' });
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

  // `type="url"` rejects a bare domain, which is what people type into a
  // "portfolio or website" box. Add the scheme for them rather than blocking.
  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmed = value.trim();
    if (!trimmed || /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: `https://${trimmed}`,
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
        <h2 className={`inline-block m-0 ${CARD_TITLE}`}>{config.heading}</h2>
      </div>
      <p className={`text-left w-full ${BODY}`}>{config.intro}</p>
      {message.type && (
        <StatusMessage type={message.type}>
          {message.type === 'error' ? (
            <>
              There was an error with the form. Please email us directly at{' '}
              <a href="mailto:info@tina.io" className={LINK}>
                info@tina.io
              </a>
              .
            </>
          ) : (
            message.text
          )}
        </StatusMessage>
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
        // type="email" alone accepts "a@b"; the pattern keeps the stricter
        // domain.tld rule while letting the browser report it on the field.
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        title="Enter a valid email address, e.g. name@example.com"
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
        required={isAgency}
        className="w-full"
      />
      {variant === 'partner' && (
        <>
          <FormSelect
            name="partnerType"
            required
            placeholder="Are you a sole developer or an agency? *"
            options={partnerTypeOptions}
            value={formData.partnerType}
            onChange={(e) =>
              // Reset the type-specific answers when switching so hidden fields
              // don't get submitted with stale values.
              setFormData((prev) => ({
                ...prev,
                partnerType: e.target.value,
                agencySize: '',
                availability: '',
              }))
            }
            disabled={isProcessing}
          />
          {isAgency && (
            <>
              <Input
                placeholder="Agency website *"
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                onBlur={handleUrlBlur}
                disabled={isProcessing}
                required
                className="w-full"
              />
              <FormSelect
                name="agencySize"
                required
                placeholder="How many developers on your team? *"
                options={agencySizeOptions}
                value={formData.agencySize}
                onChange={handleInputChange}
                disabled={isProcessing}
              />
            </>
          )}
          {isSoleDeveloper && (
            <>
              <Input
                placeholder="Portfolio or website *"
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                onBlur={handleUrlBlur}
                disabled={isProcessing}
                required
                className="w-full"
              />
              <FormSelect
                name="availability"
                required
                placeholder="What's your availability? *"
                options={availabilityOptions}
                value={formData.availability}
                onChange={handleInputChange}
                disabled={isProcessing}
              />
            </>
          )}
          <Textarea
            placeholder="Sites you've built with TinaCMS *"
            name="tinaSites"
            rows={3}
            value={formData.tinaSites}
            onChange={handleInputChange}
            disabled={isProcessing}
            required
            className="w-full resize-y"
          />
          <Input
            placeholder={
              isAgency
                ? 'GitHub organisation or profile (optional)'
                : 'GitHub profile *'
            }
            name="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={handleInputChange}
            onBlur={handleUrlBlur}
            disabled={isProcessing}
            required={!isAgency}
            className="w-full"
          />
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
      <FormSelect
        name="referralSource"
        placeholder="How did you hear about us?"
        options={referralOptions}
        value={formData.referralSource}
        onChange={handleInputChange}
        disabled={isProcessing}
      />
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
          <span className={BODY_SMALL}>
            Subscribe to the TinaCMS newsletter
          </span>
        </label>
      )}
      <div className="w-full flex justify-end">
        <Button
          type="submit"
          level="primary"
          disabled={isProcessing || !isValidEmail}
        >
          {isProcessing ? 'Sending...' : config.submitLabel}
        </Button>
      </div>
    </form>
  );
};
