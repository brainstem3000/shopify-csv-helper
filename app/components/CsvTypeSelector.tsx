import React from 'react';

interface CsvTypeSelectorProps {
  csvType: string;
  setCsvType: (type: string) => void;
}

const CsvTypeSelector: React.FC<CsvTypeSelectorProps> = ({ csvType, setCsvType }) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="csv-type" className="text-gray-700">
        Select CSV Type:
      </label>
      <select
        id="csv-type"
        value={csvType}
        onChange={(e) => setCsvType(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="">-- Select --</option>
        <option value="product">Product</option>
        <option value="variant">Variant</option>
      </select>
    </div>
  );
};

export default CsvTypeSelector;
