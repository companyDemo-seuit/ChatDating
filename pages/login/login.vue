<template>
<view class="whf" :style="[{ background: iconPath }]">
    <view class="zai-box">
        <image src="../../static/zaizai-login/logo.png" mode='aspectFit' class="zai-logo"></image>
        <!-- <view class="zai-title">LOGO区域</view> -->
        <view class="zai-form">
            <view class="zai-input-btn ">
                <input class="zai-input " placeholder-class="" placeholder="输入手机号码" />
                <text class="zai-icon iconfont" @click="clearSearch">&#xe641;</text>
            </view>
            <view class="zai-input-btn ">
                <input class="zai-input" placeholder-class placeholder="输入验证码" />
                <text class="zai-icon iconfont" @click="clearSearch">&#xe6b2;</text>
                <view class="zai-checking" @click="checking" v-if="state===false">获取验证码</view>
                <view class="zai-checking zai-time" v-if="state===true">倒计时{{ currentTime }}s</view>
            </view>
            <button class="zai-btn" @click="handleLogin">登录</button>
            <navigator url="../zaizai-login/index" open-type='navigateBack' hover-class="none" class="zai-label">已有账号，点此去登录.</navigator>
        </view>
    </view>
</view>
</template>

<script>
export default {
    data() {
        return {
            state: false, //是否开启倒计时
            iconPath: 'url(https://aprils.oss-cn-beijing.aliyuncs.com/1px.png) repeat center / contain',
            totalTime: 60, //总时间，单位秒
            recordingTime: 0, //记录时间变量
            currentTime: 0, //显示时间变量
        }
    },
    onLoad() {
    },
    methods: {
        handleLogin() {
            // uni.redirectTo({
            //     url: 'pages/tabBar/dashboard/dashboard'
            // });
            this.$request({
              url: '/smsVerify',
              data: {
                phoneNumbers: 666,
                smsCode: '123',
              }
            }, 'POST')
              .then(res => {
                console.log(res);
              });
            // uni.navigateBack({
            //     delta: 2
            // });


        },
        checking() {
            //把显示时间设为总时间
            this.currentTime = this.totalTime;
            //开始倒计时
            this.state = true;
            //执行倒计时
            this.checkingTime();

            this.$request({
                url: '/sms',
                data: {
                  phoneNumbers: 666
                }
              }, 'GET')
              .then(res => {
                // this.city = res
                console.log(res);
                window.sessionStorage.setItem('sessionId',res.sessionId)
              });
        },


        checkingTime() {
            let that = this;
            //判断是否开启
            if (this.state) {
                //判断显示时间是否已到0，判断记录时间是否已到总时间
                if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
                    //记录时间增加 1
                    this.recordingTime = this.recordingTime + 1;
                    //显示时间，用总时间 - 记录时间
                    this.currentTime = this.totalTime - this.recordingTime;
                    //1秒钟后，再次执行本方法
                    setTimeout(() => {
                        //定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
                        that.checkingTime();
                    }, 1000)
                } else {
                    //时间已完成，还原相关变量
                    this.state = false; //关闭倒计时
                    this.recordingTime = 0; //记录时间为0
                    this.currentTime = this.totalTime; //显示时间为总时间
                }
            } else {
                //倒计时未开启，初始化默认变量
                this.state = false;
                this.recordingTime = 0;
                this.currentTime = this.totalTime;
            }
        }
    }
}
</script>

<style>
.whf {
    width: 100%;
    height: 100%;
}

.zai-box {
    padding: 0 100upx;
    position: relative;
}

.zai-logo {
    width: 180px;
    height: 155px;
    display: block;
    margin: 0 auto;
}

.zai-title {
    position: absolute;
    top: 0;
    line-height: 360upx;
    font-size: 68upx;
    color: #fff;
    text-align: center;
    width: 100%;
    margin-left: -100upx;
}

.zai-form {
    margin-top: 300upx;
}

.zai-input {
    background:  rgba(255,255,255,0.3);
    margin-top: 30upx;
    border-radius: 100upx;
    padding: 20upx 40upx;
    font-size: 36upx;
}

.input-placeholder,
.zai-input {
    color: #94afce;
}


.zai-label {
    padding: 60upx 0;
    text-align: center;
    font-size: 30upx;
    color: #a7b6d0;
}

.zai-btn {
    background: #26a5ff;
    color: #fff;
    border: 0;
    border-radius: 100upx;
    font-size: 36upx;
    margin-top: 60upx;
}

.zai-btn:after {
    border: 0;
}

/*验证码输入框*/
.zai-input-btn {
    position: relative;
}

.zai-input-btn .zai-input {
    padding-right: 260upx;
}

.zai-icon {
    position: absolute;
    left: -2px;
    top: 0;
    color: #fff;
    border: 0;
    border-radius: 110upx;
    font-size: 36upx;
    margin-left: auto;
    margin-right: auto;
    padding-left: 28upx;
    padding-right: 28upx;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    padding-top: 2upx;
    padding-bottom: 2upx;
}

.zai-checking {
    position: absolute;
    right: 0;
    top: 0;
    background: #26a5ff;
    color: #fff;
    border: 0;
    border-radius: 110upx;
    font-size: 36upx;
    margin-left: auto;
    margin-right: auto;
    padding-left: 28upx;
    padding-right: 28upx;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    padding-top: 2upx;
    padding-bottom: 2upx;
}

.zai-checking.zai-time {
    background: #a7b6d0;
}

/*按钮点击效果*/
.zai-btn.button-hover {
    transform: translate(1upx, 1upx);
}
</style>
