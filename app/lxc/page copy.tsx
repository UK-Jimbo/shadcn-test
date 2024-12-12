// app/page.tsx
import axios from 'axios';

const getProxmoxData = async () => {
  try {
    const response = await axios.get('/api/proxmox'); // Call the internal API route
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching Proxmox data:', error);
  }
};

getProxmoxData();
