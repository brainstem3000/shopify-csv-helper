import React from 'react';

interface ValidationResult {
  success: boolean;
  messages: string[];
}

interface ResultsDisplayProps {
  results: ValidationResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="mt-6">
      {results.success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>Your CSV file meets all the requirements!</p>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">We found some issues with your CSV file:</p>
          <ul className="list-disc list-inside">
            {results.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
