"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProxmoxLXCList = () => {
  const [lxcList, setLxcList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Proxmox API URL and Node Name
    // const proxmoxAPIUrl = 'https://192.168.1.103:8006/api2/json/nodes/defender/lxc/';
    const proxmoxAPIUrl = '/api2/json/version/';

    // API token (or use username/password)
    const token = 'your-api-token-here';

    const fetchLXCData = async () => {
      try {
        const response = await axios.get(proxmoxAPIUrl, {
          headers: {
            'Authorization': `PVEAPIToken=root@pam!defender=7d367064-20ce-4c20-a389-c60eb26ec01b`,
            'Content-Type': 'application/json',
          },
        });
        setLxcList(response.data.data); // Assuming 'data' contains the list of LXCs
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLXCData();
  }, []); // Empty array means this effect runs once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>LXC Containers</h1>
      <ul>
        {lxcList.map((lxc) => (
          <li key={lxc.vmid}>
            {lxc.vmid}: {lxc.name} (Status: {lxc.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProxmoxLXCList;
