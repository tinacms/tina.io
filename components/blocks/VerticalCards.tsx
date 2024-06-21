import React from 'react';
import css from 'styled-jsx/css';

const Card = ({ cardItem }) => (
  <div className="card relative p-6 rounded-md group">
    <div className="grid-container">
      <div className="image-container">
        <img src={cardItem.image} alt={cardItem.headline} className="card-image" />
      </div>
      <div className="text-container">
        <h2 className="font-bold text-xl mb-2">{cardItem.headline}</h2>
        <p className="text-gray-700 mb-2">{cardItem.description}</p>
        <p className="text-gray-500 text-sm mb-2">{cardItem.timeDate}</p>
        <p className="text-gray-500 text-sm mb-2">{cardItem.location}</p>
        <p className="text-gray-800 font-semibold">{cardItem.price}</p>
      </div>
    </div>
    <div className="absolute inset-0 rounded-md z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
);

const VerticalCardsBlock = ({ data, index }) => {
  if (!data || !data.cardItems) return null;

  return (
    <div className="px-18">
      <h1 className="pl-3 font-tuner flex items-center justify-center text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10 pb-8">
        {data.title}
      </h1>
      <section key={`vertical-cards-${index}`} className="vertical-cards-container">
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
    display: flex;
    flex-direction: column;
  }
  .card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Three even-sized columns */
    gap: 10px;
    align-items: center;
  }
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-image {
    width: 50px; /* Set image width */
    height: 50px; /* Set image height */
    object-fit: cover;
  }
  .text-container {
    display: flex;
    flex-direction: column;
  }
  .vertical-cards-container {
    max-height: 400px; 
    overflow-y: auto;
    padding-right: 1rem; 
  }
  .vertical-cards-container::-webkit-scrollbar {
    width: 8px;
  }
  .vertical-cards-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
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
