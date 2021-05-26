// pages/text4/text4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[{
      itemIndex:0,
      isDisplay:true,
      itemList:[]
    }],
    itemIndex:1,
    itemHeight:4520,//每一行的高度，单位为rpx
    itemPxHeight:'',//转化为px高度
    aboveShowIndex:0,//展示区域的上部的Index
    belowShowNum:0,//显示区域下方隐藏的条数
    oldSrollTop:0,
    prepareNum:5,
    throttleTime:200
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    let obj={
      qus:'下面哪位是刘发福女朋友?',
      answerA:'刘亦菲',
      answerB:'迪丽热巴',
      answerC:'斋藤飞鸟',
      answerD:'花泽香菜',
    }
     let list= Array(20).fill( obj )
     this.setData({
      [`listData[0].itemList`]:list,
     })

     let query = wx.createSelectorQuery();
     query.select('.content').boundingClientRect(rect=>{
       let clientWidth = rect.width;
       let ratio = 750 / clientWidth;
       this.setData({
         itemPxHeight:Math.floor(this.data.itemHeight/ratio),
       })
       console.log(this.data.itemPxHeight)
     }).exec();

     console.log(this.data.listData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  

  
  stopTimer(){
    clearInterval(this.data.timer) 
  },
   


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onPageScroll:throttle(function(e){
    // console.log(e)
    let scrollTop=e[0].scrollTop;
  
    // console.log('滚动条高度==='+scrollTop)
    let itemNum=Math.floor(scrollTop/this.data.itemPxHeight);
    // console.log('可视区的itemIndex==='+itemNum)

    let clearindex=itemNum-this.data.prepareNum+1;
    // if(clearindex>0&&clearindex==this.data.aboveShowIndex){
    //   return
    // }
    let oldSrollTop=this.data.oldSrollTop;//滚动前的scrotop,用于判断滚动的方向
    // console.log(clearindex)
    //向下滚动
    let aboveShowIndex=this.data.aboveShowIndex
    let listDataLen=this.data.listData.length;
    let changeData={}
    if(scrollTop-oldSrollTop>0){
        if(clearindex>0){
          for(let i=aboveShowIndex;i<clearindex;i++){   
                changeData[[`listData[${i}].isDisplay`]]=false;
                let belowShowIndex=i+2*this.data.prepareNum;
                if(i+2*this.data.prepareNum<listDataLen){
                  changeData[[`listData[${belowShowIndex}].isDisplay`]]=true;
                 }
          }   
        }    
    }else{//向上滚动
        if(clearindex>=0){
        //  let changeData={}
         for(let i=aboveShowIndex-1;i>=clearindex;i--){
           let belowShowIndex=i+2*this.data.prepareNum
           if(i+2*this.data.prepareNum<=listDataLen-1){
            changeData[[`listData[${belowShowIndex}].isDisplay`]]=false;
           }
           changeData[[`listData[${i}].isDisplay`]]=true;
         }  
        }else{
          if(aboveShowIndex>0){
            for(let i=0;i<aboveShowIndex;i++){
              this.setData({
                [`listData[${i}].isDisplay`]:true,
              })
            }
          }
        }      
    }
    clearindex=clearindex>0?clearindex:0
  
    if(clearindex>=0&&!(clearindex>0&&clearindex==this.data.aboveShowIndex)){
      changeData.aboveShowIndex=clearindex;
      let belowShowNum=this.data.listData.length-(2*this.data.prepareNum+clearindex)
      belowShowNum=belowShowNum>0?belowShowNum:0
      if(belowShowNum>=0){
        changeData.belowShowNum=belowShowNum
      }
      this.setData(changeData)
    }

    this.setData({
      oldSrollTop:scrollTop
    })


  }),
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     let list=this.data.listData[0].itemList
     let newArry={
      isDisplay:true,
      itemIndex:this.data.itemIndex,
      itemList:list
    }

    // console.log(newArry)

    this.setData({
      [`listData[${this.data.listData.length}]`]: newArry,
      itemIndex:this.data.itemIndex+1,
    })
  },

  getMore:function(e){

    // console.log('到底了')
    this.setData({
      listData:dataList
    })
  },
})

function throttle(fn){
  let valid = true
  // var context = this;
  
  return function() {
     if(!valid){
         //休息时间 暂不接客
         return false 
     }
     // 工作时间，执行函数并且在间隔期内把状态位设为无效
      valid = false
      setTimeout(() => {
          fn.call(this,arguments);
          valid = true;
      }, this.data.throttleTime)
  }
}