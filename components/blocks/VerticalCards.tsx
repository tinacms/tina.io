import Link from 'next/link';
import React from 'react';
import css from 'styled-jsx/css';

const Card = ({ cardItem }) => (
  <Link href={cardItem.link || "#"}>
    <div className="relative p-6 m-4 rounded-md group flex flex-col lg:flex-row bg-gradient-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105 transform-origin-center">
      <div className="w-full lg:w-1/3 lg:h-full mb-4 lg:mb-0 mr-0 lg:mr-6">
        <img src={cardItem.image} alt={cardItem.headline} className="object-cover w-full h-full" />
      </div>
      <div className="flex-grow flex flex-col">
        <h2 className="font-bold text-3xl mb-2">{cardItem.headline}</h2>
        <p className="text-gray-700 mb-2">{cardItem.description}</p>
        <p className="text-gray-500 text-md mb-1">{cardItem.timeDate}</p>
        <p className="text-gray-500 text-md mb-1">{cardItem.location}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-gray-800 font-semibold">{cardItem.price}</p>
          <p className="text-orange-500 underline pr-4">Read more</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-md z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  </Link>
);

const VerticalCardsBlock = ({ data, index }) => {
  if (!data || !data.cardItems) return null;

  return (
    <div className="md:px-18 lg:px-18 px-3 md:w-3/4 lg:w-3/4 w-full mx-auto pb-4 pt-8">
      <h1 className="pl-3 font-tuner flex items-center justify-center text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10 pb-12">
        {data.title}
      </h1>
      <section key={`vertical-cards-${index}`} className="vertical-cards-container max-h-560 overflow-y-auto pr-8 pl-8 pb-4">
        {data.cardItems.map((cardItem, idx) => (
          <Card key={`${index}-${idx}`} cardItem={cardItem} />
        ))}
      </section>
      <style jsx>{styles}</style>
    </div>
  );
};

const styles = css`
  .card {
    width: 100%;
    margin: 10px 0;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 1024px) {
    .card {
      flex-direction: row;
    }
  }
  .card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  .vertical-cards-container {
    max-height: 560px;
    overflow-y: auto;
  }
  .vertical-cards-container::-webkit-scrollbar {
    width: 8px;
  }
  .vertical-cards-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .vertical-cards-container::-webkit-scrollbar-thumb {
    background-color: rgba(255, 165, 0, 0.5);
    border-radius: 10px;
  }
  .vertical-cards-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 165, 0, 0.9);
  }
`;

export { VerticalCardsBlock };
