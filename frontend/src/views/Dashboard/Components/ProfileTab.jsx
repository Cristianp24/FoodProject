import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileTab = () => {
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = () => {
    axios.put('/api/profile', profile).then(response => {
      setProfile(response.data);
    });
  };

  return (
    <div>
      <h2>Profile</h2>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="file"
        onChange={(e) => setProfile({ ...profile, avatar: e.target.files[0] })}
      />
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfileTab;