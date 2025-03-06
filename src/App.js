import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import AlbumDetails from "./components/AlbumDetails";
import SongList from "./components/SongList";
import ArtistList from "./components/ArtistList";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<AlbumList />} />
          <Route path="/album/:albumId" element={<AlbumDetails />} />
          <Route path="/songs" element={<SongList />} />
          <Route path="/artists" element={<ArtistList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
