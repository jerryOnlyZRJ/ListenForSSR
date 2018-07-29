<template>
    <div class="editor">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">{{ title }}</h1>
            <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#topPopover"></a>
        </header>
        <div id="topPopover" class="mui-popover">
            <div class="mui-popover-arrow"></div>
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click="uploadUserWord">
                            <a href="#">云存储</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mui-content">
            <div id="quill-container"></div>
        </div>
        <div class="speech-btn mui-icon mui-icon-mic" data-state="stop" @click="speechHandler"></div>
        <RemoteJs src="https://cdn.bootcss.com/quill/1.3.6/quill.min.js"></RemoteJs>
    </div>
</template>
<script>
import config from '@/config'
import request from 'axios'

export default {
    name: 'Editor',
    components: {
        'RemoteJs': {
            render(createElement) {
                return createElement('script', {
                    attrs: {
                        type: 'text/javascript',
                        src: this.src
                    }
                })
            },
            props: {
                src: {
                    type: String,
                    required: true
                }
            }
        }
    },
    data: () => {
        return {
            title: ''
        }
    },
    mounted() {
        //editor配置
        //初始化字体
        const fonts = [false, 'SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman'];
        const Font = Quill.import('formats/font');
        Font.whitelist = fonts;
        Quill.register(Font, true);
        //初始化字号
        const sizes = [false, "3.5rem", "3rem", "2.125rem", "2rem", "1.8125rem", "1.5rem", "1.3125rem", "1.25rem", "1.125rem", "1rem", "0.875rem", "0.75rem", "0.625rem", "0.5rem", "0.4375rem", "0.375rem"]
        const Size = Quill.import('attributors/style/size');
        Size.whitelist = sizes;
        Quill.register(Size, true);
        const toolbarOptions = [
            [{
                'font': fonts
            }, {
                'size': sizes
            }],
            ['bold', 'italic', 'underline', {
                'color': []
            }, {
                'background': []
            }],
            [{
                'list': 'ordered'
            }, {
                'list': 'bullet'
            }, {
                'direction': 'rtl'
            }, {
                'align': []
            }]
        ]
        const quill = new Quill('#quill-container', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
        window.quill = quill
        //初始化文档
        this.title = localStorage.getItem('title')
        const content = localStorage.getItem('content')
        if (content) {
            quill.setContents(JSON.parse(content))
        }
        window.onbeforeunload = () => {
            if (localStorage.getItem('content')) {
                this.uploadUserWord()
            }
        }
    },
    methods: {
        speechHandler(e) {
            if (e.target.dataset.state === 'stop') {
                this.startRecognize()
                e.target.dataset.state = 'speeching'
            } else {
                this.stopRecognize()
                e.target.dataset.state = 'stop'
            }
        },
        startRecognize() {
            const options = {
                engine: 'iFly',
                lang: 'zh-cn',
                continue: true
            };
            plus.speech.startRecognize(options, function(res) {
                quill.insertText(quill.getLength(), res, quill.getFormat())
            }, function(e) {
                console.log(e)
            });
        },
        stopRecognize() {
            plus.speech.stopRecognize();
        },
        uploadUserWord() {
            const user = localStorage.getItem('username')
            const title = this.title
            const content = JSON.stringify(quill.getContents())
            if (!user) {
                localStorage.setItem('hasEditorWithoutAccount', 1)
                localStorage.setItem('content', content)
                mui.alert('未检测到账号，请重新登录', '上传失败', function() {
                    location.href = config.domain
                })
            } else {
                localStorage.removeItem('hasEditorWithoutAccount')
                const date = (new Date()).toString()
                request.post('/user/updatewords', { user, title, date, content }).then(res => {
                    mui.toast('上传成功')
                    localStorage.removeItem('content')
                    location.href = config.domain + 'dashboard'
                }).catch(err => console.log(err))
            }
        }
    }
}
</script>
<style>
.speech-btn {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 2rem;
    bottom: 3rem;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    font-size: 2rem;
    font-weight: bolder;
    background: #fff;
    color: #188eee;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
    transition: background .3s;
}

.speech-btn:active {
    background: #AAAAAA;
}

.ql-snow .ql-formats {
    zoom: 1.2;
}

.ql-picker-label.ql-active {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ql-picker-options {
    height: 173px;
    overflow-y: scroll;
}

#topPopover {
    position: fixed;
    top: 57px;
    right: 6px;
    width: 6rem;
    height: 54px;
}

.mui-popover .mui-popover-arrow {
    left: 64px;
}




/*font styles*/


/*字体*/

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
    content: "宋体";
    font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
    content: "黑体";
    font-family: "SimHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
    content: "楷体";
    font-family: "KaiTi";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
    content: "仿宋";
    font-family: "FangSong";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
    content: "Arial";
    font-family: "Arial";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
    content: "Times New Roman";
    font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
    content: "sans-serif";
    font-family: "sans-serif";
}

.ql-font-SimSun {
    font-family: "SimSun";
}

.ql-font-SimHei {
    font-family: "SimHei";
}

.ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
}

.ql-font-KaiTi {
    font-family: "KaiTi";
}

.ql-font-FangSong {
    font-family: "FangSong";
}

.ql-font-Arial {
    font-family: "Arial";
}

.ql-font-Times-New-Roman {
    font-family: "Times New Roman";
}

.ql-font-sans-serif {
    font-family: "sans-serif";
}















/*字号*/

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="3.5rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="3.5rem"]::before {
    content: '初号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="3rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="3rem"]::before {
    content: '小初';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="2.125rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="2.125rem"]::before {
    content: '一号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="2rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="2rem"]::before {
    content: '小一';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.8125rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.8125rem"]::before {
    content: '二号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.5rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.5rem"]::before {
    content: '小二';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.3125rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.3125rem"]::before {
    content: '三号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.25rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.25rem"]::before {
    content: '小三';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.125rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.125rem"]::before {
    content: '四号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1rem"]::before {
    content: '小四';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.875rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.875rem"]::before {
    content: '五号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.75rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.75rem"]::before {
    content: '小五';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.625rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.625rem"]::before {
    content: '六号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.5rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.5rem"]::before {
    content: '小六';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.4375rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.4375rem"]::before {
    content: '七号';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.375rem"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.375rem"]::before {
    content: '八号';
}
</style>