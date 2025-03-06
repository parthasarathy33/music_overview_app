// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AlbumList = () => {
//   const [albums, setAlbums] = useState([]);
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("");
//   const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);

//   const albumsData = [
//     { id: 1, name: "EPIC: The Troy Saga (Official Concept Album)", artist: "Jorge Rivera-Herrans", type: "Album", songCount: 0, duration: 'N/A', size: 'N/A', releasedOn: 'N/A' },
//     { id: 2, name: "EPIC: The Ocean Saga (Official Concept Album)", artist: "Jorge Rivera-Herrans", type: "Album", songCount: 0, duration: 'N/A', size: 'N/A', releasedOn: 'N/A' },
//     { id: 3, name: "EPIC: The Ithica Saga (Official Concept Album)", artist: "Jorge Rivera-Herrans", type: "Album", songCount: 0, duration: 'N/A', size: 'N/A', releasedOn: 'N/A' },
//     { id: 4, name: "EP", artist: "Various Artists", type: "EP", songCount: 1, duration: '00:15:40', size: '45 MB', releasedOn: '03 Sept 2024, 02:35 PM' },
//     { id: 5, name: "EP", artist: "Various Artists", type: "EP", songCount: 1, duration: '00:13:00', size: '15 MB', releasedOn: '04 Sept 2024, 10:00 AM' },
//     { id: 6, name: "EP", artist: "Various Artists", type: "EP", songCount: 4, duration: '00:12:24', size: '30 MB', releasedOn: '04 Sept 2024, 10:00 AM' },
//     { id: 7, name: "Album", artist: "Various Artists", type: "Album", songCount: 8, duration: '00:21:06', size: '12 MB', releasedOn: '10 Oct 2024, 02:35 PM' },
//     { id: 8, name: "Album", artist: "Various Artists", type: "Album", songCount: 1, duration: '00:20:22', size: '10 MB', releasedOn: '01 Sept 2024, 12:31 AM' },
//     { id: 9, name: "Album", artist: "Various Artists", type: "Album", songCount: 1, duration: '00:25:40', size: '16 MB', releasedOn: '05 Sept 2024, 12:31 AM' },
//     { id: 10, name: "Single", artist: "Various Artists", type: "Single", songCount: 1, duration: '00:01:20', size: '24 MB', releasedOn: '11 Oct 2024, 12:31 AM' },
//     { id: 11, name: "Single", artist: "Various Artists", type: "Single", songCount: 1, duration: '00:01:20', size: '24 MB', releasedOn: '11 Oct 2024, 12:31 AM' },
//     { id: 12, name: "Single", artist: "Various Artists", type: "Single", songCount: 1, duration: '00:01:20', size: '24 MB', releasedOn: '11 Oct 2024, 12:31 AM' },
//     { id: 13, name: "Single", artist: "Various Artists", type: "Single", songCount: 1, duration: '00:01:20', size: '24 MB', releasedOn: '11 Oct 2024, 12:31 AM' },
//     { id: 14, name: "Single", artist: "Various Artists", type: "Single", songCount: 1, duration: '00:01:20', size: '24 MB', releasedOn: '11 Oct 2024, 12:31 AM' },
//     { id: 15, name: "Single", artist: "Various Artists", type: "Single", songCount: 1, duration: '00:01:20', size: '24 MB', releasedOn: '11 Oct 2024, 12:31 AM' },
//   ];

//   useEffect(() => {
//     setAlbums(albumsData);
//   }, []);

//   const filteredAlbums = albums.filter(album => {
//     const matchesSearch = album.name.toLowerCase().includes(search.toLowerCase()) ||
//                           album.artist.toLowerCase().includes(search.toLowerCase());
    
//     // If no type is selected, show all matching results
//     if (!type) return matchesSearch;
    
//     // If type is selected, check against album type
//     return matchesSearch && album.type.toLowerCase() === type.toLowerCase();
//   });

//   const handleViewDetails = (albumId) => {
//     // Implement the logic to view details of the album
//     console.log("View details for album ID:", albumId);
//     // You can navigate to a details page or show a modal with details
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4 text-left">Overview</h2>
//       <div className="flex gap-4 mb-4 items-center justify-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-64 p-2 border rounded"
//         />
        
//         <div className="relative">
//           <button
//             onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}
//             className="border rounded p-2 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
//           >
//             <span>Type: {type === 'ep' ? 'EP' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
//             <svg 
//               className={`w-4 h-4 transition-transform ${isTypeFilterOpen ? 'rotate-180' : ''}`}
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {isTypeFilterOpen && (
//             <div className="absolute top-full mt-1 w-48 bg-white border rounded shadow-lg z-10 p-2">
//               <label className="block px-2 py-1 hover:bg-gray-100 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   value="Album"
//                   checked={type === "Album"}
//                   onChange={(e) => {
//                     setType(e.target.checked ? "Album" : "");
//                     setIsTypeFilterOpen(false);
//                   }}
//                   className="form-checkbox h-4 w-4 text-blue-600 mr-2 rounded"
//                 />
//                 Album
//               </label>
//               <label className="block px-2 py-1 hover:bg-gray-100 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   value="EP"
//                   checked={type === "EP"}
//                   onChange={(e) => {
//                     setType(e.target.checked ? "EP" : "");
//                     setIsTypeFilterOpen(false);
//                   }}
//                   className="form-checkbox h-4 w-4 text-blue-600 mr-2 rounded"
//                 />
//                 EP
//               </label>
//               <label className="block px-2 py-1 hover:bg-gray-100 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   value="Single"
//                   checked={type === "Single"}
//                   onChange={(e) => {
//                     setType(e.target.checked ? "Single" : "");
//                     setIsTypeFilterOpen(false);
//                   }}
//                   className="form-checkbox h-4 w-4 text-blue-600 mr-2 rounded"
//                 />
//                 Single
//               </label>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 text-left">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Collection Name</th>
//               <th className="border px-4 py-2">Type</th>
//               <th className="border px-4 py-2">Artist</th>
//               <th className="border px-4 py-2">Song Count</th>
//               <th className="border px-4 py-2">Duration</th>
//               <th className="border px-4 py-2">Size</th>
//               <th className="border px-4 py-2">Released On</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAlbums.length > 0 ? (
//               filteredAlbums.map((album) => (
//                 <tr key={album.id} className="border hover:bg-gray-100">
//                   <td className="border px-4 py-2">{album.name}</td>
//                   <td className="border px-4 py-2">{album.type}</td>
//                   <td className="border px-4 py-2">{album.artist}</td>
//                   <td className="border px-4 py-2">{album.songCount}</td>
//                   <td className="border px-4 py-2">{album.duration}</td>
//                   <td className="border px-4 py-2">{album.size}</td>
//                   <td className="border px-4 py-2">{album.releasedOn}</td>
//                   <td className="border px-4 py-2">
//                     <button 
//                       onClick={() => handleViewDetails(album.id)} 
//                       className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
//                     >
//                       <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         className="h-5 w-5 mr-2" 
//                         fill="none" 
//                         viewBox="0 0 24 24" 
//                         stroke="#3B82F6"
//                       >
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth="2" 
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
//                         />
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth="2" 
//                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
//                         />
//                       </svg>
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center p-4">No albums found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AlbumList;
