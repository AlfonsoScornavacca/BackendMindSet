const express = require('express');
const candidates = require('./controllers/candidates');
const companies = require('./controllers/companies');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  let html = '<h1>MindeSet</h1>';
  html += '<ul>';
  html += '  <li><h2>Companies:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/companies">getAll</a></li>';
  html += '      <li><a href="/company/1">getById</a></li>';
  html += '      <li><a href="/company/byName/pepsi">getByName</a></li>';
  html += '      <li><a href="/company/add">add</a></li>';
  html += '      <li><a href="/company/edit/1">edit</a></li>';
  html += '      <li><a href="/company/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Candidates:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += '      <li><a href="/candidate/1">getById</a></li>';
  html += '      <li><a href="/candidate/name/john">getByName</a></li>';
  html += '      <li><a href="/candidate/add">add</a></li>';
  html += '      <li><a href="/candidate/edit/1">edit</a></li>';
  html += '      <li><a href="/candidate/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '</ul>';
  res.send(html);
});

app.get('/candidates', candidates.getAll);
app.get('/candidate/add', candidates.add);
app.get('/candidate/:id', candidates.getById);
app.get('/candidate/byName/:name', candidates.getByName);
app.get('/candidate/edit/:id', candidates.edit);
app.get('/candidate/remove/:id', candidates.remove);

app.get('/companies', companies.getAll);
app.get('/company/byName/:name', companies.getByName);
app.get('/company/add', companies.add);
app.get('/company/:id', companies.getById);
app.get('/company/edit/:id', companies.edit);
app.get('/company/remove/:id', companies.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
