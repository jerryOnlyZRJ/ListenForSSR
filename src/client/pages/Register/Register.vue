<template>
    <div class="register">
      <header class="mui-bar mui-bar-nav">
          <h1 class="mui-title">ListenFor</h1>
      </header>
      <div class="mui-content">
          <figure class="app-logo">
              <img class="app-logo-image" src="@/client/assets/images/avatar.jpg" />
              <span class="app-logo-title">高效智能的即时语音转文本工具</span>
          </figure>
          <div class="account-container">
              <div class="username-container">
                  <input type="text" name="" id="username-input" placeholder="用户名" />
              </div>
              <div class="password-container">
                  <input type="password" name="" id="password-input" placeholder="密码" />
              </div>
              <div class="password-container">
                  <input type="password" name="" id="password-confirm" placeholder="确认密码" />
              </div>
          </div>
          <button type="button" class="mui-btn mui-btn-blue mui-btn-block register-btn">立即注册</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style scoped>
      .mui-content {
        background: #fff;
        height: 100vh;
      }
      
      .app-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .app-logo-image {
        width: 10rem;
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
      #password-input,
      #password-confirm {
        margin: 0;
        border: none;
        border-radius: 0;
      }
      
      #username-input,
      #password-input {
        border-bottom: 1px solid rgba(0, 0, 0, .2);
      }
      
      .register-btn {
        width: 90%;
        margin: 0 auto;
      }
</style>
