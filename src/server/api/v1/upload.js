import Resource from 'koa-resource-router';
import body from 'koa-body';
import _debug from 'debug';
const debug = _debug('app:upload');

const koaBody = body({
  multipart: true,
  formidable: {
    uploadDir: './uploads',
  },
});

export default new Resource('upload', {
  // POST /upload
  create: [koaBody, function *upload() {
    debug(this.req.files);
    this.body = 'upload';
  }]
});
