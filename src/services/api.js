const API_BASE = 'https://api.musiccollection.com/v1';

export const fetchCollections = async () => {
  const response = await fetch(`${API_BASE}/collections`);
  return response.json();
};

export const fetchCollectionDetails = async (collectionId) => {
  const response = await fetch(`${API_BASE}/collections/${collectionId}`);
  return response.json();
}; 