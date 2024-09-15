import React, { useState } from 'react';
import Papa from 'papaparse';
import FileUpload from '../components/FileUpload';
import CsvTypeSelector from '../components/CsvTypeSelector';
import ResultsDisplay from '../components/ResultsDisplay';
import { requiredColumns } from '../utils/requiredColumns';

const HomePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvType, setCsvType] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleAnalyze = () => {
    if (file && csvType) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          validateCsv(result.meta.fields);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  const validateCsv = (headers: string[]) => {
    const required = requiredColumns[csvType as 'product' | 'variant'];
    const missingColumns: string[] = [];
    const incorrectColumns: { expected: string; found: string }[] = [];
    const extraColumns: string[] = [];

    const trimmedHeaders = headers.map((header) => header.trim());

    required.forEach((col) => {
      if (!trimmedHeaders.includes(col)) {
        // Check for case-insensitive matches or extra whitespace
        const potentialMatches = headers.filter(
          (header) => header.trim().toLowerCase() === col.toLowerCase()
        );
        if (potentialMatches.length > 0) {
          incorrectColumns.push({
            expected: col,
            found: potentialMatches[0],
          });
        } else {
          missingColumns.push(col);
        }
      }
    });

    trimmedHeaders.forEach((header) => {
      if (!required.includes(header)) {
        extraColumns.push(header);
      }
    });

    const messages = [];

    if (missingColumns.length > 0) {
      messages.push(`Missing columns: ${missingColumns.join(', ')}`);
    }

    if (incorrectColumns.length > 0) {
      incorrectColumns.forEach((col) => {
        messages.push(
          `Column "${col.found}" should be "${col.expected}"`
        );
      });
    }

    if (extraColumns.length > 0) {
      messages.push(`Extra columns detected: ${extraColumns.join(', ')}`);
    }

    setResults({
      success: messages.length === 0,
      messages,
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Shopify CSV Helper</h1>
      <div className="space-y-6">
        <FileUpload onFileSelect={handleFileSelect} />
        <CsvTypeSelector csvType={csvType} setCsvType={setCsvType} />
        <button
          onClick={handleAnalyze}
          disabled={!file || !csvType}
          className={`${
            !file || !csvType
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold py-2 px-4 rounded`}
        >
          Analyze
        </button>
        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        <ResultsDisplay results={results} />
      </div>
    </div>
  );
};

export default HomePage;
