const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const convertCSVToJSON = (csvPath, outputPath) => {
  const csvData = fs.readFileSync(csvPath, 'utf8');
  const lines = csvData.split('\n').slice(1); // Skip header
  
  const collections = lines.map(line => {
    const [name, artist, type, songCount, duration, sizeMB, releasedOn] = line.split(',');
    
    // Convert duration HH:MM:SS to seconds
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const durationInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    // Convert MB to bytes (1 MB = 1048576 bytes)
    const sizeInBytes = Math.round(parseFloat(sizeMB) * 1048576);
    
    // Convert date to ISO format
    const isoDate = new Date(releasedOn.trim().replace(' ', 'T') + 'Z').toISOString();

    return {
      id: uuidv4(),
      name: name || 'Unnamed Collection',
      artist: artist || 'Unknown Artist',
      type: type === 'Album' ? 'Album' : type === 'EP' ? 'EP' : 'Single',
      songCount: parseInt(songCount) || 1,
      durationInSeconds,
      sizeInBytes,
      releasedOn: isoDate,
      songs: [{
        title: "Default Track",
        durationInSeconds: durationInSeconds,
        sizeInBytes: sizeInBytes,
        performers: [artist || "Unknown Artist"]
      }]
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify({ collections }, null, 2));
};

// Run migration
convertCSVToJSON(
  'Sorted_Music_Collection.csv', 
  'server/db.json'
); 