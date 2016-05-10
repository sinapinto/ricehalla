let port = '';
if (__APIPORT__) {
  port = `:${__APIPORT__}`;
}
export default `//${__HOST__}${port}`;
