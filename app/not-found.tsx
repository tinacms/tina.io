import NotFoundClient from './not-found-client';

export const metadata = {
  title: '404 - Page Not Found | TinaCMS',
  description: "Sorry, we couldn't find what you were looking for.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4">
      <NotFoundClient /> 
    </div>
  );
}
