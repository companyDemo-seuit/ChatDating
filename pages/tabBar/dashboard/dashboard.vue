<template>
<view class="uni-tab-bar" id='dashboard'>
    <jsfun-record maxTime="15" minTime="2" @okClick="saveRecord">
        <view class="centerwz">录制语音</view>
    </jsfun-record>
</view>
</template>
<script>
import jsfunRecord from '@/components/jsfun-record/jsfun-record.vue'

import config from "@/config.js";

export default {
    components: {
        jsfunRecord
    },
    data() {
        return {}
    },
    methods: {
        saveRecord: function(recordPath) {
            console.log("===音频文件地址：" + recordPath + "===")
            let sessionId = uni.getStorageSync('sessionId') || ''
            uni.uploadFile({
                url: config.base_url + '/file/upload',
                filePath: recordPath,
                name: 'file',
                formData: {},
                header: {
                  "Authorization": "Bearer " + sessionId,
                },
                success: (uploadFileRes) => {
                    console.log(uploadFileRes.data);
                }
            });

            //do... 可以使用 uni.uploadFile 接口上传到服务器
        },

    }
}
</script>

<style>
.swbg {
    background: linear-gradient(rgba(49, 147, 186, 1), rgba(117, 216, 250, 1));
}
</style>
