import {
    route,
    GET,
    POST,
    before
} from 'awilix-koa'

@route('/user')
export default class TestRouter {
    constructor({
        userService
    }) {
        this.userService = userService
    }

    @GET()
    async getTest(ctx) {
        ctx.body = 'test user routers'
    }

    // POST {username, password(md5)}
    @route("/login")
    @POST()
    async login(ctx) {
        const {
            username,
            password
        } = ctx.request.body
        ctx.body = await this.userService.checkPassword(username, password)
    }

    // POST {username, password(md5)}
    @route("/register")
    @POST()
    async register(ctx) {
        const {
            username,
            password
        } = ctx.request.body
        ctx.body = await this.userService.register(username, password)
    }

    // GET /user/getwordlist?user=ranjayzheng
    @route("/getwordlist")
    @POST()
    async getWordList(ctx) {
        const username = ctx.request.query.user
        ctx.body = await this.userService.getWordList(username)
    }

    // POST {title, date, content}
    @route("/updatewords")
    @POST()
    async updateWords(ctx) {
        const updateOptions = ctx.request.body
        ctx.body = await this.userService.updateWords(updateOptions)
    }
}