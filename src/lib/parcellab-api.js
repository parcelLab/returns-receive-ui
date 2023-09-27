import { getCookie } from "./cookie";

function getAuthHeaders() {
  const myHeaders = new Headers();
  myHeaders.append('user', getCookie('connectionToken').split('$')[0]);
  myHeaders.append('token', getCookie('connectionToken').split('$')[1]);
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}

export async function getTrackingId(input) {
  const requestOptions = {
    method: 'GET',
    headers: getAuthHeaders()
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

  const requestOptions = {
    method: 'GET',
    headers: getAuthHeaders()
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

async function sendFullDataToLogApi(tracking) {
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeaders(),
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

function getOverallAcceptanceResult(articles) {
  return articles.every((a) => a.acceptedQuantity === 0)
    ? "completely_rejected"
    : articles.some((a) => a.rejected)
      ? "with_partial_rejections"
      : "completely_accepted"
}

async function sendCheckpoint(tracking) {
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      "courier": tracking.courier.name,
      "tracking_number": tracking.tracking_number,
      "timestamp": new Date().toISOString(),
      "location": getCookie('scanAs'),
      "event": "Received via returns receive UI: " + 
        getOverallAcceptanceResult(tracking.articles)
    }),
    redirect: 'follow'
  };

  return new Promise((resolve, reject) => {
    fetch("https://api.parcellab.com/shop-event", requestOptions)
      .then(result => resolve(result))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  })
}

async function updateTracking(tracking) {
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      "courier": tracking.courier.name,
      "tracking_number": tracking.tracking_number,
      "isReturnsPortal": true,
      "articles": tracking.articles
        .map((a) => ({
          ...a,
          originalQuantity: a.quantity,
          quantity: a.acceptedQuantity
        })),
      "articlesOpen": tracking.articles
        .filter((a) => a.rejected)
        .map((a) => ({
          ...a,
          originalQuantity: a.quantity,
          quantity: a.quantity - a.acceptedQuantity
        })),
      "customFields": {
        "returnReceive": {
          "scanAs": getCookie('scanAs'),
          "receivedAt": new Date().toISOString(),
          "status": getOverallAcceptanceResult(tracking.articles)
        }
      }
    }),
    redirect: 'follow'
  };

  return new Promise((resolve, reject) => {
    fetch("https://api.parcellab.com/track", requestOptions)
      .then(result => resolve(result))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  })
}

export async function submitTrackingCheck(tracking) {
  await Promise.all([
    sendFullDataToLogApi(tracking),
    sendCheckpoint(tracking),
    updateTracking(tracking)
  ])
}