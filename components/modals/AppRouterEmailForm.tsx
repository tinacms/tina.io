'use client';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import BettyWithLlama from '../../public/img/BettyWithLlama.png';
import { addToMailchimp } from '../../utils';
import { Button, Input, Textarea } from '../ui';

interface EmailFormProps {
  isFooter: boolean;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  notes?: string;
}

export const EmailForm = (props: EmailFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    notes: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage({ text: '', type: '' });
    try {
      const result = await addToMailchimp(
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.notes,
      );
      if (result.result === 'success') {
        setMessage({
          text: "You've been added to the llama list.",
          type: 'success',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          notes: '',
        });
      } else if (result.message.includes('400')) {
        setMessage({ text: "You're already in our herd!", type: 'warning' });
      } else {
        setMessage({
          text: 'There was an error. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage({
        text: 'There was an error. Please try again.',
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
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 bg-white max-w-7xl mx-auto">
      <div className="relative lg:h-full md:h-80 h-52">
        <Image
          src={BettyWithLlama}
          alt="Betty with a llama"
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`${message.text ? 'lg:pt-7 lg:pb-2' : 'lg:pt-12 lg:pb-4'}`}
      >
        <form
          id="newsletter-signup"
          onSubmit={handleSubmit}
          className={`flex flex-col justify-center pt-8 pb-6 p-10 md:p-12 lg:px-20 lg:pt-16 lg:pb-10 ${
            props.isFooter ? 'w-auto' : ''
          }`}
        >
          <h1 className="inline-block lg:text-left md:text-left sm:text-center m-0 md:text-4xl font-ibm-plex lg:text-3xl text-2xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Join the Herd! 🦙
          </h1>
          <p className="text-left w-full mt-2 mb-4">
            Become part of our coding community and stay updated with the latest
            tips and news. Learn more about the community and get llama-zing
            content delivered to your inbox!
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
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5 mt-2 mb-1 w-full">
            <Textarea
              placeholder="Notes"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleInputChange}
              disabled={isProcessing}
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
              {isProcessing ? 'Processing...' : 'Subscribe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

EmailForm.defaultProps = {
  isFooter: false,
};
