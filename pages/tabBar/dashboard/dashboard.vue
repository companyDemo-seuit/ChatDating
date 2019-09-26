<template>
<view class="uni-tab-bar" id='dashboard'>
	<jsfun-record
	  maxTime="15"
	  minTime="2"
	  @okClick="saveRecord"
	>
	    <view class="centerwz">录制语音</view>
	</jsfun-record>
</view>
</template>
<script>
import mediaList from '@/components/tab-nvue/mediaList.vue';
import jsfunRecord from '@/components/jsfun-record/jsfun-record.vue'
const tpl = {
    data0: {
        "datetime": "40分钟前",
        "article_type": 0,
        "title": "不锈钢管订购合同1",
        "source": "订单号：000002352356",
        "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
        "comment_count": 0
    },
    data1: {
        "datetime": "一天前",
        "article_type": 1,
        "title": "不锈钢管订购合同2",
        "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
        "source": "订单号：000002352356",
        "comment_count": 1
    },
    data2: {
        "datetime": "一天前",
        "article_type": 2,
        "title": "不锈钢管订购合同3",
        "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
        "source": "订单号：000002352356",
        "comment_count": 1
    },
    data3: {
        "article_type": 3,
        "image_list": [{
            "url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
            "width": 563,
            "height": 316
        }, {
            "url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
            "width": 641,
            "height": 360
        }, {
            "url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
            "width": 640,
            "height": 360
        }],
        "datetime": "5分钟前",
        "title": "不锈钢管订购合同4",
        "source": "订单号：000002352356",
        "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
        "comment_count": 0
    },
    data4: {
        "datetime": "2小时前",
        "article_type": 4,
        "title": "不锈钢管订购合同5",
        "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
        "source": "订单号：000002352356",
        "comment_count": 1
    }
};

export default {
    components: {
        mediaList,
				jsfunRecord
    },
    data() {
        return {
            scrollLeft: 0,
            isClickChange: false,
            tabIndex: 0,
            newsitems: [],
            tabBars: [{
                name: '全部合同',
                id: 'guanzhu'
            }, {
                name: '未完成',
                id: 'tuijian'
            }, {
                name: '已完成',
                id: 'tiyu'
            }],
            arrList: [],
            title: '下拉刷新 + 加载更多',
            loadMoreText: "加载中...",
            showLoadMore: false,
            max: 0
        }
    },
    onLoad() {
        this.newsitems = this.randomfn()
        // this.toRobot()
    },
    onUnload() {
        this.max = 0,
            this.data = [],
            this.loadMoreText = "加载更多",
            this.showLoadMore = false;
    },
    // onReachBottom() {
    // 	debugger
    // 	console.log("onReachBottom");
    // 	if (this.max > 40) {
    // 		this.loadMoreText = "没有更多数据了!"
    // 		return;
    // 	}
    // 	this.showLoadMore = true;
    // 	setTimeout(() => {
    // 		this.setDate();
    // 	}, 300);
    // },
    onPullDownRefresh() {
        // this.toRobot()
    },
    methods: {
			saveRecord: function(recordPath) {
			 console.log("===音频文件地址："+recordPath+"===")
			 //do... 可以使用 uni.uploadFile 接口上传到服务器
	 },
        toRobot() {
            // this.addMessage('home', info, false);
            var apiUrl = 'http://222.73.22.8:43433/api/dashboardList?picType=';
            uni.request({
                url: apiUrl,
                data: {
                    // "key": 'acfbca724ea1b5db96d2eef88ce677dc',
                    // "info": info,
                    // "userid": 'uni-test'
                },
                success: (res) => {
                    console.log("data", res);
                    this.arrList = res.data.data.list
                    uni.stopPullDownRefresh();
                    console.log('request success:' + this.arrList);
                },
                fail: (err) => {
                    console.log('request fail', err);
                    uni.showModal({
                        content: err.errMsg,
                        showCancel: false
                    })
                }
            });
        },
        // setDate() {
        // 	let data = [];
        // 	this.max += 10;
        // 	for (var i = this.max - 9; i < this.max + 1; i++) {
        // 		data.push(i)
        // 	}
        // 	debugger
        // 	this.arrList = this.arrList.concat(data);
        // },
        onPullDownRefresh() {
            console.log('refresh');
            setTimeout(function() {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        goDetail(e) {
            uni.navigateTo({
                url: '/pages/tabBar/dashboard/contractDetail/contractDetail?title=' + e.title
            });
        },
        close(index1, index2) {
            uni.showModal({
                content: '是否删除本条信息？',
                success: (res) => {
                    if (res.confirm) {
                        this.newsitems[index1].data.splice(index2, 1);
                    }
                }
            })
        },
        loadMore(e) {
            setTimeout(() => {
                this.addData(e);
            }, 1200);
        },
        addData(e) {
            if (this.newsitems[e].data.length > 30) {
                this.newsitems[e].loadingText = '没有更多了';
                return;
            }
            for (let i = 1; i <= 10; i++) {
                this.newsitems[e].data.push(tpl['data' + Math.floor(Math.random() * 5)]);
            }
        },
        async changeTab(e) {
            let index = e.target.current;
            if (this.newsitems[index].data.length === 0) {
                this.addData(index)
            }
            if (this.isClickChange) {
                this.tabIndex = index;
                this.isClickChange = false;
                return;
            }
            let tabBar = await this.getElSize("tab-bar"),
                tabBarScrollLeft = tabBar.scrollLeft;
            let width = 0;

            for (let i = 0; i < index; i++) {
                let result = await this.getElSize(this.tabBars[i].id);
                width += result.width;
            }
            let winWidth = uni.getSystemInfoSync().windowWidth,
                nowElement = await this.getElSize(this.tabBars[index].id),
                nowWidth = nowElement.width;
            if (width + nowWidth - tabBarScrollLeft > winWidth) {
                this.scrollLeft = width + nowWidth - winWidth;
            }
            if (width < tabBarScrollLeft) {
                this.scrollLeft = width;
            }
            this.isClickChange = false;
            this.tabIndex = index; //一旦访问data就会出问题
        },
        getElSize(id) { //得到元素的size
            return new Promise((res, rej) => {
                uni.createSelectorQuery().select("#" + id).fields({
                    size: true,
                    scrollOffset: true
                }, (data) => {
                    res(data);
                }).exec();
            })
        },
        async tapTab(e) { //点击tab-bar
            let tabIndex = e.target.dataset.current;
            if (this.newsitems[tabIndex].data.length === 0) {
                this.addData(tabIndex)
            }
            if (this.tabIndex === tabIndex) {
                return false;
            } else {
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                this.scrollLeft = tabBarScrollLeft;
                this.isClickChange = true;
                this.tabIndex = tabIndex;
            }
        },
        randomfn() {
            let ary = [];
            for (let i = 0, length = this.tabBars.length; i < length; i++) {
                let aryItem = {
                    loadingText: '加载更多...',
                    data: []
                };
                if (i < 1) {
                    for (let j = 1; j <= 10; j++) {
                        aryItem.data.push(tpl['data' + Math.floor(Math.random() * 5)]);
                    }
                }
                ary.push(aryItem);
            }
            return ary;
        }
    }
}
</script>

<style>
.uni-tab-bar-loading {
    text-align: center;
    font-size: 28upx;
    color: #999;
}

.swbg {
    background: linear-gradient(rgba(49, 147, 186, 1), rgba(117, 216, 250,1));
}
</style>
