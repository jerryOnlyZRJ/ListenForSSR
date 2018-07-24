import {
    route,
    GET,
    POST,
    before
} from 'awilix-koa'
import fs from 'fs'
import path from 'path'
import LRU from 'lru-cache'

@route('/')
@route('/dashboard')
@route('/editor')
@route('/register')
export default class IndexRouter {
    constructor({
        indexService
    }) {
        this.indexService = indexService
    }

    @GET()
    async getIndex(ctx, next) {
        await this.indexService.init(ctx)
    }

}