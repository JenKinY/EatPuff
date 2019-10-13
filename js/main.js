
var app = new Vue({
    el: "#app",
    data: {



        message: "Hello~Welcome EAT-PUFF!",
        showGiftDialogVisible:false,     //模态框是否显示
        createGiftDialogVisible:false,
        addLoading: false,       //是否显示loading
        nowYear: null,
        nowMonth: null,
        nowGiftDay: null,
        isLock:false,     //是否锁定
        allTime:"10月**日",

        setStartVal: 0,
        setEndVal: 30,
        setDuration: 1000,
        setDecimals: 0,
        setSeparator: ',',
        setSuffix: '日',
        setPrefix: '月',

        fullscreenLoading: false

    },
    computed: {
        _startVal:function() {
            if (this.setStartVal) {
                return this.setStartVal
            } else {
                return 0
            }
        },
        _endVal:function() {
            if (this.setEndVal) {
                return this.setEndVal
            } else {
                return 0
            }
        },
        _duration:function() {
            if (this.setDuration) {
                return this.setDuration
            } else {
                return 100
            }
        },
        _decimals:function() {
            if (this.setDecimals) {
                if (this.setDecimals < 0 || this.setDecimals > 20) {
                    alert('digits argument must be between 0 and 20')
                    return 0
                }
                return this.setDecimals
            } else {
                return 0
            }
        },
        _separator:function() {
            return this.setSeparator
        },
        _suffix:function() {
            return this.setSuffix
        },
        _prefix:function() {
            let pre = this.nowMonth+this.setPrefix;
            return pre
        },
    },
    methods: {
        // 获取当前年
        initNowYear:function () {
            var date=new Date();
            return date.getFullYear();
        },
        // 获取当前月份
        initNowMonth:function () {
            var date=new Date();
            return date.getMonth()+1;
        },
        // 锁定礼物日(抽取礼物日后，当月礼物日会锁定！)
        lockGift:function(){
            this.isLock = true;
            this.nowGiftDay = "**"
        },
        // 获取当前月份的礼物日
        getNowGiftDay:function () {
            axios.get(
                "http://localhost:8080/api/giftDay/"+ (this.nowMonth), {

            }).then(response => {
                let getGiftDay = response.data;
                console.log("getGiftDay"+getGiftDay);
                if (getGiftDay == 0){
                    this.createGiftDialogVisible = true;
                }else {
                    this.nowGiftDay = getGiftDay;
                    this.showGiftDialogVisible = true;
                }
            }).catch(function (error) {
                alert("请求错误(" + error.response.status + "),请稍后再试！")
            });
        },
        createGiftDay:function () {
            axios.get("http://localhost:8080/api/giftDay/add/", {
                // 传递参数
                params: {
                    "month": this.nowMonth
                },
                // 设置请求头信息，可以传递空值
                headers: {
                    key: "value"
                }
            }).then(response => {
                // 请求成功
                let res = response.data;
                this.allTime = this.nowMonth + "月" + res + "日";
                console.log(this.allTime)
            }).catch(error => {
                // 请求失败，
                console.log(error);
            });
        },
        openFullScreen:function() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0)'
            });
            setTimeout(() => {
                loading.close();
            }, 2000);
        },
        callback:function() {
            console.log('callback')
        },
        start3:function() {
            this.$refs.example3.start();
        },
        pauseResume:function() {
            this.$refs.example3.pauseResume();
        }
    },
    created:function(){
        // 初始化
        this.nowMonth = this.initNowMonth();
        this.nowYear = this.initNowYear()
    },




});
