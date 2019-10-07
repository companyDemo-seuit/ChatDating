<template>
<view class="whf" :style="[{ background: iconPath }]">
    <view class="zai-box">
        <image src="../../static/zaizai-login/logo.png" mode='aspectFit' class="zai-logo"></image>
        <!-- <view class="zai-title">LOGO区域</view> -->
        <view class="zai-form">

            <block v-if="hasUserInfo === true">
                <view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName}}</view>
                <view style="padding:30upx 0; text-align:center;">
                    <image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
                </view>
            </block>
            <button class="zai-btn" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">授权登录</button>
        </view>


        <uni-popup :show="showgetPhoneNumber" position="middle" mode="fixed" @hidePopup="togglePopup(false)">
            <view class="uni-center center-box">
                <view class="uni-flex uni-column" style="width:220px;">
                    <view class="flex-item flex-item-V bg_w" style="padding:10px 5px;font-size: 15px;">绑定手机号码</view>
                    <view class="flex-item flex-item-V bg_w">为了您账号的安全性，请绑定手机号码</view>
                    <view class="flex-item flex-item-V bg_w">
                        <view class="uni-flex uni-row">
                            <view class="flex-item " style="flex:1;padding: 20px;height: 1;"> <button @click="jumpTel" style="font-size: 12px;">跳过</button></view>
                            <view class="flex-item " style="flex:1;padding: 20px;height: 1;"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" style="font-size: 12px;">确定</button></view>
                        </view>

                    </view>
                </view>


                <!-- <image class="image" src="/static/uni.png" /> -->
            </view>
        </uni-popup>
    </view>
</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
var WXBizDataCrypt = require('@/components/WXBizDataCrypt/WXBizDataCrypt.js');
export default {
    components: {
        uniPopup
    },
    data() {
        return {
            iconPath: 'url(https://aprils.oss-cn-beijing.aliyuncs.com/1px.png) repeat center / contain',
            hasUserInfo: false,
            showgetPhoneNumber: false,
            userInfo: {},
            login_code: '',
            signature: ''
        }
    },
    onLoad: function() {

        var that = this;

        uni.login({
            success: function(res) {

                // 获取code
                console.log(JSON.stringify(res));
                //{"errMsg":"login:ok","code":"071JIp1t1pv马赛克t1Ran1t1JIp1l"}

                that.login_code = res.code;
            }
        });
    },
    methods: {

        togglePopup(type) {
            this.showgetPhoneNumber = type
        },
        mpGetUserInfo(result) {
            console.log('mpGetUserInfo', result);
            if (result.detail.errMsg !== 'getUserInfo:ok') {
                uni.showModal({
                    title: '获取用户信息失败',
                    content: '错误原因' + result.detail.errMsg,
                    showCancel: false
                });
                return;
            }
            this.hasUserInfo = true;
            this.userInfo = result.detail.userInfo;
            this.$request({
                    url: '/wx/login',
                    data: {
                        userName: result.detail.userInfo.nickName,
                        password: result.detail.signature,

                    }
                }, 'POST')
                .then(res => {
                    var that = this
                    this.signature = result.detail.signature
                    uni.setStorageSync('sessionId', res.data.token)
                    if (res.data.rows.length > 0 && !res.data.rows[0].iphoneNum) {

                        that.togglePopup(true)
                        // uni.showModal({
                        //     title: "绑定手机号码",
                        //     content: "为了您账号的安全性，请绑定手机号码",
                        //     confirmText: "确定",
                        //     cancelText: "取消",
                        //     success(res) {
                        //         if (res.confirm) {
                        //             // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        //             that.togglePopup(true)
                        //         }
                        //     }
                        //
                        // })
                    } else {
                        // uni.switchTab({
                        //     url: 'pages/tabBar/dashboard/dashboard'
                        // });
                        uni.navigateBack({
                            delta: 1
                        });
                    }
                    console.log(res);
                });


        },
        jumpTel() {
            this.showgetPhoneNumber = false
            uni.navigateBack({
                delta: 1
            });
            // uni.redirectTo({
            //     url: 'pages/tabBar/dashboard/dashboard'
            // });
        },
        getPhoneNumber: function(e) {
            var that = this
            console.log(e);
            if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
                console.log('用户拒绝提供手机号');
            } else {
                console.log('用户同意提供手机号');

                // console.log(JSON.stringify(e.detail.encryptedData));
                // console.log(JSON.stringify(e.detail.iv));

                var encryptedData = e.detail.encryptedData;
                var iv = e.detail.iv;

                ////////////////////////////////////////////////////////////////////////////////
                //定义在根目录下的main.js里
                //Vue.prototype.APPID                           = 'wxb1a马赛克2bfc90a';
                //Vue.prototype.SECRET                          = 'b3ae36758马赛克dbe146d9acd81d';
                //Vue.prototype.WX_AUTH_URL                     = 'https://api.weixin.qq.com/sns/jscode2session';

                var JSCODE = this.login_code;
                // var APPID = this.APPID;
                // var SECRET = this.SECRET;
                // var wx_author_url = this.WX_AUTH_URL + '?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code';
                //
                // 		console.log(wx_author_url);

                that.$request({
                        url: '/wx/jscode2session',
                        data: {
                            JSCODE: JSCODE,
                        }
                    }, 'GET')
                    .then(res => {
                        var appId = res.appid;
                        var sessionKey = JSON.parse(res.session_key).session_key;
                        console.log(appId);
                        console.log(sessionKey);
                        var pc = new WXBizDataCrypt(appId, sessionKey);
                        var telData = pc.decryptData(encryptedData, iv);
                        console.log('解密后 data: ', JSON.stringify(telData));

                        this.$request({
                                url: '/wx/setTel',
                                data: {
                                    phoneNumber: telData.phoneNumber,
                                    password: this.signature,
                                }
                            }, 'POST')
                            .then(res => {
                                that.showgetPhoneNumber = false
                                console.log(res);
                                uni.navigateBack({
                                    delta: 1
                                });
                            });

                    });


            }

        },
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
    background: rgba(255, 255, 255, 0.3);
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

.userinfo-avatar {
    border-radius: 128upx;
    width: 128upx;
    height: 128upx;
}
</style>
