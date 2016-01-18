import { Router }  from 'express';
import serveStatic from 'serve-static';
import path        from 'path';

let router = Router();

// options for serveStatic
let serveStaticOptions = {
  dotfiles     : 'ignore',
  index        : false,
  lastModified : false,
  // maxAge       : '1d',
  redirect     : false,
}

function serveStaticOptionsGenerator(type) {
  var mimeString = '';
  if (type === 'css') {
    mimeString = 'text/css';
  } else if (type === 'js') {
    mimeString = 'application/javascript';
  } else if (type === 'png') {
    mimeString = 'image/png';
  } else if (type === 'ico') {
    mimeString = 'image/x-icon';
  } else {
    mimeString = '';
  }
  if (mimeString !== '') {
    let setHeaders = function(res, path, stat) {
      res.setHeader('Content-Type', mimeString)
    }
    let finalOptions = Object.assign(serveStaticOptions, {
      setHeaders: setHeaders
    })
    return finalOptions;
  } else {
    return serveStaticOptions
  }
}

// Serving static files
router.use(serveStatic(path.resolve(__dirname, '..', '..', 'build'), serveStaticOptionsGenerator('js')));
router.use(serveStatic(path.resolve(__dirname, '..', '..', 'public', 'assets', 'js'), serveStaticOptionsGenerator('js')));
router.use(serveStatic(path.resolve(__dirname, '..', '..', 'public', 'assets', 'css'), serveStaticOptionsGenerator('css')));
router.use(serveStatic(path.resolve(__dirname, '..', '..', 'public', 'assets', 'png'), serveStaticOptionsGenerator('png')));
router.use(serveStatic(path.resolve(__dirname, '..', '..', 'public', 'assets', 'favicon'), serveStaticOptionsGenerator('png')));


export default router;
