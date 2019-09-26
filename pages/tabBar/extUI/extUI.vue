<template>
<view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
        <view style="background:#FFF; padding:40upx;">
            <block v-if="hasUserInfo === false">
                <view class="uni-hello-text uni-center">
                    <text>请点击下方按钮获取用户头像及昵称</text>
                </view>
            </block>
            <block v-if="hasUserInfo === true">
                <view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName}}</view>
                <view style="padding:30upx 0; text-align:center;">
                    <image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
                </view>
            </block>
        </view>
        <view class="uni-btn-v">
            <!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
            <button type="primary" @click="getUserInfo">获取用户信息</button>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN || MP-BAIDU -->
            <button type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">获取用户信息</button>
            <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>
            <!-- #endif -->
            <button @click="clear">清空</button>
        </view>
    </view>
</view>
</template>
<script>


var WXBizDataCrypt = require('@/components/WXBizDataCrypt/WXBizDataCrypt.js');
import {
    mapState,
    mapMutations
} from 'vuex'

export default {
    data() {
        return {
            title: 'getUserInfo',
            hasUserInfo: false,
            userInfo: {},
						 login_code : '',
        }
    },
    computed: {
        ...mapState({
            loginProvider: state => state.loginProvider
        })
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
        // 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
        getUserInfo() {
            uni.getUserInfo({
                provider: this.loginProvider,
                success: (result) => {
                    console.log('getUserInfo success', result);
                    this.hasUserInfo = true;
                    this.userInfo = result.userInfo;
                },
                fail: (error) => {
                    console.log('getUserInfo fail', error);
                    let content = error.errMsg;
                    if (~content.indexOf('uni.login')) {
                        content = '请在登录页面完成登录操作';
                    }
                    uni.showModal({
                        title: '获取用户信息失败',
                        content: '错误原因' + content,
                        showCancel: false
                    });
                }
            });
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
        },
        getPhoneNumber: function(e) {
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
                var APPID = this.APPID;
                var SECRET = this.SECRET;
                var wx_author_url = this.WX_AUTH_URL + '?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code';

										console.log(wx_author_url);
                uni.request({
                    url: wx_author_url,
                    success(re) {
                        console.log('session_key:' + re.data.session_key);

                        var appId = APPID;
                        var sessionKey = re.data.session_key;

                        var pc = new WXBizDataCrypt(appId, sessionKey);
                        var data = pc.decryptData(encryptedData, iv);

                        console.log('------------------->');
                        console.log('解密后 data: ', data);
                        // console.log('解密后 data: ', JSON.stringify(data));
                        /*
															 {
																	 "phoneNumber": "139马赛克9490",
																	 "purePhoneNumber": "139马赛克9490",
																	 "countryCode": "86",
																	 "watermark": {
																			 "timestamp": 1560577589,
																			 "appid": "wxb1a马赛克12bfc90a"
																	 }
															 }
													 */
                        console.log('------------------->');

                    }
                });
                ////////////////////////////////////////////////////////////////////////////////

            }

        },
        clear() {
            this.hasUserInfo = false;
            this.userInfo = {};
        }
    }
}
</script>

<style>
.userinfo-avatar {
    border-radius: 128upx;
    width: 128upx;
    height: 128upx;
}
</style>
