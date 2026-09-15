import { existsSync, createReadStream } from 'node:fs';
import { resolve } from 'node:path';

// Vite's SPA fallback must not turn directory-style article URLs into the home page.
export function articlesDev() {
  return {name:'wir-static-articles',configureServer(server){
    server.middlewares.use((req,res,next)=>{
      const url=new URL(req.url,'http://localhost');
      if(url.pathname.startsWith('/es/insights/')) {res.writeHead(302,{Location:url.pathname.replace('/es/insights/','/insights/')+url.search});return res.end();}
      if(!/^\/(en\/)?insights\/(?:[a-z0-9-]+\/)?$/.test(url.pathname))return next();
      const file=resolve('public','.'+url.pathname,'index.html');
      if(!existsSync(file)){res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');return res.end('<h1>Article not found</h1><a href="/insights/">Insights</a>');}
      res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Cache-Control','no-cache');
      if(req.method==='HEAD')return res.end();createReadStream(file).on('error',()=>res.destroy()).pipe(res);
    });
  }};
}
