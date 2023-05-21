const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/slimechunk', (req, res) => {
  const tables = req.body.tables;
  console.log(tables);
  //const results = slime(tables);
  res.json({ tables });
});



app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

const slime = (tables) => {
  const results = [];
  for (let t = 0; t < tables.length; t++) {
    let m = tables[t][0];
    m = Math.imul(m, 0x1f1f1f1f) ^ tables[t][1];
    const f = (x, y) => Math.imul(x ^ x >>> 30, 0x6c078965) + y;
    let a = m & 0x80000000 | (m = f(m, 1)) & 0x7fffffff;
    for (let i = 2; i < 398; i++) m = f(m, i);
    m ^= a >>> 1 ^ [0, 0x9908b0df][a & 1];
    m ^= m >>> 11;
    m ^= m << 7 & 0x9d2c5680;
    m ^= m << 15 & 0xefc60000;
    m ^= m >>> 18;
    results.push(!((m >>> 0) % 10));
  }
  return results;
};

module.exports = app;
