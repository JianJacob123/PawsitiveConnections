// server.js
const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
    appId: '1890873',
    key: '77c53666ec2e4691180c',
    secret: '68749b88168b1951b269',
    cluster: 'ap1',
    useTLS: true,
});

app.post('/send-message', (req, res) => {
    const { message } = req.body;

    // Trigger the 'new-message' event on the 'chat' channel
    pusher.trigger('chat', 'new-message', { message: { text: message, isSent: false } });
    res.status(200).send('Message sent to Pusher');
});

app.listen(5000, () => console.log('Server running on port 5000'));
