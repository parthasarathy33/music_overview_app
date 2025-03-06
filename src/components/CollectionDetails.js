import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCollectionDetails } from '../services/api';

const CollectionDetails = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCollectionDetails(collectionId);
        setCollection(data);
      } catch (error) {
        console.error('Error loading collection:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [collectionId]);

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (!collection) return <div className="p-4 text-center text-red-500">Collection not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/collections" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Collections
      </Link>
      <h1 className="text-3xl font-bold mb-4">{collection.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p className="text-gray-600">Artist: {collection.artist}</p>
          <p className="text-gray-600">Type: {collection.type}</p>
          <p className="text-gray-600">Release Date: {new Date(collection.releasedOn).toLocaleDateString()}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Songs ({collection.songCount})</h2>
          <div className="space-y-3">
            {collection.songs.map((song, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">{song.title}</h3>
                <div className="text-sm text-gray-500">
                  Duration: {Math.floor(song.durationInSeconds / 60)}:
                  {(song.durationInSeconds % 60).toString().padStart(2, '0')}
                </div>
                {song.performers?.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Performers: {song.performers.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails; 