const express = require('express');
const sessions = require('./controllers/sessions');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li>sessions:';
    html += '    <ul>';
    html += '      <li><a href="/sessions">getAll</a></li>';
    html += '    </ul>';
    html += '  </li>';
    html += '</ul>';
    res.send();
});

app.get('/sessions', sessions.getAll);
app.get('/session/add', sessions.add);
app.get('/session/:id', sessions.getById);
app.get('/session/byIdCandidate/:candidate', sessions.getByIdCandidate);
app.get('/session/edit/:id', sessions.edit);
app.get('/session/remove/:id', sessions.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
