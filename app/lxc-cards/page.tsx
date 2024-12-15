// app/lxc/page.tsx

'use client'; // Marks this file as a client-side component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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

  const formatBytes = (bytes: number) => {
    if (bytes >= 1e12) return `${(bytes / 1e12).toFixed(2)} TB`;
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
    return `${bytes} B`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lxcData.map((lxc, index) => {
        const diskUsage = (lxc.disk / (lxc.maxdisk || 1)) * 100;
        const memoryUsage = (lxc.mem / (lxc.maxmem || 1)) * 100;
        const swapUsage = (lxc.swap / (lxc.maxswap || 1)) * 100;
        const chartData = [
          { resource: "CPU", value: lxc.cpu || 0 },
          { resource: "RAM", value: memoryUsage || 0, label: formatBytes(lxc.mem) },
          { resource: "DISK", value: diskUsage || 0, label: formatBytes(lxc.disk) },
          { resource: "SWAP", value: swapUsage || 0, label: formatBytes(lxc.swap) },
        ];

        return (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle>
                <span
                  className={`inline-block w-3 h-3 mr-2 rounded-full ${lxc.status === 'running' ? 'bg-green-500' : 'bg-red-500'}`}
                ></span>
                {lxc.name}
              </CardTitle>
              <CardDescription>
                ID: {lxc.vmid}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Type: {lxc.type}</p>
              <p>Status: {lxc.status}</p>
              <BarChart
                width={300}
                height={250}
                data={chartData}
                layout="vertical"
              >
                <CartesianGrid horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                  type="category"
                  dataKey="resource"
                  width={75}
                />
                <Bar dataKey="value" fill="#82ca9d">
                  <LabelList dataKey="label" position="right" />
                </Bar>
              </BarChart>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LxcPage;
