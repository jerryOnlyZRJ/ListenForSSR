<template>
    <div class="dashboard">
        <header class="mui-bar mui-bar-nav">
            <a id="menu" class="mui-action-menu mui-icon mui-icon-plus mui-pull-right" href="#topPopover"></a>
            <h1 class="mui-title">ListenFor</h1>
        </header>
        <div class="mui-content">
            <div class="mui-input-row mui-search">
                <input type="search" class="mui-input-clear" placeholder="您可以搜索已存在的文档~">
            </div>
            <ul class="word-list">
                <li class="word-item">
                    <div class="word-title">test</div>
                    <div class="modified-date">2018年9月8日15:13</div>
                    <div class="word-content">今天我们对现阶段商业的形式进行了简单的评估，就现阶段在线文档的发展形势而言</div>
                </li>
                <li class="word-item">
                    <div class="word-title">test</div>
                    <div class="modified-date">2018年9月8日15:13</div>
                    <div class="word-content">今天我们对现阶段商业的形式进行了简单的评估，就现阶段在线文档的发展形势而言</div>
                </li>
                <li class="word-item">
                    <div class="word-title">test</div>
                    <div class="modified-date">2018年9月8日15:13</div>
                    <div class="word-content">今天我们对现阶段商业的形式进行了简单的评估，就现阶段在线文档的发展形势而言</div>
                </li>
            </ul>
        </div>
        <div id="topPopover" class="mui-popover">
            <div class="mui-popover-arrow"></div>
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <a href="#">新建文档</a>
                        </li>
                        <li class="mui-table-view-cell">
                            <a href="#">退出登录</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import request from 'axios'

export default {
    name: 'DashBoard',
    data(){
        return {
            wordList: []
        }
    },
    mounted(){
        const username = localStorage.getItem('username')
        request.get(`/user/getwordlist?user=${username}`).then(res => {
            this.wordList = res.data
        })
    },
    methods: {
        getWordTextContent(content){

        },
        filterWordList(){

        },
        makeAnewWord(){

        },
        quitLogin(){
            
        }
    }
}
</script>
<style scoped>
#topPopover {
    position: fixed;
    top: 57px;
    right: 6px;
    width: 7rem;
    height: 6rem;
}

.mui-popover .mui-popover-arrow {
    left: 5rem;
}

.word-list {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    padding: 1rem;
}

.word-item {
    margin-top: 1rem;
    padding: 10px;
    background: #fff;
    box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.3);
    transition: background .3s;
}

.word-item:active {
    background: #AAAAAA;
}

.word-item:first-child {
    margin-top: 0;
}

.word-title {
    float: left;
    width: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.modified-date {
    float: right;
    width: 50%;
    font-size: .5rem;
    color: #aaa;
    text-align: right;
}

.word-content {
    display: block;
    width: 100%;
    margin-top: 2rem;
    color: #666;
    font-size: .8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>