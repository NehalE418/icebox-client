import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './generate.css';

export default function Generate() {
  const [number_of_profiles, setNumberOfProfiles] = useState(0);
  const [generated_list, setGeneratedList] = useState([]);

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/generate-profiles/',
        {
          number: 1 * number_of_profiles,
        }
      );
      const profiles = response.data.profiles;
      setGeneratedList(profiles);
    } catch (error) {
      console.error('Error generating profiles:', error);
    }
  };

  const handleChange = (event) => {
    setNumberOfProfiles(event.target.value);
  };

  return (
    <div className="Generate">
      <Link to="/">
        <button>Go to Home</button>
      </Link>
      <Link to="/search">
        <button>Go to Search</button>
      </Link>
      <div className="generate-form">
        <h2>Generate Profiles</h2>
        <label>
          Number of Profiles:
          <input
            type="number"
            value={number_of_profiles}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleGenerate}>Generate</button>
      </div>
      <div className="Generate_list">
        <ul>
          {generated_list.map((profile) => (
            <li className="profiles" key={profile.id}>
              <input type="checkbox" id={profile.id} />
              <h3>{profile.uid}</h3>
              <h4>{profile.name}</h4>
              <h4>{profile.address}</h4>
              <img className="img" src={`${profile.face_path}`} alt="Face" />
              <img
                className="img1"
                src={`${profile.fingerprint_1}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_2}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_3}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_4}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_5}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_6}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_7}`}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={`${profile.fingerprint_8}`}
                alt="fingerprint"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
