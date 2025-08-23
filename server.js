const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

//Home route
app.get('/', (req, res) => {
	res.send('Node.js app is running!');
});

// Health check route
app.get('/Health', (req, res) => {
	res.json({
		status: ('ok'),
		uptime: process.uptime(),
		memory: process.memoryUsage(),
		cpu: os.cpus().length
	});
});

//start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

