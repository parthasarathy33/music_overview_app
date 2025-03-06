import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCollections } from '../services/api';

const CollectionList = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCollections();
      setCollections(data);
    };
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map(collection => (
        <Link key={collection.id} to={`/collections/${collection.id}`} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
          <p className="text-gray-600">{collection.artist}</p>
          <div className="mt-2 text-sm text-gray-500">
            {collection.type} • {collection.songCount} songs
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionList; 