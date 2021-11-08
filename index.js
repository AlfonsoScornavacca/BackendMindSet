const express = require('express');
const candidates = require('./controllers/candidates');
const companies = require('./controllers/companies');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  let html = '<h1>MindeSet</h1>';
  html += '<ul>';
  html += '  <li>Candidates:';
  html += '    <ul>';
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li>Companies:';
  html += '    <ul>';
  html += '      <li><a href="/companies">getAll</a></li>';
  html += '      <li><a href="/company/:id">getById</a></li>';
  html += '      <li><a href="/company/byName/:name">getByName</a></li>';
  html += '      <li><a href="/company/add">add</a></li>';
  html += '      <li><a href="/company/edit/:id">edit</a></li>';
  html += '      <li><a href="/company/remove/:id">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '</ul>';
  res.send(html);
});

app.get('/candidates', candidates.getAll);
app.get('/candidate/:id', candidates.getById);
app.get('/candidate/byName/:name', candidates.getByName);
app.get('/candidate/add', candidates.add);
app.get('/candidate/edit', candidates.edit);
app.get('/candidate/remove', candidates.remove);

app.get('/companies', companies.getAll);
app.get('/company/byName/:name', companies.getByName);
app.get('/company/add', companies.add);
app.get('/company/:id', companies.getById);
app.get('/company/edit/:id', companies.edit);
app.get('/company/remove/:id', companies.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
