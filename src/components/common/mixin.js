import { getStyle } from '../../config/mUtils'



export const loadMore = {
    directives: {
        'load-more': {
            bind: (el, binding) => {
                //kk()
                //console.log(el)
                // document.addEventListener('scroll', function() {
                //     console.log(el)
                //     if (document.body.scrollTop + window.innerHeight >= el.clientHeight) {
                //         console.log(1)
                //     }
                // })
                var moveEnd = () => {
                    console.log(1)
                }
                document.addEventListener('scroll',moveEnd,false);
                
            },
            unbind(){
                var moveEnd = () => {
                    console.log(1)
                }
                //console.log(j)
　　　　　　　　//销毁前的清理工作
                if (window.removeEventListener) {
                    document.removeEventListener('scroll',moveEnd,false);
                } else {
                    document.detachEvent('onscroll',moveEnd,false);
                }
　　　　　　}
        }
    }
};


/**
 * 播放页事件
 */
export const payleEvent = {
    directives: {
        'payle-event': {
            bind: (el, binding) => {
                //抛出播放器初始化设置
                binding.value.playInit(el);

                //console.log(binding.expression.selectBtnStatus)
                let self  = this;
                this.event = function (event) {
                    //console.log(event.keyCode)
                    //播放器暂停/播放
                    if(event.keyCode==32){
                        binding.value.isPlay(el);
                        //console.log(el)
                    }
                };

                //设置抬起系列事件
                this.upstatusevent=function(event){
                    event = event || window.event;
                    binding.value.isMouseDownFn(event,el);
                };
                //设置窗口滑动事件函数
                this.winMover=function(event){
                    event = event || window.event;
                    binding.value.winMoverFn(event,el);
                };

                //点击空白事件
                this.clickbaidl=function(){
                    binding.value.setSelectBtnStatus();
                };

                //获取vidle宽度
                this.getWinWid=function(event){
                     binding.value.getWinWids(el.offsetWidth);
                };


                this.playStaus=false;
                document.addEventListener('keydown',this.event,false);


                //监听播放器点击事件
                el.addEventListener('click',() => {
                    binding.value.isPlay(el);
                },false);


                //监听播放器双击事件
                el.addEventListener('dblclick',() => {
                    binding.value.fullScreen(el);
                },false);


                


                //播放时获取播放时间
                el.addEventListener('timeupdate',() => {
                    if(this.playStaus){
                        binding.value.setItem(el);
                    }
                },false);


                //监听播放器缓冲进度
                el.addEventListener('progress',function(){
                    var range = 0;
                    var bf = this.buffered;
                    var time = this.currentTime;

                    /*if(self.playStaus){
                        while (!(bf.start(range) <= time && time <= bf.end(range))) {
                            range += 1;
                        }
                        var loadStartPercentage = bf.start(range) / this.duration;
                        var loadEndPercentage = bf.end(range) / this.duration;
                        var loadPercentage = loadEndPercentage - loadStartPercentage;
                        binding.value.setvideoLoadWidth(this,loadPercentage * 100);
                    }*/
                    try {
                        // 此处是可能产生例外的语句
                        if(self.playStaus){
                            while (!(bf.start(range) <= time && time <= bf.end(range))) {
                                range += 1;
                            }
                            var loadStartPercentage = bf.start(range) / this.duration;
                            var loadEndPercentage = bf.end(range) / this.duration;
                            var loadPercentage = loadEndPercentage - loadStartPercentage;
                            binding.value.setvideoLoadWidth(this,loadPercentage * 100);
                        }
                　　} catch (error) {
                        // 此处是负责例外处理的语句
                    } finally {
                        // 此处是出口语句
                    }
                },false);

                //监听播放器是否开始播放
                el.addEventListener('playing',() => {
                    this.playStaus=true;
                },false);

                //监听当媒介已停止播放但打算继续播放时
                el.addEventListener('waiting',() => {
                    //this.playStaus=false;
                },false);
                //监听当媒介已停止播放
                el.addEventListener('pause',() => {
                    
                },false);

                //监听窗口变化实时获取video宽度
                document.addEventListener('mousemove',this.getWinWid,false);

                //点击空白处操作
                document.addEventListener('click',this.clickbaidl,false);

                //窗口滑动事件
                document.addEventListener('mousemove',this.winMover,false);
            },
            update:(el, binding)=>{
                if(binding.value.isMouseDown){
                    document.addEventListener('mouseup',this.upstatusevent,false);
                }
            },

            unbind: (el, binding)=>{
                document.removeEventListener('keydown',this.event,false);

                document.removeEventListener('mousemove',this.getWinWid,false);

                //取消点击空白处操作
                document.removeEventListener('click',this.clickbaidl,false);

                //取消设置抬起系列事件
                document.removeEventListener('mouseup',this.upstatusevent,false);

                //取消窗口滑动事件
                document.removeEventListener('mousemove',this.winMover,false);
　　　　　　},
        }
    }
}

