<template>
<view class="example listBg">
    <view style="padding-top:20px;padding-bottom:40px;">
        <media-list :options=" newsitem" @close="close(index1,index2)">
        </media-list>

        <view class="list-cell " hover-class="uni-list-cell-hover" @click="bindClick" style="margin: 0 25px  0 25px;background:#fff">
            <view class="media-list" style="margin: 0px 25px 5px 25px;border-top: 1px solid#ccc;">
                <view class="uni-triplex-left" style="width:100%;padding:20px 0 ">
                    <text class="uni-text">销售联系人:张三 <text class="uni-h5" style="padding-left:15px;"> 联系电话:12381233322</text></text>
                </view>
            </view>

            <view style="padding:10px 0" @click="goDetail(newsitem)">
                <view class="media-list" style="display: flex;width: 100%;">
                    <view class="uni-list" style="flex: 6;">
                        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                            <view class="uni-media-list">
                                <view class="uni-media-list-logo">
                                    <image :src="newsitem.image_url"></image>
                                </view>
                                <view class="uni-media-list-body">
                                    <view class="uni-media-list-text-top">{{newsitem.title}}</view>
                                    <view class="uni-media-list-text-bottom uni-ellipsis">{{newsitem.title}}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view style="flex: 2;">
                        <view v-show="newsitem.comment_count == 0" class="rcircle_blue">完</view>
                        <view v-show="newsitem.comment_count == 1" class="rcircle_red">未</view>
                    </view>
                </view>
                <view class="progress-box" style="padding:0px 65px 0px 25px;color: #57bde5;">
                    <progress percent="80" activeColor="#57bce8" backgroundColor="#e5e6ea" active stroke-width="10" style='border-radius:5px;overflow:hidden;'></progress>
                    <div class="" style="float:right;position: relative;top: -18px;left: 50px;">80%</div>
                </view>
            </view>
            <view style="padding:10px 0" @click="goDetail(newsitem)">
                <view class="media-list" style="display: flex;width: 100%;">
                    <view class="uni-list" style="flex: 6;">
                        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                            <view class="uni-media-list">
                                <view class="uni-media-list-logo">
                                    <image :src="newsitem.image_url"></image>
                                </view>
                                <view class="uni-media-list-body">
                                    <view class="uni-media-list-text-top">{{newsitem.title}}</view>
                                    <view class="uni-media-list-text-bottom uni-ellipsis">{{newsitem.title}}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view style="flex: 2;">
                        <view v-show="newsitem.comment_count == 0" class="rcircle_blue">完</view>
                        <view v-show="newsitem.comment_count == 1" class="rcircle_red">未</view>
                    </view>
                </view>
                <view class="progress-box" style="padding:0px 65px 0px 25px;color: #57bde5;">
                    <progress percent="80" activeColor="#57bce8" backgroundColor="#e5e6ea" active stroke-width="10" style='border-radius:5px;overflow:hidden;'></progress>
                    <div class="" style="float:right;position: relative;top: -18px;left: 50px;">80%</div>
                </view>
            </view>
            <view style="padding:10px 0" @click="goDetail(newsitem)">
                <view class="media-list" style="display: flex;width: 100%;">
                    <view class="uni-list" style="flex: 6;">
                        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                            <view class="uni-media-list">
                                <view class="uni-media-list-logo">
                                    <image :src="newsitem.image_url"></image>
                                </view>
                                <view class="uni-media-list-body">
                                    <view class="uni-media-list-text-top">{{newsitem.title}}</view>
                                    <view class="uni-media-list-text-bottom uni-ellipsis">{{newsitem.title}}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view style="flex: 2;">
                        <view v-show="newsitem.comment_count == 0" class="rcircle_blue">完</view>
                        <view v-show="newsitem.comment_count == 1" class="rcircle_red">未</view>
                    </view>
                </view>
                <view class="progress-box" style="padding:0px 65px 0px 25px;color: #57bde5;">
                    <progress percent="80" activeColor="#57bce8" backgroundColor="#e5e6ea" active stroke-width="10" style='border-radius:5px;overflow:hidden;'></progress>
                    <div class="" style="float:right;position: relative;top: -18px;left: 50px;">80%</div>
                </view>
            </view>


        </view>
    </view>
</view>
</template>
<script>
import mediaList from '@/components/tab-nvue/mediaList.vue';
export default {
    components: {
        mediaList
    },
    data() {
        return {
            newsitem: {
                "datetime": "40分钟前",
                "article_type": 0,
                "title": "不锈钢管订购合同1",
                "source": "订单号：000002352356",
                "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
                "comment_count": 0
            },
        }
    },
    onLoad(e) {
        this.title = e.title || '';
    },
    methods: {
        goDetail(e) {
            uni.navigateTo({
                url: '/pages/tabBar/dashboard/orderDetail/orderDetail?title=' + e.title
            });
        },

    }
}
</script>
<style>
/* page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background:linear-gradient(top,rgb(49, 147, 186,1) 1%,rgb(117, 216, 250) 99%);
    background-size:100%
} */
.listBg {
    background: linear-gradient(rgba(49, 147, 186, 1), rgba(117, 216, 250,1));
}
</style>
