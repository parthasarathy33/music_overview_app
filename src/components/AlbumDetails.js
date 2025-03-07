import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetails = ({ apiBase }) => {
  const { albumId } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await fetch(`${apiBase}/collections/${albumId}`);
        if (!response.ok) throw new Error('Failed to fetch collection');
        const data = await response.json();
        setCollection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollectionDetails();
  }, [apiBase, albumId]);

  if (loading) return <div className="text-center p-4">Loading collection details...</div>;
  if (error) return <div className="text-center p-4">No Data's Given</div>;
  if (!collection) return <div className="text-center p-4">No Data's Given</div>;

  const songData = [
    {
      song: "The Horse and the Infant",
      performers: "Jorge Rivera-Herrans & Cast of EPIC: The Musical",
      duration: "00:02:30",
      size: "16 MB"
    },
    {
      song: "Just a Man",
      performers: "Jorge Rivera-Herrans, Armando Julian, Steven Dookie & Cast of EPIC: The Musical",
      duration: "00:05:10",
      size: "24 MB"
    },
    {
      song: "Full Speed Ahead",
      performers: "Jorge Rivera-Herrans & Steven Dookie",
      duration: "00:05:10",
      size: "23 MB"
    },
    {
      song: "Open Arms",
      performers: "Jorge Rivera-Herrans, Teagan Earley & Cast of EPIC: The Musical",
      duration: "00:05:10",
      size: "23 MB"
    },
    {
      song: "Warrior of the Mind",
      performers: "Jorge Rivera-Herrans, Teagan Earley & Cast of EPIC: The Musical",
      duration: "00:05:10",
      size: "23 MB"
    }
  ];

  // Helper function to convert HH:MM:SS to seconds
  const timeToSeconds = (timeStr) => {
    if (timeStr === "-") return 0;
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Helper function to format seconds to MM:SS
  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return [
      minutes.toString(),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  // Calculate total size
  const totalSize = songData
    .filter(song => song.size !== "-")
    .reduce((sum, song) => sum + parseInt(song.size), 0);

  // Calculate total duration
  const totalDurationSeconds = songData
    .filter(song => song.duration !== "-")
    .reduce((sum, song) => sum + timeToSeconds(song.duration), 0);
  const totalDuration = formatDuration(totalDurationSeconds);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 block">← Back to Collections</Link>
      <h1 className="text-2xl font-bold mb-8">{collection.name}</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Details Box */}
        <div className="bg-gray-50 p-4 rounded-lg border mb-8">
          <div className="flex justify-between items-start">
            <div className="text-sm flex flex-col">
              <span className="font-semibold mb-1">Artist</span>
              <span>Jorge Rivera-Herrans</span>
            </div>
            <div className="text-sm flex flex-col">
              <span className="font-semibold mb-1">Type</span>
              <span>Album</span>
            </div>
            <div className="text-sm flex flex-col">
              <span className="font-semibold mb-1">Song Count</span>
              <span>{songData.length}</span>
            </div>
            <div className="text-sm flex flex-col">
              <span className="font-semibold mb-1">Total Size</span>
              <span>{totalSize} MB</span>
            </div>
            <div className="text-sm flex flex-col">
              <span className="font-semibold mb-1">Total Duration</span>
              <span>{totalDuration} min</span>
            </div>
            <div className="text-sm flex flex-col">
              <span className="font-semibold mb-1">Released On</span>
              <span>10 Nov 2023</span>
            </div>
          </div>
        </div>

        {/* Single Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-lg font-bold pb-3 text-left">Songs</th>
              <th className="text-lg font-bold pb-3 text-left">Performers</th>
              <th className="text-lg font-bold pb-3 text-center">Duration</th>
              <th className="text-lg font-bold pb-3 text-center">Size</th>
            </tr>
          </thead>
          <tbody>
            {songData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 text-xs">{row.song}</td>
                <td className="py-2 text-xs">{row.performers}</td>
                <td className="py-2 text-xs text-center">{row.duration}</td>
                <td className="py-2 text-xs text-center">{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumDetails;
