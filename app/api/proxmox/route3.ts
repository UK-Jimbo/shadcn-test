// app/api/proxmox/route.ts

import axios from 'axios';

// Disable SSL verification for development
export async function GET(req: Request) {
  try {
    const response = await axios.get('https://192.168.1.103:8006/api2/json/version', {
      headers: {
        'Authorization': `PVEAPIToken=root@pam!defender=7d367064-20ce-4c20-a389-c60eb26ec01b`,
        'Content-Type': 'application/json',
      },
      httpsAgent: new (require('https')).Agent({  
        rejectUnauthorized: false, // Disable SSL verification
      }),
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data from Proxmox API:', error.message);
    return new Response(
      JSON.stringify({ error: `Failed to fetch data: ${error.message}` }),
      { status: 500 }
    );
  }
}
