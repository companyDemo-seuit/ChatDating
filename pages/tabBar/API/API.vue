<template>
	<view>
		<page-head title="swiper,可滑动视图"></page-head>
		 <button type="primary" @click.native="swiper_index = 0">上一页{{swiper_index}}<text class="iconfont">&#xe64a;</text></button>
		  <button type="primary" @click.native="swiper_index = 1">下一页</button>
		<view class="uni-margin-wrap">
			<swiper class="swiper" :current="swiper_index" v-model="swiper_index" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" @change="asd">
				<swiper-item>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="swiper-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">指示点</view>
				<switch :checked="indicatorDots" @change="changeIndicatorDots" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">自动播放</view>
				<switch :checked="autoplay" @change="changeAutoplay" />
			</view>
		</view>

		<view class="uni-padding-wrap">
			<view class="uni-common-mt">
				<text>幻灯片切换时长(ms)</text>
				<text class="info">{{duration}}</text>
			</view>
			<slider @change="durationChange" :value="duration" min="500" max="2000" />
			<view class="uni-common-mt">
				<text>自动播放间隔时长(ms)</text>
				<text class="info">{{interval}}</text>
			</view>
			<slider @change="intervalChange" :value="interval" min="2000" max="10000" />
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				swiper_index :0
			}
		},
		methods: {
			asd(){

			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style>
	.uni-margin-wrap {
		width:490upx;
		margin:0 auto;
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

	.uni-common-mt{
		margin-top:60upx;
		position:relative;
	}

	.info {
		position: absolute;
		right:20upx;
	}

</style>
