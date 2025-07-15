import { Actions } from '../blocks/ActionButton/ActionsButton';

export const CardGrid = ({ props }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-8 gap-4">
      {props.cards?.map((card) => (
        <a
          key={card.id}
          href={card.link}
          className="flex flex-col justify-between p-6 border rounded-lg group bg-transparent hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out transition-all ease-out duration-150 transition-all ease-out duration-150"
        >
          <h2 className="bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 group-hover:from-blue-700 group-hover:via-blue-600  group-hover:to-blue-500 bg-clip-text text-transparent font-bold text-2xl leading-snug font-ibm-plex transition-all ease-out duration-150">
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
