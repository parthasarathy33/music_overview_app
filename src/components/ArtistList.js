import React, { useEffect, useState } from "react";

const ArtistList = ({ apiBase }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${apiBase}/collections`);
        if (!response.ok) throw new Error('Failed to fetch artists');
        const collections = await response.json();
        const uniqueArtists = [...new Set(collections.map(c => c.artist))];
        setArtists(uniqueArtists);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtists();
  }, [apiBase]);

  if (loading) return <div className="text-center p-4">Loading artists...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>
      {artists.map((artist, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">{artist}</h2>
          <p className="text-sm text-gray-600 mt-2">
            Collections: {
              collections.filter(c => c.artist === artist).length
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
