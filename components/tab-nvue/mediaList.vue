<template>
<view>
    <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick" style="margin:0px 25px  0px  25px;background:#fff;">
        <view class="media-list" v-if="options.title">

            <view style="display: flex;">
                <view class="uni-list" style="flex: 6;">
                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                        <view class="uni-media-list">
                            <view class="uni-media-list-logo">
                                <image :src="options.image_url"></image>
                            </view>
                            <view class="uni-media-list-body">
                                <view class="uni-media-list-text-top">{{options.title}}</view>
                                <view class="uni-media-list-text-bottom uni-ellipsis">{{options.title}}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view style="flex: 2;">

                    <view v-show="options.comment_count == 0" class="rcircle_blue">完</view>
                    <view v-show="options.comment_count == 1" class="rcircle_red">未</view>

                </view>
            </view>

            <view style="border-bottom: 1px dashed #d9d9d9;position: relative;top: 7px;margin:0 7px;"></view>
            <view class="semi-circleL"></view>
            <view class="semi-circleR"></view>
            <view class="uni-triplex-row" style="padding: 18px 11px 5px 25px;">
                <view class="uni-triplex-left" style="width:100%">
                    <text class="uni-text">客户订单号：ZRK45756<text class="uni-h5" style="padding-left:15px;"> 重量：800kg</text></text>
                    <text class="uni-text">签单日期：2019.3.5   <text class="uni-h5"  style="padding-left:15px;color:#e80000">交货日期：2019.4.12</text></text>
                    <text class="uni-text-small uni-ellipsis">剩余天数：5天</text>
                </view>
            </view>

            <view class="progress-box" style="padding:0px 65px 0px 25px;color: #57bde5;">
                <progress percent="80" activeColor="#57bce8" backgroundColor="#e5e6ea" active stroke-width="10" style='border-radius:5px;overflow:hidden;'></progress>
                <div class="" style="float:right;position: relative;top: -18px;left: 50px;">80%</div>
            </view>

            <view class="uni-triplex-row" style="padding: 5px 11px 5px 25px;">
                <view class="uni-triplex-left" style="width:100%">
                    <text class="uni-text" style="color:#e80000">已发货：320kg<text class="uni-h5"  style="padding-left:15px;color:#e80000">未发货：480kg</text></text>
                </view>
            </view>


            <view class="uni-triplex-row" style="padding: 25px 15px 25px 25px;">
                <view class="uni-triplex-left" style="width:100%">
                    <text class="uni-text" style="color:#e90100;font-size:18px;font-weight:500">合计：¥ 32000.00</text>
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            default: function(e) {
                return {}
            }
        }
    },
    methods: {
        close(e) {
            this.$emit('close');
        },
        bindClick() {
            this.$emit('click');
        }
    }
}
</script>

<style>
.title {
    padding: 20upx;
}
</style>
