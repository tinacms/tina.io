import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { addToMailchimp } from '@/utils/mailchimp_helper';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export const SubscriptionForm = ({ props }) => {
  const { label } = props;
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const result = await addToMailchimp(
        formData.email,
        formData.firstName,
        formData.lastName,
      );

      if (result.result === 'success') {
        setMessage({
          text: "You've been added to the llama list!",
          type: 'success',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
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
      console.error('Error submitting form:', error);
      setMessage({
        text: 'There was an error. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col mt-4 md:mt-0">
      <form
        className="flex flex-col text-left gap-1.5 items-start w-full"
        onSubmit={handleSubmit}
      >
        <h2 className=" md:text-xl font-ibm-plex text-white">Join the Herd!</h2>
        <p className="text-sm font-light text-white/80 pb-1.5">
          Join our coding community for the latest tips and news.
        </p>
        <div className="flex flex-col gap-2.5 w-full">
          <div className="flex gap-2.5">
            <input
              className="w-full px-2 py-2 text-sm  text-white border rounded-sm border-white placeholder:text-white/70 bg-white/10"
              placeholder="First name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <input
              className="w-full px-2 py-2 text-sm bg-white/10 text-white border rounded-sm border-white placeholder:text-white/70"
              placeholder="Last name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <input
            className="w-full px-2 py-2 text-sm bg-white/10 text-white border rounded-sm border-white placeholder:text-white/70"
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
          {message.text && (
            <p
              className={`text-xs flex items-center gap-1 ${
                message.type === 'success'
                  ? 'text-green-300'
                  : message.type === 'warning'
                    ? 'text-white'
                    : 'text-white'
              }`}
            >
              {message.type === 'success' && <TiTick className="w-3 h-3" />}
              {message.type === 'warning' && (
                <IoIosWarning className="w-3 h-3" />
              )}
              {message.type === 'error' && <ImCross className="w-3 h-3" />}
              {message.text}
            </p>
          )}
          <div className="flex justify-center pt-1">
            <button
              type="submit"
              className="px-2 py-2 text-sm w-full bg-white text-orange-600 font-ibm-plex shadow-xl hover:bg-white/80 transition-colors duration-200 rounded-full "
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribe...' : label}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
