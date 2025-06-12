import { useState } from 'react';
import Papa from 'papaparse';

interface CSVImportProps {
  onImport: (rows: string[][]) => void;
}

const CSVImport = ({ onImport }: CSVImportProps) => {
  const [drag, setDrag] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const file = files[0];
    const text = await file.text();
    const result = Papa.parse<string[]>(text.trim(), {
      skipEmptyLines: true,
    });
    if (result.data) {
      onImport(result.data as string[][]);
    }
  };

  return (
    <div
      className={`csv-import ${drag ? 'drag' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        accept=".csv"
        aria-label="Upload CSV"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p>Drag & drop CSV or click to browse</p>
    </div>
  );
};

export default CSVImport;
