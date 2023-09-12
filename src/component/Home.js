import React from 'react';
import { useEffect, useState } from 'react';
import AddDataSetFrom from './AddDataSetForm';
import './Home.css';
import axios from 'axios';
import AddProfile from './AddProfile';
import { Link } from 'react-router-dom';

export default function Home() {
  const [dropcontrol, setdropcontrol] = useState(0);
  const [dataset, setDataset] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [datasetID, setDatasetID] = useState(1);
  const [datasetName, setDatasetName] = useState('c');
  const [binary, setbinary] = useState(0);
  const [cnt, setcnt] = useState(1);
  const [selected_profiles, setSelectedProfiles] = useState([]);
  const [profilesList, setProfileslist] = useState([]);
  const [profiles_not_present, setProfilesNotPresent] = useState([]);

  useEffect(() => {
    // Fetch data from the Django API
    fetch(`http://localhost:8000/api/profiles/`)
      .then((response) => response.json())
      .then((data) => {
        setProfileslist(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataset = {
      profiles_List: selected_profiles,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/update_profileset/${datasetID}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataset),
        }
      );

      if (response.ok) {
        console.log('Dataset Updated successfully');
        setSelectedProfiles([]);
        fetchProfiles(datasetID);
      } else {
        console.error('Failed to add dataset');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (datasetId) => {
    try {
      await axios.delete(`http://localhost:8000/api/profileset/${datasetId}/`);
      setDataset(dataset.filter((dataset) => dataset.id !== datasetId));
      fetchDataset();
    } catch (error) {
      console.error('Error deleting dataset:', error);
    }
  };

  useEffect(() => {
    fetchProfiles(datasetID);
    fetchDataset();
  }, [datasetID]);

  const fetchDataset = () => {
    // Fetch data from the Django API
    fetch('http://localhost:8000/api/profilesets/')
      .then((response) => response.json())
      .then((data) => {
        setDataset(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const fetchProfiles = (datasetID) => {
    fetch(`http://localhost:8000/api/profileset/${datasetID}/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.profiles);
        setProfiles(data.profiles);
        setDatasetName(data.name);
        var temp = profilesList.filter(
          (item) => profiles.includes(item) === false
        );
        setProfilesNotPresent(temp);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div className="home">
      <div className="options">
        <Link to="/generate">
          <button>Go to Generate</button>
        </Link>
        <Link to="/search">
          <button>Go to Search</button>
        </Link>
      </div>
      <div className="datasetList">
        <h2>Dataset List</h2>

        <ul>
          {dataset.map((profile) => (
            <li className="Data-tabs" key={profile.id}>
              <h3
                onClick={() => {
                  setDatasetID(profile.id);
                }}
              >
                {profile.name}
              </h3>
              <button
                onClick={() => {
                  handleDelete(profile.id);
                }}
              >
                delete
              </button>
            </li>
          ))}
          <li
            className="Data-tabs"
            key={99}
            onClick={() => {
              setbinary(!binary);
            }}
          >
            <h3>+ add dataset</h3>
          </li>
        </ul>
        {binary === 0 ? null : (
          <AddDataSetFrom
            setbinary={setbinary}
            fetchDataset={fetchDataset}
            profilesList={profilesList}
            cnt={cnt}
            setcnt={setcnt}
          />
        )}
      </div>
      <div className="heading">
        <h2>Profile list - {datasetName}</h2>
        <AddProfile
          datasetID={datasetID}
          profiles_not_present={profiles_not_present}
          fetchProfiles={fetchProfiles}
          dropcontrol={dropcontrol}
          setdropcontrol={setdropcontrol}
        />
        <button onClick={handleUpdate}>Delete</button>
      </div>
      <div className="Profiles">
        <ul>
          {profiles.map((profile) => (
            <li className="profiles" key={profile.id}>
              <input
                type="checkbox"
                id={profile.id}
                onChange={() => {
                  if (selected_profiles.includes(profile.id)) {
                    var temp = selected_profiles.filter(
                      (item) => item !== profile.id
                    );
                    setSelectedProfiles(temp);
                  } else {
                    var temp = selected_profiles;
                    temp.push(profile.id);
                    setSelectedProfiles(temp);
                    // console.log(temp);
                  }
                }}
              />
              <h3>{profile.uid}</h3>
              <h4>{profile.name}</h4>
              <h4>{profile.address}</h4>
              <img className="img" src={profile.face_path} alt="Face" />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
              <img
                className="img1"
                src={profile.fingerprint_1}
                alt="fingerprint"
              />
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    </div>
  );
}
