import psList from 'ps-list';

export async function GET(request) {
    try {
        const processes = await psList();
        const topProcesses = processes
            .sort((a, b) => b.cpu - a.cpu) // Sort by CPU usage
            .slice(0, 100); // Get top 10 processes

        return new Response(JSON.stringify(topProcesses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching processes:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch processes' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
