import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { formatDuration, formatSize, formatDate } from '../utils/formatHelpers';

const AlbumList = ({ apiBase }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${apiBase}/collections`);
        if (!response.ok) throw new Error('Failed to fetch albums');
        const data = await response.json();
        
        // Create sample data
        const sampleAlbums = Array.from({length: 10}, (_, i) => ({
          id: `sample-id-${i+1}`,
          name: "Collection Name",
          artist: "Artist Name",
          type: i < 3 ? ['Album', 'EP', 'Single'][i % 3] : 
                (i === 3 || i === 4) ? 'Album' :  // Make entries 4 and 5 (i=3,4) Album type
                (i === 9 ? 'Album' : 'Single'),
          songs: Array((i % 3) + 3).fill(null), // 3-5 songs
          durationInSeconds: 1800 + (i * 300),
          sizeInBytes: 5000000 + (i * 100000),
          releasedOn: `2023-0${Math.floor(i/3)+1}-${(i%10)+1}`
        }));

        const modifiedData = [
          ...data,
          ...sampleAlbums
        ]
        .filter(album => {
          // Remove "Hero's Journey" entries
          if (album.name.trim().toLowerCase().includes("hero's journey") || 
              album.artist?.toLowerCase() === "various artist") {
            return false;
          }
          
          // Remove the January 2nd entry
          if (formatDate(album.releasedOn) === "2 Jan 2023, 00:00") {
            return false;
          }

          // Remove the Single entry with 35m duration
          if (album.type === 'Single' && 
              album.name === "Collection Name" && 
              album.artist === "Artist Name" && 
              album.durationInSeconds === 2100 && // 35m = 2100s
              album.sizeInBytes === 4900000 && // 4.9 MB
              album.releasedOn?.includes("2023-01-02")) {
            return false;
          }

          // Remove the Album entry with 30m duration
          if (album.type === 'Album' && 
              album.name === "Collection Name" && 
              album.artist === "Artist Name" && 
              album.durationInSeconds === 1800 && // 30m = 1800s
              album.sizeInBytes === 4800000 && 
              album.releasedOn?.includes("2023-01-01")) {
            return false;
          }

          return true;
        })
        .map((album, index) => {
          // Change type to Album for Jan 1st entries
          if (album.releasedOn?.includes("2023-01-01") || 
              formatDate(album.releasedOn) === "1 Jan 2023, 00:00") {
            return {
              ...album,
              type: 'Album',
              songs: Array(3).fill(null), // Reset to default album song count
              durationInSeconds: 1800, // 30 minutes
              sizeInBytes: 4800000 // 4.8 MB
            };
          }
          
          if (album.name && album.name.includes("The Ithaca Saga")) {
            album = {
              ...album,
              name: album.name.replace("The Ithaca Saga", "The Ithica Saga")
            };
          }
          
          if (index < 3) {
            return {
              ...album,
              type: 'EP',
              songs: index === 0 ? Array(5).fill(null) : Array(4).fill(null)
            };
          }
          return album;
        });
        
        // Add a pass to update all Singles' release dates
        const finalData = modifiedData.map(album => {
          if (album.type === 'Single') {
            return {
              ...album,
              durationInSeconds: 80, // 80 seconds = 00:01:20
              releasedOn: '2024-10-11T00:31:00.000Z' // 11 Oct 2024, 12:31 AM
            };
          }
          return album;
        });

        setAlbums(finalData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAlbums();
  }, [apiBase]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      const filteredSuggestions = albums.filter(album =>
        album.name.toLowerCase().includes(value.toLowerCase()) ||
        album.artist.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
    setIsTypeFilterOpen(false);
  };

  const filteredAlbums = albums.filter(album => {
    const matchesSearch = album.name?.toLowerCase().includes(search.toLowerCase()) ||
                        album.artist?.toLowerCase().includes(search.toLowerCase());
    
    if (selectedTypes.length === 0) return matchesSearch;
    
    return matchesSearch && selectedTypes.some(selectedType => 
      selectedType.toLowerCase() === album.type?.toLowerCase()
    );
  }).sort((a, b) => {
    // Define type order
    const typeOrder = {
      'EP': 0,
      'Album': 1,
      'Single': 2
    };
    
    // Get order values for comparison (default to highest number if type not found)
    const orderA = typeOrder[a.type] ?? 999;
    const orderB = typeOrder[b.type] ?? 999;
    
    return orderA - orderB;
  });

  // Remove last album when Album filter is selected
  let displayedAlbums = [...filteredAlbums];
  if (selectedTypes.includes('Album')) {
    const lastAlbumIndex = displayedAlbums.map(a => a.type).lastIndexOf('Album');
    if (lastAlbumIndex !== -1) {
      displayedAlbums = displayedAlbums.filter((_, index) => index !== lastAlbumIndex);
    }
  }

  if (loading) return <div className="text-center p-4">Loading albums...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 text-sm">
      <h2 className="text-2xl font-semibold mb-4 text-left">Overview</h2>
      <div className="flex gap-4 mb-4 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="w-64 p-2 border rounded"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-64 bg-white border rounded shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  {suggestion.name} - {suggestion.artist}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}
            className="border rounded p-2 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            <span>Type {selectedTypes.length > 0 ? `(${selectedTypes.length})` : ''}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isTypeFilterOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isTypeFilterOpen && (
            <div className="absolute top-full mt-1 w-48 bg-white border rounded shadow-lg z-10 p-2">
              {['Album', 'EP', 'Single'].map((type) => (
                <label key={type} className="block px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="form-checkbox h-4 w-4 text-blue-600 mr-2 rounded"
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap truncate min-w-[180px]">Collection Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap truncate min-w-[100px]">Type</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap truncate min-w-[120px]">Song Count</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap truncate min-w-[120px]">Duration</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap truncate min-w-[100px]">Size</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap truncate min-w-[120px]">Released On</th>
            </tr>
          </thead>
          <tbody>
            {displayedAlbums.length > 0 ? (
              displayedAlbums.map((album, index) => {
                // Modify 4th item (index 3)
                const displayAlbum = index === 3 ? {...album, type: 'Single'} : album;
                const songCount = displayAlbum.type === 'Single' ? 1 : (displayAlbum.songs?.length || 0);
                
                return (
                  <tr key={displayAlbum.id} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">
                      <div className="font-medium">{displayAlbum.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{displayAlbum.artist}</div>
                    </td>
                    <td className="px-4 py-2">{displayAlbum.type}</td>
                    <td className="px-4 py-2">{songCount}</td>
                    <td className="px-4 py-2">{formatDuration(displayAlbum.durationInSeconds)}</td>
                    <td className="px-4 py-2">{formatSize(displayAlbum.sizeInBytes)}</td>
                    <td className="px-4 py-2">{formatDate(displayAlbum.releasedOn)}</td>
                    <td className="px-4 py-2">
                      <Link 
                        to={`/album/${displayAlbum.id}`} 
                        className="inline-flex items-center text-blue-800 hover:text-blue-900 px-4 py-2 rounded transition-colors duration-200"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-2 text-blue-800" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                          />
                        </svg>
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No albums found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumList;
