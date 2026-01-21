import { Popover, PopoverButton, Transition, PopoverPanel } from '@headlessui/react';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';


import * as MdIcons from 'react-icons/md'
import { GoCircleSlash } from 'react-icons/go';
import { Button, wrapFieldsWithMeta } from 'tinacms';


const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(' ');
  } else {
    return name;
  }
};

export const IconOptions = {
  ...MdIcons,
};

const iconColorClass: {
  [name: string]: { regular: string; circle: string };
} = {
  blue: {
    regular: 'text-blue-400',
    circle: 'bg-blue-400 text-blue-50',
  },
  teal: {
    regular: 'text-teal-400',
    circle: 'bg-teal-400 text-teal-50',
  },
  green: {
    regular: 'text-green-400',
    circle: 'bg-green-400 text-green-50',
  },
  red: {
    regular: 'text-red-400',
    circle: 'bg-red-400 text-red-50',
  },
  pink: {
    regular: 'text-pink-400',
    circle: 'bg-pink-400 text-pink-50',
  },
  purple: {
    regular: 'text-purple-400',
    circle: 'bg-purple-400 text-purple-50',
  },
  orange: {
    regular: 'text-orange-400',
    circle: 'bg-orange-400 text-orange-50',
  },
  yellow: {
    regular: 'text-yellow-400',
    circle: 'bg-yellow-400 text-yellow-50',
  },
  white: {
    regular: 'text-white opacity-80',
    circle: 'bg-white-400 text-white-50',
  },
};

const iconSizeClass = {
  xs: 'w-6 h-6 shrink-0',
  small: 'w-8 h-8 shrink-0',
  medium: 'w-12 h-12 shrink-0',
  large: 'w-14 h-14 shrink-0',
  xl: 'w-16 h-16 shrink-0',
  custom: '',
};

export const Icon = ({ data, parentColor = '', className = '', tinaField = '' }) => {

  
  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return null;
  }

  const { name, color, size = 'medium', style = 'regular' } = data;

  
  const IconSVG = IconOptions[name];

  const iconSizeClasses = typeof size === 'string' ? iconSizeClass[size] : iconSizeClass[Object.keys(iconSizeClass)[size]];

  const iconColor = color && color !== 'primary' ? color : 'blue';

  if (style == 'circle') {
    return (
      <div
        {...(tinaField ? { 'data-tina-field': tinaField } : {})} // only render data-tina-field if it exists
        className={`relative z-10 inline-flex items-center justify-center shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <IconSVG className='w-2/3 h-2/3' />
      </div>
    );
  } else {
    const iconColorClasses = iconColorClass[parentColor === 'primary' && iconColor === 'blue' ? 'white' : iconColor!].regular;
    return (
      <IconSVG
        {...(tinaField ? { 'data-tina-field': tinaField } : {})} // only render data-tina-field if it exists
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
      />
    );
  }
};



export const IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [filter, setFilter] = React.useState('');
  const filteredBlocks = React.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);

  const inputLabel = Object.keys(IconOptions).includes(input.value) ? parseIconName(input.value) : 'Select Icon';

  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;

  return (
    <div className='relative z-[1000]'>
      <input type='text' id={input.name} className='hidden' {...input} />
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton>
              <Button className={`text-sm h-11 px-4 ${InputIcon ? 'h-11' : 'h-10'}`} size='custom' rounded='full' variant={open ? 'secondary' : 'white'}>
                {InputIcon && <InputIcon className='w-7 mr-1 h-auto fill-current text-blue-500' />}
                {inputLabel}
                {!InputIcon && <BiChevronRight className='w-5 h-auto fill-current opacity-70 ml-1' />}
              </Button>
            </PopoverButton>
            <div className='absolute w-full min-w-[192px] max-w-2xl -bottom-2 left-0 translate-y-full' style={{ zIndex: 1000 }}>
              <Transition
                enter='transition duration-150 ease-out'
                enterFrom='transform opacity-0 -translate-y-2'
                enterTo='transform opacity-100 translate-y-0'
                leave='transition duration-75 ease-in'
                leaveFrom='transform opacity-100 translate-y-0'
                leaveTo='transform opacity-0 -translate-y-2'
              >
                <PopoverPanel className='relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50'>
                  {({ close }) => (
                    <div className='max-h-[24rem] flex flex-col w-full h-full'>
                      <div className='bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm'>
                        <input
                          type='text'
                          className='bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200'
                          onClick={(event: any) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          value={filter}
                          onChange={(event: any) => {
                            setFilter(event.target.value);
                          }}
                          placeholder='Filter...'
                        />
                      </div>
                      {filteredBlocks.length === 0 && (
                        <span className='relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic'>No matches found</span>
                      )}
                      {filteredBlocks.length > 0 && (
                        <div className='w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto'>
                          <button
                            className='relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50'
                            key={'clear-input'}
                            onClick={() => {
                              input.onChange('');
                              setFilter('');
                              close();
                            }}
                          >
                            <GoCircleSlash className='w-6 h-auto text-gray-200' />
                          </button>
                          {filteredBlocks.map((name) => {
                            return (
                              <button
                                className='relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50'
                                key={name}
                                onClick={() => {
                                  input.onChange(name);
                                  setFilter('');
                                  close();
                                }}
                              >
                                <Icon
                                  data={{
                                    name: name,
                                    size: 'custom',
                                    color: 'blue',
                                  }}
                                  className='w-7 h-auto'
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PopoverPanel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
});