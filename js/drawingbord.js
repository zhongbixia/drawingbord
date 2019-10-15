// 单对象编程
// 避免全局变量的污染
var drawingBoard={     //drawingBoard是一个对象
    cavs:document.getElementById('cavs'),
    ctx:document.getElementById('cavs').getContext('2d'), //取得笔触
    colorchange:document.getElementById('colorchange'),
    lineRuler:document.getElementById('lineRuler'),
    bool:false,    //锁
    imgArr:[],     //存储像素数据数组
    init:function(){
        this.ctx.lineCap="round";  //线条起始的样式，设置线条开头喝结尾都是圆角
        this.ctx.lineJoin="round"; //转弯
        this.drawing()   //绘画函数
        this.btnsAllfn();
    },
    btnsAllfn:function(){   //点击事件
        var self=this;
        this.colorchange.onchange=function(){
            console.log(this.value);    //获得颜色值
            self.ctx.strokeStyle=this.value;   //将获取到的颜色值赋予给strokeStyle

        }
        this.lineRuler.onchange=function(){
            self.ctx.lineWidth=this.value;  //获取线条宽度

        }
        var btnsUINode=document.getElementsByTagName('ul')[0];   //获取标签名
        btnsUINode.onclick=function(e){
            console.log(e.target.id)    //打印当前id
            switch(e.target.id){
                case "cleanBoard":   //清屏
                self.ctx.clearRect(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight);   //消除画板所有内容
                break;
                case "eraser":   //橡皮
                self.ctx.strokeStyle="#fff";
                break;
                case "rescind":   //撤销
                if(self.imgArr.length>0){
                    self.ctx.putImageData(self.imgArr.pop(),0,0); //获取最后一个像素并删除
                }
               
                break;
            }
        }
    },
    drawing:function(){   //画画的对象
        var self=this;
        var cavs=this.cavs;
        var c_left=cavs.offsetLeft;
        var c_top=cavs.offsetTop;
        this.cavs.onmousedown=function(e){    //鼠标按下事件
            self.bool=true;
            self.ctx.beginPath();
            self.ctx.moveTo(e.pageX-c_left,e.pageY-c_top);   //e.pageX-c_left：页面减去画板的左边多余的部分，即获取父级的偏移量，落笔点在画板内
            var imgData=self.ctx.getImageData(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight);  //获取整个屏幕的像素
            self.imgArr.push(imgData);   //将像素数据放到数组里
            console.log(self.imgArr); 
            this.onmousemove=function(e){  ////鼠标滑动事件  开始移动
                if(self.bool){
                    self.ctx.lineTo(e.pageX-c_left,e.pageY-c_top);   //连线点
                    self.ctx.stroke();
                    
                }
               

            }
            this.onmouseup=function(e){   //鼠标抬起事件
                self.ctx.closePath();
                this.onmousemove=null;
                self.bool=false;
            }
            this.onmouseleave == function(){   //画笔超出画板
                self.ctx.closePath();
                this.onmousemove=null;
                self.bool=false;
            }

        }
        //鼠标滑动事件
        //鼠标抬起事件
    }
}
drawingBoard.init();