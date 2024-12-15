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
} from "@/components/ui/table";

// Function to convert bytes to a human-readable format
const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  else if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  else if (bytes < 1024 * 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  else return `${(bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`;
};

// Function to calculate percentage used
const calculatePercentage = (used: number, total: number): number => {
  return (used / total) * 100;
};

// Function to get the color based on usage percentage
const getBarColor = (percentage: number): string => {
  if (percentage >= 95) return 'red'; // More than 95% -> Red
  if (percentage >= 80) return 'orange'; // 80% - 95% -> Orange
  return 'green'; // Less than 80% -> Green
};

const LxcPage = () => {
  // State to hold the LXC data from Proxmox
  const [lxcData, setLxcData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from our internal API route
  useEffect(() => {
    const fetchLxcData = async () => {
      try {
        const response = await axios.get('/api/proxmox');
        // Sort the data by vmid (low to high) before setting state
        const sortedData = response.data.sort((a: any, b: any) => a.vmid - b.vmid);
        setLxcData(sortedData); // Set the sorted LXC data from Proxmox
      } catch (err) {
        console.error('Error fetching LXC data:', err);
        setError('Failed to fetch LXC data');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLxcData(); // Call the function to fetch data
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table>
      <TableCaption>A list of your LXCs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Disk</TableHead>
          <TableHead className="text-right">Memory</TableHead>
          <TableHead className="text-right">Swap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lxcData.map((lxc, index) => {
          // Calculate the percentage for Disk, RAM, and Swap
          const diskPercentage = calculatePercentage(lxc.disk, lxc.maxdisk);
          const ramPercentage = calculatePercentage(lxc.mem, lxc.maxmem);
          const swapPercentage = calculatePercentage(lxc.swap, lxc.maxswap);

          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{lxc.vmid}</TableCell>
              <TableCell>{lxc.name}
              <div
                  style={{
                    width: '5%',
                    height: '3px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${diskPercentage}%`,
                      backgroundColor: getBarColor(diskPercentage),
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <div
                  style={{
                    width: '5%',
                    height: '3px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${ramPercentage}%`,
                      backgroundColor: getBarColor(ramPercentage),
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <div
                  style={{
                    width: '5%',
                    height: '3px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${swapPercentage}%`,
                      backgroundColor: getBarColor(swapPercentage),
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </TableCell>
              {/* Disk Usage */}
              <TableCell className="text-right">
                {formatBytes(lxc.disk)} of {formatBytes(lxc.maxdisk)}
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${diskPercentage}%`,
                      backgroundColor: getBarColor(diskPercentage),
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </TableCell>
              {/* RAM Usage */}
              <TableCell className="text-right">
              {formatBytes(lxc.mem)} of {formatBytes(lxc.maxmem)}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${ramPercentage}%`,
                      backgroundColor: getBarColor(ramPercentage),
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </TableCell>
              {/* Swap Usage */}
              <TableCell className="text-right">
                {formatBytes(lxc.swap)} of {formatBytes(lxc.maxswap)}
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${swapPercentage}%`,
                      backgroundColor: getBarColor(swapPercentage),
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LxcPage;
