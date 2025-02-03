import React, { useState } from 'react';

interface CarouselExampleProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

export function CarouselExample({ title, code, children }: CarouselExampleProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-8 border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>
      <div className="p-4 bg-white">{children}</div>
      {showCode && (
        <div className="bg-gray-50 p-4 border-t">
          <pre className="text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}