// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// const AlbumDetails = ({ apiBase }) => {
//   const { collectionId } = useParams();
//   const [collection, setCollection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCollectionDetails = async () => {
//       try {
//         const response = await fetch(`${apiBase}/collections/${collectionId}`);
//         if (!response.ok) throw new Error('Failed to fetch collection');
//         const data = await response.json();
//         setCollection(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchCollectionDetails();
//   }, [apiBase, collectionId]);

//   if (loading) return <div className="text-center p-4">Loading collection details...</div>;
//   if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
//   if (!collection) return <div className="p-4">Collection not found</div>;

//   return (
//     <div className="space-y-6">
//       <Link to="/" className="text-blue-600 hover:text-blue-800">← Back to Collections</Link>
//       <h1 className="text-3xl font-bold">{collection.name}</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <p className="font-semibold">Artist:</p>
//             <p>{collection.artist}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Release Date:</p>
//             <p>{new Date(collection.releasedOn).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Duration:</p>
//             <p>{Math.floor(collection.durationInSeconds / 60)} minutes</p>
//           </div>
//           <div>
//             <p className="font-semibold">Total Songs:</p>
//             <p>{collection.songCount}</p>
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold mb-4">Songs</h2>
//         <div className="space-y-4">
//           {collection.songs.map((song, index) => (
//             <div key={index} className="p-4 border rounded-lg">
//               <h3 className="font-semibold text-lg">{song.title}</h3>
//               <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                 <span>Duration: {Math.floor(song.durationInSeconds / 60)}m {song.durationInSeconds % 60}s</span>
//                 <span>Size: {(song.sizeInBytes / 1024 / 1024).toFixed(2)} MB</span>
//                 <span>Performers: {song.performers.join(', ')}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlbumDetails;
