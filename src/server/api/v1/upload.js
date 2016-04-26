import Resource from 'koa-resource-router';
import multer from 'koa-multer';
import _debug from 'debug';
const debug = _debug('app:upload');

const MulterMiddleware = multer({
  dest: './uploads',
  limits: {
    files: 1,
    fileSize: 2 * 1024 * 1024,
  },
  rename: (fieldname, filename) => filename,
  onFileUploadStart: (file) => {
    const mimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain',
      'application/octet-stream',
    ];
    const valid = ~mimeTypes.indexOf(file.mimetype);
    if (!valid) {
      debug('invalid mimetype', file.mimetype);
    }
    return valid;
  }
});

export default new Resource('upload', {
  // POST /upload
  create: [MulterMiddleware, function *create() {
    debug(this.req.files);
    const filename = Object.keys(this.req.files)[0];
    if (filename) {
      const { name, extension } = this.req.files[filename];
      this.status = 200;
      this.body = { response: { name, extension } };
    } else {
      this.status = 400;
      this.body = { errors: 'upload error' };
    }
  }]
});
