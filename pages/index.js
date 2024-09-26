import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setConvertedUrl(data.url);
    } else {
      console.error('Error converting image');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4">JFIFfff to JPEG Converter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="file" accept=".jfif" onChange={handleFileChange} required />
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Convert
        </button>
      </form>
      {convertedUrl && (
        <div className="mt-4">
          <h2 className="text-2xl">Converted Image:</h2>
          <img src={convertedUrl} alt="Converted" className="mt-2" />
        </div>
      )}
    </div>
  );
}
