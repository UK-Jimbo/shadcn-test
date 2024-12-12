// app/lxc/page.tsx


'use client'; // Marks this file as a client-side component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const LxcPage = () => {
  // State to hold the LXC data from Proxmox
  const [lxcData, setLxcData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from our internal API route
  useEffect(() => {
    const fetchLxcData = async () => {
      try {
        const response = await axios.get('/api/proxmox');
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
    <Table>
    <TableCaption>A list of your lxcs.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">001</TableCell>
        <TableCell>gitea</TableCell>
        <TableCell>lxc</TableCell>
        <TableCell className="text-right">stopped</TableCell>
      </TableRow>
    </TableBody>
    </Table>

  );
};

export default LxcPage;
