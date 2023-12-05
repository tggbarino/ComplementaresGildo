const axios = require('axios');

const apiKey = '4y0ImHRGsv2ksumYKtFrIVnyY';
const apiSecretKey = 'zXK9NLAzCwwZDHSmtU8H5e94ojv4u6EgSCTjNfcox8ioftp8jb';
const accessToken = '880896513580441601-vr86fuY4qfZKvtc3Sfv7RHcyhWcRAcY';
const accessTokenSecret = 'tULf49dALFpFTgEuxmzZABPKMM1wd3EUVReGeWjHeKsnC';

const apiUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=TwitterDev';


const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

axios.get(apiUrl, config)
  .then((response) => {
    if (response.status === 200) {
      console.log('Dados da resposta:', response.data);
} else {
    console.error('Erro na solicitação:', response.status, response.statusText);
  }
})
.catch((error) => {
  console.error('Erro na solicitação:', error.message);
});



const baseUrl = 'https://api.twitter.com/1.1/';


const userTimelineEndpoint = 'statuses/user_timeline.json?screen_name=TwitterDev&count=5'; 

const userDetailsEndpoint = 'users/show.json?screen_name=TwitterDev';

async function fetchData(endpoint) {
  try {
    const response = await axios.get(baseUrl + endpoint, config);

    if (response.status === 200) {
      console.log('Dados da resposta:', response.data);
    } else {
      console.error('Erro na solicitação:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Erro na solicitação:', error.message);
  }
}


fetchData(userTimelineEndpoint);
fetchData(userDetailsEndpoint);
