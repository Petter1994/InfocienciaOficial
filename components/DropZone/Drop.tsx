'use client';
import { useState } from 'react';

export default function ImgBBUploader() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=7fe1ebdfb80efd402aa8e0dba8e99e22', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setUrl(data.data.url);
      alert(`Imagen subida con éxito! url${url}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input 
        type="file" 
        onChange={(e) => setImage(e.target.files[0])} 
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!image || isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Subiendo...' : 'Subir a ImgBB'}
      </button>
      {url && <img src={url} alt="Preview" className="mt-4 max-w-xs" />}
    </div>
  );
}