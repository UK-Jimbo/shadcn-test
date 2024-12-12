import { exec } from 'child_process';

export async function GET(request) {
    try {
        // Execute the lsblk command with options to get JSON output
        const lsblkCommand = `lsblk --json --output NAME,TYPE,SIZE,MOUNTPOINT`;

        const lsblkPromise = new Promise((resolve, reject) => {
            exec(lsblkCommand, (error, stdout, stderr) => {
                if (error) {
                    return reject(stderr || error.message);
                }
                resolve(stdout);
            });
        });

        const lsblkOutput = await lsblkPromise;

        // Parse the output as JSON and send it in the response
        const lsblkData = JSON.parse(lsblkOutput);

        return new Response(JSON.stringify(lsblkData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error executing lsblk:', error);

        return new Response(JSON.stringify({ message: 'Failed to fetch block device info', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
