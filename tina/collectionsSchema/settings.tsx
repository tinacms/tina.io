import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const RedirectItem = ({ source, destination, permanent }) => {
  const displaySource = source ? source.replace('/', '') : '';
  const displayDestination = destination
    ? destination.replace('/', '').length === 0
      ? 'home'
      : destination.replace('/', '')
    : '';

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-medium">{displaySource}</span>
        <FaArrowRight className="text-orange-500 w-4 h-4" />
        <span className="text-green-600 font-medium">{displayDestination}</span>
      </div>
      <div
        className={`w-3 h-3 rounded-full mr-4 ${
          permanent ? 'bg-green-500' : 'border-2 border-gray-400'
        }`}
        title={permanent ? 'Permanent Redirect' : 'Temporary Redirect'}
      />
    </div>
  );
};

export const settingCollection = {
  name: 'settings',
  label: 'Settings',
  path: 'content/settings',
  format: 'json',
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
    },
    {
      name: 'sidebarTitle',
      label: 'Sidebar Title',
      type: 'string',
    },
    {
      name: 'seoDefaultTitle',
      label: 'SEO Default Title',
      type: 'string',
    },
    {
      name: 'publisher',
      label: 'Publisher',
      type: 'string',
    },
    {
      name: 'applicationName',
      label: 'Application Name',
      type: 'string',
    },
    {
      name: 'siteUrl',
      label: 'Site URL',
      type: 'string',
    },
    {
      name: 'roadmapUrl',
      label: 'Roadmap URL',
      type: 'string',
    },
    {
      name: 'licenseUrl',
      label: 'License URL',
      type: 'string',
    },
    {
      name: 'keywords',
      label: 'Keywords',
      type: 'string',
    },
    {
      name: 'docsHomepage',
      label: 'Docs Homepage',
      type: 'string',
    },
    {
      name: 'defaultOGImage',
      label: 'Default OG Image',
      type: 'image',
      uploadDir: () => 'og',
    },
    {
      name: 'social',
      label: 'Social',
      type: 'object',
      fields: [
        {
          name: 'twitterHandle',
          label: 'Twitter Handle',
          type: 'string',
        },
        {
          name: 'twitter',
          label: 'Twitter',
          type: 'string',
        },
        {
          name: 'github',
          label: 'GitHub',
          type: 'string',
        },
        {
          name: 'forum',
          label: 'Forum',
          type: 'string',
        },
      ],
    },
    {
      name: 'redirects',
      label: 'Redirects',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label:
              item.source && item.destination ? (
                <RedirectItem
                  source={item.source}
                  destination={item.destination}
                  permanent={item.permanent}
                />
              ) : (
                'Add Redirect'
              ),
          };
        },
      },
      fields: [
        {
          name: 'source',
          label: 'Source',
          type: 'string',
        },
        {
          name: 'destination',
          label: 'Destination',
          type: 'string',
        },
        {
          name: 'permanent',
          label: 'Permanent',
          type: 'boolean',
        },
      ],
    },
  ],
};
