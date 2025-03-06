import React, { useEffect, useState } from "react";

const SongList = ({ apiBase }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const response = await fetch(`${apiBase}/collections`);
        if (!response.ok) throw new Error('Failed to fetch songs');
        const collections = await response.json();
        const allSongs = collections.flatMap(collection => 
          collection.songs.map(song => ({
            ...song,
            collectionName: collection.name,
            artist: collection.artist
          }))
        );
        setSongs(allSongs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllSongs();
  }, [apiBase]);

  if (loading) return <div className="text-center p-4">Loading songs...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">All Songs</h1>
      {songs.map((song, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{song.title}</h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>Artist: {song.artist}</p>
            <p>Collection: {song.collectionName}</p>
            <p>Duration: {Math.floor(song.durationInSeconds / 60)}m {song.durationInSeconds % 60}s</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;