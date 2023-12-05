const axios = require('axios');

const apiKey = 'zV0eI426BMw52SfDIXewLlqHQ';
const apiSecretKey = 'lCQeioxDoE9RgZRzTWkNOldOEDkIeVqII7sM6KxXkq72TL3xsu';
const accessToken = '880896513580441601-KzYee21pk6Yp6C4jOii94xUmZgZLioS';
const accessTokenSecret = 'D9BtQx1vlPUQB4clJXCwXM0Xa90qMHpKQb7KmIVYkUTEV';

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