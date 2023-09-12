import React, { useState, useEffect } from 'react';

const AddDataSetForm = ({ setbinary, fetchDataset, profilesList, cnt, setcnt }) => {
  const [name, setName] = useState('');
  const [profiles, setProfiles] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profiles);
    const dataset = {
      profile_ids: profiles,
      profileset_name: name,
    };

    try {
      const response = await fetch(
        'http://localhost:8000/api/create_profileset/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataset),
        }
      );

      if (response.ok) {
        // Data successfully added
        console.log('Dataset added successfully');
        setbinary(0);
        // fetchDataset();
        setcnt(0);
        setProfiles([]);
      } else {
        console.error('Failed to add dataset');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add New Data Set</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <h2>Select the Profiles to add</h2>
        {profilesList.map((profile) => (
          <li key={profile.id}>
            <input
              type="checkbox"
              onChange={() => {
                if (profiles.includes(profile.id)) {
                  var temp = profiles.filter((item) => item !== profile.id);
                  setProfiles(temp);
                } else {
                  var temp = profiles;
                  temp.push(profile.id);
                  setProfiles(temp);
                  console.log(temp);
                }
              }}
            />
            {profile.name}
          </li>
        ))}
        <button type="submit" onClick={handleSubmit}>
          Add Data Set
        </button>
        <button
          onClick={() => {
            setbinary(0);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddDataSetForm;
