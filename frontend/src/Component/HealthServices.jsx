import React, { useState } from 'react';
import './healthservices.css';

const HealthServices = () => {
  const [postcode, setPostcode] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handlePostcodeChange = (e) => {
    setPostcode(e.target.value);
  };

  const handleSearch = async () => {
    if (!postcode) {
      alert('Please enter a postcode.');
      return;
    }
  
    const apiKey = 'AIzaSyAIufYP8zwK3UsQX5KbwAtELdQbS_2pqPY';
  
    try {
      // Use a geocoding API to convert the postcode to coordinates
      const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apiKey}`;
      const geocodeResponse = await fetch(geocodeApiUrl);
      const geocodeData = await geocodeResponse.json();
  
      if (geocodeData.status === 'OK') {
        const location = geocodeData.results[0].geometry.location;
  
        // Replace 'YOUR_SERVER_URL' with the actual URL of your Node.js server
        const serverUrl = 'http://localhost:3001/api/places';
  
        const placesResponse = await fetch(serverUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ location }),
        });
  
        const placesData = await placesResponse.json();
  
        // Filter hospitals containing the word 'hospital' in their name
        const filteredHospitals = placesData.results.filter((hospital) =>
          hospital.name.toLowerCase().includes('hospital')
        );
  
        setHospitals(filteredHospitals);
      } else {
        console.error('Geocoding API error:', geocodeData.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div className="health-services-container">
      <h1>Hospital Finder</h1>
      <label>
        Enter Postcode:
        <input type="text" value={postcode} onChange={handlePostcodeChange} />
      </label>
      <button onClick={handleSearch}>Search Hospitals</button>

      <h2>Nearby Hospitals (Within 5km):</h2>
<ul>
  {hospitals.map((hospital) => (
    <li key={hospital.place_id}>
      <strong>{hospital.name}</strong>
      <p><strong>Address:</strong> {hospital.vicinity}</p>

      {hospital.opening_hours && (
        <p><strong>Open Now:</strong> {hospital.opening_hours.open_now ? 'Yes' : 'No'}</p>
      )}
      {/* Add more details as needed */}
    </li>
  ))}
</ul>
    </div>
  );
};

export default HealthServices;