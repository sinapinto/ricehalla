export default async function handleResponse(response) {
  return response.json()
    .then(json => ({ json, response }))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}
