const IP2Location = require('ip2location-nodejs');

const apiKey = process.env.IP2_API_KEY; //api key
IP2Location.IP2Location_init(apiKey);

const checkIPAddress = async (ipAddress) => {
  try {
    const result = await IP2Location.IP2Location_ip_api(ipAddress);
    console.log(`IP Address: ${ipAddress}`);
    console.log(`Country: ${result.country_name}`);
    console.log(`Region: ${result.region_name}`);
    console.log(`City: ${result.city_name}`);
    console.log(`ISP: ${result.isp}`);
    console.log(`Proxy: ${result.is_proxy}`);
    console.log(`VPN: ${result.is_vpn}`);
    console.log(`TOR: ${result.is_tor}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

const ipAddresses = [
  '8.8.8.8', // Example IP addresses
  '1.1.1.1',
  // Add more IP addresses here
];

ipAddresses.forEach((ip) => {
  checkIPAddress(ip);
});
