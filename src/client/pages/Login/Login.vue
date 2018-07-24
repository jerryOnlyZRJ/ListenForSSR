<template>
    <div class="login">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">ListenFor</h1>
        </header>
        <div class="mui-content">
            <figure class="app-logo">
                <img class="app-logo-image" src="@/client/assets/images/avatar.webp" />
                <span class="app-logo-title">高效智能的即时语音转文本工具</span>
            </figure>
            <div class="account-container">
                <div class="username-container">
                    <input type="text" ref="usernameInput" name="" id="username-input" placeholder="用户名" />
                </div>
                <div class="password-container">
                    <input type="password" ref="passwordInput" name="" id="password-input" placeholder="密码" />
                    <span class="mui-icon mui-icon-eye login-pwdToggle"></span>
                </div>
            </div>
            <button type="button" class="mui-btn mui-btn-blue mui-btn-block login-btn" @click="loginHandler">登录</button>
            <button type="button" class="mui-btn mui-btn-blue mui-btn-outlined register-btn" @click="registerHandler">立即注册</button>
        </div>
    </div>
</template>
<script>
import request from 'axios'
import md5 from 'blueimp-md5'

export default {
    name: 'Login',
    mounted() {
        const usernameSession = sessionStorage.getItem('username')
        const usernameLocal = localStorage.getItem('username')
        if (usernameSession) {
            this.$refs.usernameInput.value = usernameSession
        } else if (usernameLocal) {
            this.$refs.usernameInput.value = usernameLocal
        }
    },
    methods: {
        loginHandler() {
            const username = this.$refs.usernameInput.value
            const password = this.$refs.passwordInput.value
            if (!username) {
                mui.toast('账号不能为空')
            } else if (!password) {
                mui.toast('密码不能为空')
            } else {
                const passwordMD5 = md5(password)
                request.post('/user/login', {
                    username,
                    password: passwordMD5
                }).then(res => {
                    if (!res.data.state) {
                        mui.toast('登录成功')
                        localStorage.setItem('username', username)
                        setTimeout(() => {
                            mui.openWindow({
                                url: '/dashboard',
                                id: 'dashboard'
                            })
                        }, 1000)
                    } else {
                        mui.alert(res.data.msg, '登录失败')
                    }
                })
            }
        },
        registerHandler() {
            mui.openWindow({
                url: '/register',
                id: 'register'
            })
        }
    }
}
</script>
<style scoped>
.mui-content {
    background: #fff;
}

.app-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.app-logo-image {
    width: 160px;
    height: 144px;
}

.app-logo-title {
    font-weight: bolder;
}

.account-container {
    margin: 2rem 1rem;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 3px;
}

#username-input,
#password-input {
    margin: 0;
    border: none;
    border-radius: 0;
}

#username-input {
    border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.password-container {
    position: relative;
}

.login-btn {
    width: 90%;
    margin: 0 auto;
}

.register-btn {
    position: fixed;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    padding: .5rem 1rem;
}

.login-pwdToggle {
    position: absolute;
    right: .5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #CCCCCC;
}

.login-pwdToggle.active {
    color: #188EEE;
}
</style>