// app/api/proxmox/route.ts

import axios from 'axios';

const PROXMOX_API_TOKEN = process.env.PROXMOX_API_TOKEN;
const PROXMOX_API_URL = process.env.PROXMOX_API_URL;

if (!PROXMOX_API_TOKEN || !PROXMOX_API_URL) {
  throw new Error('Missing Proxmox API configuration in environment variables.');
}

export async function GET(req: Request) {
  try {
    const response = await axios.get(`${PROXMOX_API_URL}/nodes/defender/lxc`, {
      headers: {
        'Authorization': `PVEAPIToken=${PROXMOX_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract the relevant data
    const lxcList = response.data.data; // Adjust this if the structure differs

    return new Response(JSON.stringify(lxcList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching data from Proxmox API:', error.message);
    return new Response(
      JSON.stringify({ error: `Failed to fetch data: ${error.message}` }),
      { status: 500 }
    );
  }
}
