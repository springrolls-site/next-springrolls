import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener el mensaje
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        {message || 'Loading...'}
      </h1>
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
};

export default Home;
