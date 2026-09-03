const http = require('http');

const data = JSON.stringify({
  serialNo: "123",
  noOfSection: "Section-A",
  name: "Test Name"
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/schedule2',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${responseBody}`);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
