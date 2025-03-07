import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import AlbumDetails from "./components/AlbumDetails";
import SongList from "./components/SongList";
import ArtistList from "./components/ArtistList";

const App = () => {
  const apiBase = "http://localhost:3001";

  return (
    <Router>
      <div className="container mx-auto p-4 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<AlbumList apiBase={apiBase} />} />
          <Route path="/album/:albumId" element={<AlbumDetails apiBase={apiBase} />} />
          <Route path="/songs" element={<SongList apiBase={apiBase} />} />
          <Route path="/artists" element={<ArtistList apiBase={apiBase} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
