import { createReadStream, existsSync, statSync, realpathSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Serve the sibling public dashboard through the same local URL, without another server.
// Only public assets and its published JSON are reachable; ETL and configuration are excluded.
export function dashboardDev() {
  const root = fileURLToPath(new URL('../../wir-susep-dashboard/', import.meta.url));
  const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.ico':'image/x-icon' };
  return { name:'wir-dashboard-local', configureServer(server) {
    server.middlewares.use((req,res,next)=>{
      if (!req.url?.startsWith('/dashboard')) return next();
      const url = new URL(req.url,'http://localhost');
      if(url.pathname === '/dashboard') {res.writeHead(302,{Location:'/dashboard/'+url.search}); return res.end();}
      if(!url.pathname.startsWith('/dashboard/'))return next();
      let relative;
      try {relative=decodeURIComponent(url.pathname.slice('/dashboard/'.length)) || 'index.html';} catch {res.statusCode=400;return res.end();}
      if (!/^(index\.html|favicon\.svg|assets\/[\w./-]+|data\/data\.json)$/.test(relative) || relative.split('/').includes('..')) {res.statusCode=404; return res.end();}
      const file=resolve(root,relative);
      if(!existsSync(file)||!statSync(file).isFile()||!realpathSync(file).startsWith(realpathSync(root)+sep)||!types[extname(file)]) {res.statusCode=404;return res.end('Dashboard asset unavailable');}
      res.setHeader('Content-Type',types[extname(file)]+'; charset=utf-8');
      res.setHeader('Cache-Control','no-cache');
      if(req.method==='HEAD')return res.end();
      createReadStream(file).on('error',()=>res.destroy()).pipe(res);
    });
  }};
}
