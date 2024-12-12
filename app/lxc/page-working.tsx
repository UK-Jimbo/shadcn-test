// app/lxc/page.tsx


'use client'; // Marks this file as a client-side component

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const LxcPage = () => {
  // State to hold the LXC data from Proxmox
  const [lxcData, setLxcData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from our internal API route
  useEffect(() => {
    const fetchLxcData = async () => {
      try {
        console.log("1");
        const response = await axios.get('/api/proxmox');
        console.log("2");
        setLxcData(response.data); // Set the LXC data from Proxmox
      } catch (err) {
        console.error('Error fetching LXC data:', err);
        setError('Failed to fetch LXC data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLxcData(); // Call the function to fetch data
  }, []);

  return (
    <div>
      <h1>Proxmox LXC Data</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {lxcData && (
        <div>
          <h2>Proxmox Version</h2>
          <pre>{JSON.stringify(lxcData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LxcPage;
