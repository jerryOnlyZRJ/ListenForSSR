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
    @route("/register")
    @POST()
    async register(ctx) {
        const {
            username,
            password
        } = ctx.request.body
        ctx.body = await this.userService.register(username, password)
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

    // GET /user/iswordexists?user=ranjayzheng&title=test
    @route("/iswordexists")
    @POST()
    async isWordExists(ctx) {
        const {
            user,
            title
        } = ctx.request.query
        ctx.body = await this.userService.isWordExists(user, title)
    }

    // GET /user/getwordlist?user=ranjayzheng
    @route("/getwordlist")
    @GET()
    async getWordList(ctx) {
        const username = ctx.request.query.user
        ctx.body = await this.userService.getWordList(username)
    }

    // POST {user, title}
    @route("/deleteword")
    @POST()
    async deleteWord(ctx) {
        const deleteOptions = ctx.request.body
        ctx.body = await this.userService.deleteWord(deleteOptions)
    }

    // POST {user, title, date, content}
    @route("/updatewords")
    @POST()
    async updateWords(ctx) {
        const updateOptions = ctx.request.body
        ctx.body = await this.userService.updateWords(updateOptions)
    }
}