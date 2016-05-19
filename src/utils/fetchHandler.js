export default async function handleResponse(response) {
  return response.json()
    .then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}
