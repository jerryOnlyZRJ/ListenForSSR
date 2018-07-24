 import {
   createBundleRenderer
 } from 'vue-server-renderer';
 import fs from "fs"
 import path from "path"
 import LRU from 'lru-cache'
 export default class IndexService {
   constructor() {}
   async init(ctx) {
     const serverBundle = require(path.join(__dirname, '../assets/vue-ssr-server-bundle.json'));
     const clientManifest = require(path.join(__dirname, '../assets/vue-ssr-client-manifest.json'));
     const template = fs.readFileSync(path.join(__dirname, '../assets/index.html'), 'utf-8');
     const context = {
       url: ctx.url
     };
     const ssrrender = this.createRenderer(serverBundle, template, clientManifest);

     function createSSRStreamPromise() {
       return new Promise((resolve, reject) => {
         if (!ssrrender) {
           return ctx.body = 'waiting for compilation.. refresh in a moment.'
         }
         const ssrStream = ssrrender.renderToStream(context);
         ctx.status = 200;
         ctx.type = 'html';
         ssrStream.on('error', err => {
           reject(err)
         }).pipe(ctx.res);
       });
     }
     await createSSRStreamPromise(context);
   }
   createRenderer(serverbundle, template, clientManifest) {
     return createBundleRenderer(serverbundle, {
       cache: LRU({
         max: 10000
       }),
       runInNewContext: false,
       template,
       clientManifest
     });
   }
 }