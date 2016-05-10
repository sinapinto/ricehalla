import Resource from 'koa-resource-router';
import multer from 'koa-multer';
import AWS from 'aws-sdk';
import _debug from 'debug';
const debug = _debug('app:upload');

const s3 = new AWS.S3();

// const mimeTypes = [
//   'image/jpeg',
//   'image/png',
//   'image/gif',
//   'text/plain',
// ];

const MulterMiddleware = multer({
  inMemory: true, // sets `file.buffer`
  limits: {
    files: 1,
    fileSize: 3 * 1024 * 1024,
  },
  rename: (fieldname, filename) => `${filename.replace(/^\.*/, '')}_${Date.now()}`,
  // onFileUploadStart: (file) => {
  //   const valid = ~mimeTypes.indexOf(file.mimetype);
  //   if (!valid) {
  //     debug('invalid mimetype', file.mimetype);
  //   }
  //   return valid;
  // },
});

export default new Resource('upload', {
  // POST /upload
  create: [MulterMiddleware, function *create() {
    debug(this.req.files);
    const filename = Object.keys(this.req.files)[0];
    if (!filename) {
      this.type = 'json';
      this.status = 400;
      this.body = { error: 'upload error' };
      return;
    }
    const { name, extension, mimetype, buffer } = this.req.files[filename];
    const [error, data] = yield new Promise(resolve => {
      s3.putObject({
        ACL: 'public-read',
        Bucket: 'ricehalla',
        Key: name,
        Body: buffer,
        ContentType: mimetype,
      }, (...args) => resolve(args));
    });
    if (error) {
      debug(error);
      this.type = 'json';
      this.status = 400;
      this.body = { error: 'upload error' };
      return;
    }
    debug(data);
    this.status = 200;
    this.body = { response: { name, mimetype } };
  }],
});
