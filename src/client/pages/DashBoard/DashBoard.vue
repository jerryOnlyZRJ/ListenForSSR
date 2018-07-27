<template>
    <div class="dashboard">
        <header class="mui-bar mui-bar-nav">
            <a id="menu" class="mui-action-menu mui-icon mui-icon-plus mui-pull-right" href="#topPopover"></a>
            <h1 class="mui-title">ListenFor</h1>
        </header>
        <div class="mui-content">
            <div class="mui-input-row mui-search">
                <input type="search" class="mui-input-clear" @input="filterWordList" placeholder="您可以搜索已存在的文档~">
            </div>
            <div v-if="withoutWordItem" class="empty-info"><span>文档列表空空如也,</span><span>快点击右上角添加文档吧~</span></div>
            <ul v-else class="word-list">
                <li v-for="(item, index) in filterList" :key="index" :data-index="index" class="word-item">
                    <div class="word-title">{{item.title}}</div>
                    <div class="modified-date">{{ arrageDate(item.date) }}</div>
                    <div class="word-content">{{ getWordTextContent(item.content) }}</div>
                    <div class="delete-thisword-container" @touchend="deleteThisWord(index, $event)"></div>
                </li>
            </ul>
        </div>
        <div id="topPopover" class="mui-popover">
            <div class="mui-popover-arrow"></div>
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click="makeAnewWord">
                            <a href="#">新建文档</a>
                        </li>
                        <li class="mui-table-view-cell" @click="quitLogin">
                            <a href="#">退出登录</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config'
import request from 'axios'

export default {
    name: 'DashBoard',
    data() {
        return {
            orginList: [],
            filterList: [],
        }
    },
    mounted() {
        const username = localStorage.getItem('username')
        request.get(`/user/getwordlist?user=${username}`).then(res => {
            this.orginList = res.data
            this.filterList = res.data
        })
    },
    updated: function() {
        const wordList = document.querySelector('.word-list')
        if (!wordList) return
        let timer = null

        function eventDelegate(node) {
            if (node.tagName === "LI") {
                return node
            } else if (node.tagName === "UL") {
                return ''
            } else {
                return eventDelegate(node.parentNode)
            }
        }

        function clearTouchItem() {
            const touchItem = document.querySelector('.touch')
            touchItem && touchItem.classList.remove('touch')
        }

        wordList.addEventListener('touchstart', function(e) {
            e.preventDefault()
            const target = eventDelegate(e.target)
            target.classList.add('touch')
            if (target) {
                timer = setTimeout(() => {
                    clearTimeout(timer)
                    timer = null
                }, 1000);
            } else {
                clearTouchItem()
            }
        }, false);
        wordList.addEventListener('touchend', (e) => {
            const target = eventDelegate(e.target)
            if (timer) {
                clearTouchItem()
                const itemIndex = target.dataset.index
                localStorage.setItem('title', this.filterList[itemIndex].title)
                localStorage.setItem('content', this.filterList[itemIndex].content)
                location.href = config.domain + 'editor'
            } else {
                e.preventDefault()
            }
            clearTimeout(timer);
            timer = null
        }, false)
    },
    computed: {
        withoutWordItem() {
            return !this.orginList.toString()
        }
    },
    methods: {
        arrageDate(dateStr) {
            const date = new Date(dateStr)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            let min = date.getMinutes()
            min = min < 10 ? '0' + min : min
            return `${year}年${month}月${day}日${hour}:${min}`
        },
        getWordTextContent(content) {
            const contentObj = JSON.parse(content)
            if (contentObj.ops) {
                return contentObj.ops.map(item => {
                    return item.insert.replace(/\n/g, '')
                }).join('')
            } else {
                return ''
            }
        },
        filterWordList(e) {
            const keyword = e.target.value
            this.filterList = this.orginList.filter(item => {
                return item.title.indexOf(keyword) >= 0 ? true : false
            })
        },
        makeAnewWord(event) {
            const btnArray = ['确定', '取消']
            const orginList2Set = new Set(this.orginList.map(item => item.title))
            mui.prompt('您可以为您的新文档起个名字：', '工作日志', '创建文档', btnArray, function(e) {
                if (!e.index) {
                    if (orginList2Set.has(e.value)) {
                        mui.alert('文档已存在', '创建失败')
                    } else {
                        mui.toast('创建成功')
                        setTimeout(() => {
                            localStorage.setItem('title', e.value)
                            localStorage.removeItem('content')
                            location.href = `${config.domain}editor`
                        }, 500)
                    }
                }
            })
        },
        deleteThisWord(index, e) {
            e.preventDefault()
            e.stopPropagation()
            request.post('/user/deleteword', {
                user: localStorage.getItem('username'),
                title: localStorage.getItem('title')
            }).then(res => {
                if (res.data.ok) {
                    this.filterList.splice(index, 1)
                    this.orginList.splice(index, 1)
                }
            }).catch(err => console.log(err))
        },
        quitLogin() {
            //TODOS：增加后台cookie控制登录态
            location.href = config.domain
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

.empty-info {
    display: flex;
    flex-direction: column;
    color: #929292;
    align-items: center;
}

.word-list {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    padding: 1rem;
}

.word-item {
    position: relative;
    margin-top: 1rem;
    padding: 10px;
    background: #fff;
    box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.3);
    transition: background .3s;
}

.word-item.touch {
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
    transition: opacity .6s;
}

.touch .modified-date {
    opacity: 0;
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

.delete-thisword-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    width: 73px;
    background: rgba(0, 0, 0, .3);
    font-size: 2rem;
    color: red;
}

.touch .delete-thisword-container {
    display: flex;
}

.delete-thisword-container::before {
    content: '❌'
}
</style>