const debug = require('debug')('app:xhr');

function tryParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return json;
  }
}

export function xhrUpload({
  file,
  url,
  headers = {},
  onProgress = () => {},
} = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = function onload() {
      debug('xhr status', this.status);
      if (this.status >= 200 && this.status < 300) {
        resolve(tryParse(this.responseText));
      } else {
        reject(new Error(this.responseText));
      }
    };
    xhr.upload.onprogress = (e) => {
      let percentage = 0;
      if (e.lengthComputable) {
        percentage = Math.round((e.loaded * 100) / e.total);
      }
      onProgress(percentage);
    };
    xhr.upload.onerror = () => {
      reject(new Error(xhr.statusText));
    };

    xhr.withCredentials = true;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    Object.keys(headers).forEach(name => {
      xhr.setRequestHeader(name, headers[name]);
    });

    const data = new FormData();
    data.append(file.name, file);
    xhr.send(data);
  });
}
