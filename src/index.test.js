const http = require('http');
const app = require('./index');

const server = app.listen(0, () => {
  const port = server.address().port;

  http.get(`http://localhost:${port}`, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.status === 'Healthy') {
          console.log('✅ Test Passed: Endpoint returned Healthy status');
          server.close();
          process.exit(0);
        } else {
          console.error('❌ Test Failed: Unexpected status value');
          server.close();
          process.exit(1);
        }
      } catch (err) {
        console.error('❌ Test Failed:', err.message);
        server.close();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('❌ Test Failed:', err.message);
    server.close();
    process.exit(1);
  });
});
