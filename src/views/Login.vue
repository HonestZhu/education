<template>
    <div class="body-container">
        <div class="container" id="container">
            <div>
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>创建账号</h1>
                        <input type="text" placeholder="账号名" v-model="registerData.username" />
                        <input type="password" placeholder="密码" v-model="registerData.password" />
                        <div class="btn-grad" @click="register">注册</div>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>登录</h1>
                        <input type="email" placeholder="账号名" v-model="loginData.username" />
                        <input type="password" placeholder="密码" v-model="loginData.password" />
                        <div class="btn-grad" @click="login">登录</div>
                    </form>
                </div>
            </div>

            <div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>欢迎回来</h1>
                            <div class="btn-grad" id="signIn">登录</div>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>你好</h1>
                            <div class="btn-grad" id="signUp">注册</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
    
<script setup>
import { ref, getCurrentInstance, onMounted, computed, inject } from "vue";
import { get, post, put } from '../utils/axios'
import { Message } from "@arco-design/web-vue";
import { useRouter } from 'vue-router';


let loginData = {
    "username": '',
    "password": ''
}

let registerData = {
    "username": '',
    "password": ''
}

const router = useRouter();

function gotoHome() {
    router.push('/home');
}

const login = async () => {
    if (loginData.username.length < 3 || loginData.username.length > 15) {
        Message.error({
            content: '用户名长度应在3-15之间！'
        })
        return
    }
    if (loginData.password.length < 5 || loginData.password.length > 15) {
        Message.error({
            content: '密码长度应在5-15之间！'
        })
        return
    }
    try {
        const response = await post('user/login', loginData);
        let data = response.data
        if (data.code == '100') {
            let token = data.data

            if (localStorage.getItem('token') != null)
                localStorage.removeItem('token')
            if (localStorage.getItem('user') != null)
                localStorage.removeItem('token')

            localStorage.setItem('token', token)
            localStorage.setItem('user', loginData.username)

            Message.success({
                content: '登陆成功'
            })
            gotoHome()
            location.reload()
        } else {
            Message.error({
                content: data.info
            });
        }
    } catch (error) {
        Message.error({
            content: error.message
        });
    }
};


const register = async () => {
    if (registerData.username.length < 3 || loginData.username.length > 15) {
        Message.error({
            content: '用户名长度应在3-15之间！'
        })
        return
    }
    if (registerData.password.length < 5 || loginData.password.length > 15) {
        Message.error({
            content: '密码长度应在5-15之间！'
        })
        return
    }
    try {
        const response = await put('user/register', registerData);
        let data = response.data
        if (data.code == '100') {
            let token = data.data

            if (localStorage.getItem('token') != null)
                localStorage.removeItem('token')
            if (localStorage.getItem('user') != null)
                localStorage.removeItem('token')

            localStorage.setItem('token', token)
            localStorage.setItem('user', registerData.username)

            Message.success({
                content: '注册成功'
            })
            gotoHome()
            location.reload()
        } else {
            Message.error({
                content: data.info
            });
        }
    } catch (error) {
        Message.error({
            content: error.message
        });
    }
};


// function login() {
//     $api.login(loginData).then(res => {
//         if (res.status == 100) {
//             // 更新用户数据和token
//             let user = res.data
//             if (localStorage.getItem('token') != null)
//                 localStorage.removeItem('token')
//             if (localStorage.getItem('user') != null)
//                 localStorage.removeItem('token')

//             localStorage.setItem('token', user.token)
//             delete user.token
//             localStorage.setItem('user', JSON.stringify(user))
//             console.log(localStorage.getItem('user'));
//             nofity.success('成功登录')
//         } else {
//             nofity.error(res.message)
//         }
//     }).catch(error => {
//         console.log(error);
//         nofity.error(error.message)
//     })
// }

// function register() {
//     $api.register(registerData).then(res => {
//         if (res.status == 100) {
//             // 更新用户数据和token
//             let user = res.data
//             if (localStorage.getItem('token') != null)
//                 localStorage.removeItem('token')
//             if (localStorage.getItem('user') != null)
//                 localStorage.removeItem('token')

//             localStorage.setItem('token', user.token)
//             delete user.token
//             localStorage.setItem('user', JSON.stringify(user))
//             console.log(localStorage.getItem('user'));
//             nofity.success('成功注册')
//         } else {
//             nofity.error(res.message)
//         }
//     }).catch(error => {
//         console.log(error);
//         nofity.error(error.message)
//     })
// }

onMounted(() => {

    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpBtn.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInBtn.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
})
</script>
<style scoped>
* {
    /* box-sizing: border-box; */
    margin: 0;
    padding: 0;
}

h1 {
    font-weight: bold;
    margin: 0;
    margin-bottom: 1rem;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}


.btn-grad {
    background-image: linear-gradient(to right, #1675FC 0%, #092650 51%, #1675FC 100%)
}

.btn-grad {
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    border-radius: 10px;
    display: block;
    cursor: pointer;
}

.btn-grad:hover {
    background-position: right center;
    /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

#signIn {
    background-image: linear-gradient(to right, #fff 0%, #f7f3f3 51%, #fff 100%);
    color: #1675FC;
}

#signUp {
    background-image: linear-gradient(to right, #fff 0%, #f7f3f3 51%, #fff 100%);
    color: #1675FC;
}

form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

/*  */
.body-container {
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;

}

.container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

/*  */


.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    /* z-index: 2; */
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    /* z-index: 1; */
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #1675FC;
    background: -webkit-linear-gradient(to right, #1675FC, #092650);
    background: linear-gradient(to right, #1675FC, #092650);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}
</style>