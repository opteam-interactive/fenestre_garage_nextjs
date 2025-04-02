
import { FormData } from '@/components/Contact';

export function sendEmail(data: FormData) {

  const apiEndpoint = '/api/email';

  //Send the data to the endpoint
  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}