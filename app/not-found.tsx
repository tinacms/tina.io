import NotFoundClient from './not-found-client';

export const metadata = {
  title: '404 - Page Not Found | TinaCMS',
  description: "We couldn't find your baby llama, check pen 404.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4">
      <NotFoundClient /> 
    </div>
  );
}
