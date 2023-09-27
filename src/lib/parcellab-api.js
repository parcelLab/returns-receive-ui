import { getCookie } from "./cookie";

export async function getTrackingId(input) {
  const myHeaders = new Headers();
  myHeaders.append('user', getCookie('connectionToken').split('$')[0]);
  myHeaders.append('token', getCookie('connectionToken').split('$')[1]);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return new Promise((resolve, reject) => {
    fetch(
      `https://api.parcellab.com/v2/search?s=${input}&return=true&from=2023-01-01`,
      requestOptions
    )
      .then(response => response.json())
      .then(response => {
        if (response?.results?.length > 0) {
          const returnsForQuery = response.results.filter(result => result.oth.retpo)

          if (returnsForQuery.length === 1) {
            resolve(returnsForQuery[0].id)
          } else if (returnsForQuery.length === 0) {
            reject('No active return found');
          } else if (returnsForQuery.length > 1) {
            reject('Multiple results found');
          }

        } else {
          reject('No data found');
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      })
  })
}

export async function getTrackingDetails() {
  const params = new URLSearchParams(window.location.search);
  const trackingId = params.get("id");

  const myHeaders = new Headers();
  myHeaders.append('user', getCookie('connectionToken').split('$')[0]);
  myHeaders.append('token', getCookie('connectionToken').split('$')[1]);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return new Promise((resolve, reject) => {
    fetch(
      `https://api.parcellab.com/v2/tracking-details?id=${trackingId}&lang=en`,
      requestOptions
    )
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        console.error(error);
        reject(error);
      })
  })
}

export async function submitTrackingCheck(tracking) {
  const myHeaders = new Headers();
  myHeaders.append('user', getCookie('connectionToken').split('$')[0]);
  myHeaders.append('token', getCookie('connectionToken').split('$')[1]);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      scanAs: getCookie('scanAs'),
      tracking
    }),
    redirect: 'follow'
  };

  return new Promise((resolve, reject) => {
    fetch("https://api.parcellab.com/debug", requestOptions)
      .then(result => resolve(result))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  })
}