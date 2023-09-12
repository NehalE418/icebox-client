import React from 'react';
import { useEffect, useState } from 'react';

export default function AddProfile({
  datasetID,
  fetchProfiles,
  dropcontrol,
  setdropcontrol,
  profiles_not_present,
}) {
  const [selected_profiles_add, setSelectedProfilesAdd] = useState([]);

  const toggle = () => {
    setdropcontrol(dropcontrol === 1 ? 0 : 1);
    // setSelectedProfilesAdd([]);
  };

  const handleUpdate_add = async (e) => {
    e.preventDefault();
    const dataset = {
      profiles_List: selected_profiles_add,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/update_profileset/${datasetID}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataset),
        }
      );

      if (response.ok) {
        console.log('Dataset Updated successfully');
        setSelectedProfilesAdd([]);
        // setdropcontrol(0);
        toggle();
        fetchProfiles(datasetID);
      } else {
        console.error('Failed to add dataset');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="dropdown" onClick={toggle}>
        <h2>+Add</h2>
        <div className={`${dropcontrol === 1 ? 'open' : 'close'}`}>
          {profiles_not_present.map((profile) => (
            <li key={profile.id}>
              <input
                type="checkbox"
                value={
                  selected_profiles_add.includes(profile.id) ? true : false
                }
                onChange={() => {
                  if (selected_profiles_add.includes(profile.id)) {
                    var temp = selected_profiles_add.filter(
                      (item) => item !== profile.id
                    );
                    setSelectedProfilesAdd(temp);
                  } else {
                    var temp = selected_profiles_add;
                    temp.push(profile.id);
                    setSelectedProfilesAdd(temp);
                  }
                }}
              />
              {profile.name}
            </li>
          ))}
          <button type="submit" onClick={handleUpdate_add}>
            Add Profiles
          </button>
          <button onClick={toggle}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
