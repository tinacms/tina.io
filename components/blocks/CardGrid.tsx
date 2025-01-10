import { Actions } from '../blocks/ActionButton/ActionsButton';

export const CardGrid = ({ props }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-8 border border-seafoam-300 rounded-lg shadow-lg">
      {props.cards?.map((card, index) => (
        <a
          key={index}
          href={card.link}
          className="flex flex-col justify-between p-6 bg-transparent hover:bg-seafoam-100 transition-all ease-out duration-150 rounded-lg group"
        >
          <h2 className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 group-hover:from-blue-700 group-hover:via-blue-600  group-hover:to-blue-500 bg-clip-text text-transparent font-bold text-2xl leading-snug font-tuner transition-all ease-out duration-150">
            {card.title}
          </h2>

          <p className="text-gray-700">{card.description}</p>
          <div className="flex-1"></div>
          {card.linkText && (
            <Actions
              items={[
                {
                  variant: 'secondary',
                  label: card.linkText,
                  icon: 'arrowRight',
                  url: card.link,
                },
              ]}
              flush={true}
            />
          )}
        </a>
      ))}
    </div>
  );
};
