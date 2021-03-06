<template>
    <div class="login">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">ListenFor</h1>
        </header>
        <div class="mui-content">
            <span class="try-it mui-icon mui-icon-forward" @click="takeATry">立即体验</span>
            <figure class="app-logo">
                <img class="app-logo-image" src="@/assets/images/avatar.webp" />
                <span class="app-logo-title">高效智能的即时语音转文本工具</span>
            </figure>
            <div class="account-container">
                <div class="username-container">
                    <input type="text" ref="usernameInput" name="" id="username-input" placeholder="用户名" />
                </div>
                <div class="password-container">
                    <input type="password" ref="passwordInput" name="" id="password-input" placeholder="密码" />
                    <span class="mui-icon mui-icon-eye login-pwdToggle" @click="pwdToggle"></span>
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
import config from '@/config'

export default {
    name: 'Login',
    mounted() {
        const documentHeight = document.documentElement.clientHeight
        const registerBtn = document.querySelector('.register-btn')
        if (documentHeight > 550) {
            registerBtn.style.zIndex = 1
        }
        window.addEventListener('resize', () => {
            const documentHeight = document.documentElement.clientHeight
            if (documentHeight <= 550) {
                registerBtn.style.zIndex = -1
            } else {
                registerBtn.style.zIndex = 1
            }
        })
        const usernameSession = sessionStorage.getItem('username')
        const usernameLocal = localStorage.getItem('username')
        if (usernameSession) {
            this.$refs.usernameInput.value = usernameSession
        } else if (usernameLocal) {
            this.$refs.usernameInput.value = usernameLocal
        }
    },
    methods: {
        takeATry() {
            localStorage.setItem('title', "Try")
            location.href = `${config.domain}editor`
        },
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
                        if (localStorage.getItem('hasEditorWithoutAccount')) {
                            setTimeout(() => {
                                location.href = config.domain + 'editor'
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                mui.openWindow({
                                    url: config.domain + 'dashboard',
                                    id: 'dashboard'
                                })
                            }, 1000)
                        }
                    } else {
                        mui.alert(res.data.msg, '登录失败')
                    }
                })
            }
        },
        registerHandler() {
            mui.openWindow({
                url: config.domain + 'register',
                id: 'register'
            })
        },
        pwdToggle(e) {
            e.target.classList.toggle('active')
            if (e.target.classList.contains('active')) {
                e.target.parentNode.firstElementChild.type = 'text'
            } else {
                e.target.parentNode.firstElementChild.type = 'password'
            }
        }
    }
}
</script>
<style scoped>
.mui-content {
    position: relative;
    background: #fff;
}

.try-it {
    position: absolute;
    right: 1rem;
    top: 60px;
    font-size: 1.2rem;
    color: #999;
}

.try-it::before {
    float: right;
}

.app-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 40px 1rem;
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
    position: absolute;
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