export const versionComponents = {
    h1: (props) => <h1 className="text-lg font-bold mt-8 mb-4" {...props} />,
    h2: (props) => <h2 className="text-lg font-semibold mt-6 mb-4" {...props} />,
    h3: (props) => <h3 className="text-lg font-semibold mt-5 mb-3" {...props} />,
    h4: (props) => <h4 className="text-lg font-medium mt-4 mb-3" {...props} />,
    h5: (props) => <h5 className="text-lg font-medium mt-3 mb-2" {...props} />,
    h6: (props) => <h6 className="text-base font-medium mt-2 mb-2" {...props} />,
    ul: (props) => <ul className="list-disc ml-5 mb-4" {...props} />,
    ol: (props) => <ol className="list-decimal ml-5 mb-4" {...props} />,
    li: (props) => <li className="mb-2" {...props} />
  };