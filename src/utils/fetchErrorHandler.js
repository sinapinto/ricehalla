export default function handleErrors(response) {
  if (!response.ok) {
    throw new Error(response.message || response.statusText);
  }
  return response;
}
