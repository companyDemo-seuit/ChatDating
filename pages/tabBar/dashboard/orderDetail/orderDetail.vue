<template>
<view class="example listBg">

    <view style="padding-top:20px;padding-bottom:40px;">
    <view class="" style=" display:flex;width: 100%;">

        <view class="" style="flex:1;display: flex;align-items: center; justify-content: center; " @click="swiper_index = 0">
            <text class="iconfont">&#xe606;{{swiper_index}}</text>
        </view>

        <view class="uni-margin-wrap" style="flex:10">
            <swiper class="swiper" :current="swiper_index" v-model="swiper_index" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" @change="changeSwiper">
                <swiper-item>
                    <media-list :options="newsitem" @close="close(index1,index2)"></media-list>
                </swiper-item>
                <swiper-item>
                    <media-list :options="newsitem" @close="close(index1,index2)"></media-list>
                </swiper-item>
                <swiper-item>
                    <media-list :options="newsitem" @close="close(index1,index2)"></media-list>
                </swiper-item>
            </swiper>
        </view>

        <view class="" style="flex:1;display: flex;align-items: center; justify-content: center; " @click="swiper_index = 1">
            <text class="iconfont">&#xe64b;{{swiper_index}}</text>
        </view>

    </view>


    <uni-steps :options="list2" :active="active" direction="column" />
</view>
</view>
</template>
<script>
import mediaList from '@/components/tab-nvue/mediaList.vue';
import uniSteps from '@/components/uni-steps/uni-steps.vue'
export default {
    components: {
        mediaList,
        uniSteps
    },
    data() {
        return {
            title: '',
            active: 2,
            list2: [{
                title: '买家下单',
                desc: '2018-11-11'
            }, {
                title: '卖家发货',
                desc: '2018-11-12'
            }, {
                title: '买家签收',
                desc: '2018-11-13'
            }, {
                title: '交易完成',
                desc: '2018-11-14'
            }],
            newsitem: {
                "datetime": "40分钟前",
                "article_type": 0,
                "title": "不锈钢管订购合同1",
                "source": "订单号：000002352356",
                "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
                "comment_count": 0
            },
            background: ['color1', 'color2', 'color3'],
            indicatorDots: false,
            autoplay: false,
            interval: 2000,
            duration: 500,
            swiper_index: 0
        }
    },
    onLoad(e) {
        this.title = e.title || '';
    },
    methods: {
      changeSwiper(e){
          this.swiper_index = parseInt(e.detail.current)
      }
    }
}
</script>
<style>
/* page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: linear-gradient(top, rgb(49, 147, 186, 1) 1%, rgb(117, 216, 250) 99%);
} */
.listBg {
    background: linear-gradient(rgba(49, 147, 186, 1), rgba(117, 216, 250,1));
}

.uni-margin-wrap {
    width: 490upx;
    margin: 0 auto;
}

.swiper {
    height: 700upx;
}

.swiper-item {
    display: block;
    height: 700upx;
    line-height: 700upx;
    text-align: center;
}

.swiper-list {
    margin-top: 40upx;
    margin-bottom: 0;
}

.uni-common-mt {
    margin-top: 60upx;
    position: relative;
}

.info {
    position: absolute;
    right: 20upx;
}
</style>
