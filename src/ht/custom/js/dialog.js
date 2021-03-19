var underControlZIndex=1000;
var underControlParams={

}
// 操作消息提示关闭按钮
var closeNotice=function(){
  var tipDom=document.getElementById("tipWrap")
  if(tipDom){
    document.body.removeChild(tipDom);
  }  
}
// 操作消息提示框
var noticeTip=function(text,type,reason){
  var iconHtml='';
  if(type=="success"){
    reason=reason?reason:'成功';
    iconHtml="<div class='ivu-notice-custom-content ivu-notice-with-icon ivu-notice-with-success ivu-notice-with-desc'>"+
                  "<span class='ivu-notice-icon ivu-notice-icon-success'>"+
                    "<i class='ivu-icon ivu-icon-checkmark-circled'></i>"+
                  "</span>"+
                  "<div class='ivu-notice-title'>"+text+"</div>"+
                  "<div class='ivu-notice-desc'>"+reason+"</div>"+
                "</div>";
  }else{
    reason=reason?reason:'失败';
    iconHtml="<div class='ivu-notice-custom-content ivu-notice-with-icon ivu-notice-with-error ivu-notice-with-desc'>"+
                    "<span class='ivu-notice-icon ivu-notice-icon-error'>"+
                      "<i class='ivu-icon ivu-icon-close-circled'></i>"+
                    "</span>"+
                    "<div class='ivu-notice-title'>"+text+"</div>"+
                    "<div class='ivu-notice-desc'>"+reason+"</div>"+
                  "</div>";
  }
  var html="<div class='ivu-notice' style='z-index:20000000;top: 24px; right: 0px;'>"+
            "<div class='ivu-notice-notice ivu-notice-notice-closable ivu-notice-notice-with-desc'>"+
              "<div class='ivu-notice-notice-content'>"+
              iconHtml+
              "</div>"+
              "<div class='ivu-notice-content-with-icon'></div>"+
              "<a class='ivu-notice-notice-close' onclick='closeNotice()'><i class='ivu-icon ivu-icon-ios-close-empty'></i></a>"+
            "</div>"+
          "</div>";
  var tipDom=document.getElementById("tipWrap")
  if(tipDom){
    document.body.removeChild(tipDom);
  }    
  var div=document.createElement("div")
  div.setAttribute("id","tipWrap");
  div.innerHTML=html
  var tipWrapDiv=document.getElementById("tipWrap");
  if(tipWrapDiv){
    document.body.removeChild(tipWrapDiv)
  }
  document.body.appendChild(div);
  // 3秒后，自动关闭
  setTimeout(function(){
    var tipDom=document.getElementById("tipWrap")
    if(tipDom){
      document.body.removeChild(tipDom);
    }    
  },3000)
}
var controlMessageTipConfirm=function(){
  var controlMessageTip=document.getElementById("controlMessageTip")
  if(controlMessageTip){
    document.body.removeChild(controlMessageTip);
  }   
}
// 下控操作提示框
var controlMessageTip=function(text,type,reason){
  var contentHtml="";
  if(type=="success"){
    reason=reason?reason:'成功';
    contentHtml=  "<div class='control-message-tip-wrap'>"+
                        "<span class='ivu-modal-confirm-head-icon'>"+
                          "<i class='ivu-icon ivu-icon-checkmark-circled'></i>"+
                        "</span>"+
                        "<p>"+text+"</p>"+
                      "</div>";
  }else{
    reason=reason?reason:'失败';
    contentHtml=  "<div class='control-message-tip-wrap'>"+
                        "<span class='ivu-modal-confirm-head-icon'>"+
                          "<i class='ivu-icon ivu-icon-close-circled'></i>"+
                        "</span>"+
                        "<p>"+text+"</p>"+
                        "<span class='reason'>"+reason+"</span>"+
                    "</div>";
  }
  var dialogHtml = "<div class='ivu-modal-mask' style='z-index: " + (underControlZIndex + 1) + ";'></div>" +
                    "<div class='ivu-modal-wrap' style='z-index: " + (underControlZIndex + 1) + ";'>" +
                      "<div class='ivu-modal' style='width: 416px;'>" +
                        "<div class='ivu-modal-content'>" +
                          "<div class='ivu-modal-header'>" +
                            "<div class='ivu-modal-header-inner'>提示</div>" +
                          "</div>" +
                          "<div class='ivu-modal-body'>" +
                            "<div class='ivu-modal-confirm'>" +
                              "<div class='ivu-modal-confirm-body'>" +
                                contentHtml +
                              "</div>" +
                              "<div class='ivu-modal-confirm-footer'>" +
                                "<button type='button' class='ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-large' onclick='controlMessageTipConfirm()'><span>确定</span></button>"
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>";
  var tipDom = document.getElementById("controlMessageTip")
  if (tipDom) {
    document.body.removeChild(tipDom);
  }
  var div = document.createElement("div")
  div.setAttribute("id", "controlMessageTip");
  div.innerHTML = dialogHtml
  var controlMessageTipDiv = document.getElementById("controlMessageTip");
  if (controlMessageTipDiv) {
    document.body.removeChild(controlMessageTipDiv)
  }
  document.body.appendChild(div);
}
// 模拟值输入框失焦事件
var dialogValueBlur=function(){
  // 小数点后无数字时，失焦时补0
  var input=document.getElementById("dialogValueInput");
  // var reg=/^\d+(\.\d*)?/;
  // var result=reg.exec(input.value);
  // if(result){
  //   if(result[1]=="."){
  //     input.value=result[0]+'0'
  //   }
  // }
  if(input.value){
    if(isNaN(parseFloat(input.value))){
      input.value="";
    }else{
      input.value=parseFloat(input.value);
    }
  }
}
// 模拟值输入框input事件
var dialogValueInput=function(){
  var input=document.getElementById("dialogValueInput");
  var maxValue=parseFloat(input.getAttribute("data-max"));
  var minValue=parseFloat(input.getAttribute("data-min"));
  if(input.value){
    var currentValue=input.value;
    var reg=/^[-]?(\d+(\.\d*)?)?/;
    var result=reg.exec(currentValue);
    if(result){
      currentValue=result[0];
    }else{
      currentValue="";
    }
    if(currentValue){
      input.value=currentValue;
      if(maxValue){
        if(currentValue>maxValue){
          input.setAttribute("class","ivu-input ivu-input-default input-err");
          document.getElementById("mockValueErrTip").innerText="当前设定值不能大于上限："+maxValue;
          return false;
        }
      }
      if(minValue){
        if(currentValue<minValue){
          input.setAttribute("class","ivu-input ivu-input-default input-err");
          document.getElementById("mockValueErrTip").innerText="当前设定值不能小于下限："+minValue;
          return false;
        }
      }
      document.getElementById("mockValueErrTip").innerText="";
      input.setAttribute("class","ivu-input ivu-input-default")
      return true;
    }else{
      input.value="";
      input.setAttribute("class","ivu-input ivu-input-default input-err")
      document.getElementById("mockValueErrTip").innerText="请输入数字";
      return false;
    } 
  }else{
    document.getElementById("mockValueErrTip").innerText="";
    input.setAttribute("class","ivu-input ivu-input-default input-err");
    return false;
  }
}
// 密码输入框input事件
var passwordInput=function(){
    var input=document.getElementById("passwordInput");
    var str=input.value;
    input.value=str.replace(/[^\x00-\xff]/g,'');
    if(input.value){
      input.setAttribute("class","ivu-input ivu-input-default")
    }else{
      input.setAttribute("class","ivu-input ivu-input-default input-err")
    }
}
// 下控弹框确认按钮
var confirm=function(){
  // 如果是模拟值，则先判断输入框是否为空
  var underControlString=document.getElementById("confirmBtn").getAttribute("data-underControlString");
  var underControl=JSON.parse(underControlString);
  if(underControl.type==0){
    var input=document.getElementById("dialogValueInput");
    if(dialogValueInput()){
      underControlParams.value=input.value;
    }else{
      return false;
    }
  }
  // 点击确认后，先进行输入密码校验
  passwordDiolog()
}
// 密码输入成功后提交
var submit=function(underControl){
  underControlParams.mpointId=underControl.pointId;
  var tipText="";
  if(underControl.type==0){
    tipText=underControl.pointName+"设定";
  }else{
    tipText=underControl.pointName+underControlParams.statusText;
  }
  if(underControlParams.value){
    document.body.removeChild(document.getElementById("dialogWrap"));
    document.body.removeChild(document.getElementById("passwordDiolog"));
    var undercontrolApi = envApi('/loong/api/mpoints/remote-control');
    var request = window.axios.post(undercontrolApi, {
      mpointId:underControlParams.mpointId,
      value:underControlParams.value
    }).then(function(res){
      controlMessageTip(tipText+'成功','success');
    }).catch(function(res){
      if(res.response){
        var title='失败原因：'+res.response.data.title;
        controlMessageTip(tipText+'失败','error',title);
      }else{
        noticeTip('网络异常','error');
      }
      
    })
  }else{

  } 
  
  return false
}
// 下控弹框取消按钮
var cancel=function(){
  document.body.removeChild(document.getElementById("dialogWrap"))
  return false
} 
// 下控弹框状态值选择事件
var selectStatusValue=function(that){
  // 切换选中状态
  var radioDom=document.getElementById("ivuRadioGroupStatusText").getElementsByClassName("ivu-radio");
  for(var x=0; x < radioDom.length; x++){
    radioDom[x].setAttribute("class","ivu-radio");
  }
  that.setAttribute("class","ivu-radio ivu-radio-checked");
  underControlParams.value=that.getAttribute("data-value");
  underControlParams.statusText=that.getAttribute("data-label");
}

// 下控弹框
var OpenDialog=function (data){
  // "underControl": {
  //   "type": 1,//0,模拟值;1,状态
  //   "pointId": "编号",
  //   "pointName": "测点名称",
  //   "pointUnit": "万",
  //   "status": "123",
  //   "statusText": "123",
  //   "openUnderControl": true
  // }
  underControlParams={};
  var underControl=data.a("underControl");
  var contentHtml='';
  if(underControl&&underControl.openUnderControl&&underControl.pointId){
    window.axios.get(envApi('/loong/api/mpoints/id'), {
      params:{
        mpointId:underControl.pointId
      }
    }).then(function(data){
      var res=data.data;
      if(res){
        if(res.enumvalue){
          var statusArr=[];
          var enumvalueArr=res.enumvalue.split(";");
          enumvalueArr.forEach(function(element){
            var eleArr=element.split(",")
            if(eleArr[1]&&eleArr[1]!=res.value){
              statusArr.push({
                value:eleArr[0],
                label:eleArr[1]
              })
            }
          });
        }
        res.upperRange=res.upperRange?res.upperRange:'';
        res.lowerRange=res.lowerRange?res.lowerRange:'';
        underControl.pointName= res.mpointName||'';
        underControl.pointUnit= res.unit||'';
        underControl.statusArr= statusArr||[];
      }else{
        return false
      }
      var placeholderText="请输入数字"
      
      if(res.lowerRange){
        placeholderText+=",下限为"+res.lowerRange;
      }
      if(res.upperRange){
        placeholderText+=",上限为"+res.upperRange;
      }
      // 表示已配置好可以开启下控操作
      var underControlString=JSON.stringify(underControl)
      if(underControl.type==0){
          // 模拟值
          contentHtml=  "<div class='mock-value-wrap'>"+
                          "<p id='dialogTipContent'>"+underControl.pointName+"设定</p>"+
                          "<div class='ivu-input-wrapper ivu-input-wrapper-default ivu-input-type' style='width:80%;margin: 20px 0 20px 48px;'>"+
                            "<input type='text' placeholder='"+placeholderText+"' autocomplete='off' class='ivu-input ivu-input-default' id='dialogValueInput' data-max='"+res.upperRange+"' data-min='"+res.lowerRange+"' oninput='dialogValueInput()' onblur='dialogValueBlur()' style='width:80%'>"+
                            "<span>&nbsp;&nbsp;"+underControl.pointUnit+"</span>"+
                            "<p class='mock-value-err-tip' id='mockValueErrTip'></p>"+
                          "</div>"+
                        "</div>";
      }else{
        var statusTip="";
        if(underControl.status&&underControl.statusText){
          // 第一种情况：手动设置了状态值
          statusTip= "<p id='dialogTipContent' style='padding-left:48px;padding-top:5px;'>确认"+underControl.statusText+underControl.pointName+"？</p>";
          underControlParams.value=underControl.status;
          underControlParams.statusText=underControl.statusText;
        }else{
          if(underControl.statusArr.length){
            // 如果没有手填状态值，则动态获取状态枚举值
            if(underControl.statusArr.length==1){
              // 第二种情况：除去该测点当前的状态值，剩余可选的状态值只有一个时，直接显示此状态的操作
              statusTip= "<p id='dialogTipContent' style='padding-left:48px;padding-top:5px;'>确认"+underControl.statusArr[0].label+underControl.pointName+"？</p>";
              underControlParams.value=underControl.statusArr[0].value;
              underControlParams.statusText=underControl.statusArr[0].label;
            }else{
              // 第三种情况：除去该测点当前的状态值，剩余可选的状态值不止有一个时，展示剩余的状态，可供单选
              var radioHtml=""
              underControl.statusArr.forEach(function(element,i){
                var className="ivu-radio";
                if(i==0){
                  underControlParams.value=element.value;
                  underControlParams.statusText=element.label;
                  className="ivu-radio ivu-radio-checked"
                }
                radioHtml+= "<label class='ivu-radio-wrapper ivu-radio-group-item' data-value='"+element.value+"' data-label='"+element.label+"' onclick='selectStatusValue(this)'>"+
                              "<span class='"+className+"'>"+
                                "<span class='ivu-radio-inner'></span>"+ 
                                "<input type='radio' class='ivu-radio-input' name='ivuRadioGroup_status_text'/>"+
                              "</span>"+element.label+
                            "</label>"
              });
              statusTip="<div id='dialogTipContent' style='padding-left:48px;padding-top:5px;'>"+
                          "<div class='c-form-item'>"+
                            "<div class='ivu-form-item'>"+
                              "<label class='ivu-form-item-label'>确认"+underControl.pointName+"的控制值</label>"+ 
                              "<div class='ivu-form-item-content'>"+
                                "<div name='ivuRadioGroup_status_text' class='ivu-radio-group' id='ivuRadioGroupStatusText'>"+
                                radioHtml+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                        "</div>"
            }
          }
        }
        if(statusTip){
          contentHtml=  "<div class='switch-value-wrap'>"+
                          "<span class='ivu-modal-confirm-head-icon'>"+
                            "<i class='ivu-icon ivu-icon-android-alert'></i>"+
                          "</span>"+
                          statusTip+
                        "</div>";
        }
      }
      if(contentHtml){
        var dialogHtml ="<div class='ivu-modal-mask' style='z-index: "+underControlZIndex+";'></div>"+
                          "<div class='ivu-modal-wrap' style='z-index: "+underControlZIndex+";'>"+
                            "<div class='ivu-modal' style='width: 416px;'>"+
                              "<div class='ivu-modal-content'>"+
                                "<div class='ivu-modal-header'>"+
                                  "<div class='ivu-modal-header-inner'>远程控制</div>"+
                                "</div>"+
                                "<div class='ivu-modal-body'>"+
                                  "<div class='ivu-modal-confirm'>"+
                                    "<div class='ivu-modal-confirm-body'>"+
                                      contentHtml+
                                    "</div>"+
                                    "<div class='ivu-modal-confirm-footer'>"+
                                      "<button type='button' class='ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-large' id='confirmBtn' data-underControlString='"+underControlString+"' onclick='confirm()'><span>确定</span></button>"+
                                      "<button type='button' class='ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-large' onclick='cancel()'><span>取消</span></button>"+
                                    "</div>"+
                                  "</div>"+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>";
      }
      var div=document.createElement("div")
      div.setAttribute("id","dialogWrap");
      div.innerHTML=dialogHtml;
      var dialogWrapDiv=document.getElementById("dialogWrap");
      if(dialogWrapDiv){
        document.body.removeChild(dialogWrapDiv)
      }
      document.body.appendChild(div);
    }).catch(function(res){
      return underControl;
    })
  }
}

var confirmByPassword=function(){
  // 密码确认框——确认按钮
  var params={
    password:''
  };
  var input=document.getElementById("passwordInput");
  if(input.value){
    params.password=input.value;
  }else{
    passwordInput();
    return false
  }
  if(params.password){
    document.getElementById("passwordConfirmLoading").style.display="inline-block";
    document.getElementById("passwordConfirmBtn").style.display="none";
    var passwordApi = envApi('/uaa/api/users/validate-password');
    var underControlString=document.getElementById("confirmBtn").getAttribute("data-underControlString");
    var underControl=JSON.parse(underControlString)
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    window.axios.get(passwordApi, {
      params:params
    },{
      // timeout: 5000,
      cancelToken: source.token
    }).then(function(res){
      // 如若密码输入正确，则发送下控指令
      if(res.data){
        submit(underControl)
      }else{
        document.getElementById("passwordConfirmLoading").style.display="none";
        document.getElementById("passwordConfirmBtn").style.display="inline-block";
        noticeTip('密码错误','error');
      }
    }).catch(function(res){
      noticeTip('网络异常','error');
      // source.cancel();
      document.getElementById("passwordConfirmLoading").style.display="none";
      document.getElementById("passwordConfirmBtn").style.display="inline-block";
    })
  } 
  return false
}
// 密码输入框取消按钮
var cancelByPassword=function(){
  document.body.removeChild(document.getElementById("passwordDiolog"))
  return false
}
// 密码输入框
var passwordDiolog=function(){
  var dialogHtml ="<div class='ivu-modal-mask' style='z-index: "+underControlZIndex+";'></div>"+
                        "<div class='ivu-modal-wrap' style='z-index: "+underControlZIndex+";'>"+
                          "<div class='ivu-modal' style='width: 416px;'>"+
                            "<div class='ivu-modal-content'>"+
                              "<div class='ivu-modal-header'>"+
                                "<div class='ivu-modal-header-inner'>输入密码</div>"+
                              "</div>"+
                              "<div class='ivu-modal-body'>"+
                                "<div class='ivu-modal-confirm'>"+
                                  "<div class='ivu-modal-confirm-body'>"+
                                    "<p>请输入密码</p>"+
                                    "<div class='ivu-input-wrapper ivu-input-wrapper-default ivu-input-type' style='width:80%;margin: 20px 0 20px 48px;'>"+
                                    "<input type='text' placeholder='' autocomplete='off' spellcheck='false' class='ivu-input ivu-input-default' id='passwordInput' oninput='passwordInput()' style='width:80%;font-family: PasswordEntry;'/>"+
                                    "</div>"+
                                  "</div>"+
                                  "<div class='ivu-modal-confirm-footer'>"+
                                    "<button id='passwordConfirmLoading' style='display:none' type='button' class='ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-large ivu-btn-loading'><i class='ivu-load-loop ivu-icon ivu-icon-load-c'></i><span>确定</span></button>"+
                                    "<button id='passwordConfirmBtn' type='button' class='ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-large' onclick='confirmByPassword()'><span>确定</span></button>"+
                                    "<button type='button' class='ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-large' onclick='cancelByPassword()'><span>取消</span></button>"+
                                  "</div>"+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                        "</div>";
                        
    var div=document.createElement("div")
    div.setAttribute("id","passwordDiolog");
    div.innerHTML=dialogHtml;
    var passwordDiologDiv=document.getElementById("passwordDiolog");
    if(passwordDiologDiv){
      document.body.removeChild(passwordDiologDiv)
    }
    document.body.appendChild(div);
}

// 测点曲线弹框
var closePointChartDialog=function(){
  var pointChartDialogDiv=document.getElementById("pointChartDialog");
  if(pointChartDialogDiv){
    document.body.removeChild(pointChartDialogDiv)
  }
}
var clientX = 0;
var clientY = 0;
var pointChartDialogLeft = 0;
var pointChartDialogtop = 0;
var isDown = false;
// 点击测点查看曲线，是复制测点管理——数据曲线分析页面，再简化进行使用，需注意：如若测点管理——数据曲线分析页面有修改，此处引用的页面是否页需要同步
function pointChartDialog(pointId){
  var dialogHtml="<div class='ivu-modal' style='width: 900px!important;top:0;'>"+
                  "<div class='ivu-modal-content'>"+
                    "<a class='ivu-modal-close' onclick='closePointChartDialog()'><i class='ivu-icon ivu-icon-ios-close-empty'></i></a>"+
                    "<div class='ivu-modal-header' id='pointChartDialogHeader'>"+
                      "<div class='ivu-modal-header-inner'>测点曲线</div>"+
                    "</div>"+
                    "<div class='ivu-modal-body' style='height:500px;border: 2px solid #f8f9fb;border-top: none;'>"+
                       "<iframe id='pointChartIframe' style='display:none' frameborder='0' scrolling='no' width='100%' height='100%' src='/data-analysis-dialog/"+pointId+"'></iframe>"+       
                    "</div>"+
                  "</div>"+
                "</div>";
  var div=document.createElement("div")
  div.setAttribute("id","pointChartDialog");
  div.innerHTML=dialogHtml;
  div.style.position="fixed"
  div.style.zIndex=999;
  div.style.top="20px";
  var initTop=document.documentElement.clientHeight*0.5;
  if(initTop<270){
    initTop=270
  }
  div.style.left=document.documentElement.clientWidth*0.5+'px';
  div.style.top=initTop+'px';
  div.style.transform= "translate(-50%,-50%)";
  var pointChartDialogDiv=document.getElementById("pointChartDialog");
  if(pointChartDialogDiv){
    document.getElementById("pointChartIframe").style.display="none";
    document.getElementById("pointChartIframe").src="/data-analysis-dialog/"+pointId;
  }else{  
    document.body.appendChild(div);
    pointChartDialogDiv = document.getElementById('pointChartDialog');
  }
  //获取元素
  var pointChartDialogHeader = document.getElementById('pointChartDialogHeader');
  
  clientX = 0;
  clientY = 0;
  pointChartDialogLeft = 0;
  pointChartDialogTop = 0;
  isDown = false;
  //鼠标按下事件
  pointChartDialogHeader.onmousedown = function(e) {
      //获取x坐标和y坐标
      clientX = e.clientX;
      clientY = e.clientY;

      //获取左部和顶部的偏移量
      pointChartDialogLeft = pointChartDialogDiv.style.left;
      pointChartDialogTop = pointChartDialogDiv.style.top;
      //开关打开
      isDown = true;
      //设置样式  
      pointChartDialogHeader.style.cursor = 'move';
  }
  //鼠标移动
  window.onmousemove = function(e) {
      if (isDown == false) {
          return;
      }
      //获取x和y
      var newClientX = e.clientX;
      var newClientY = e.clientY;
      //计算移动后的左偏移量和顶部的偏移量
      var newPointChartDialogLeft = parseFloat(pointChartDialogLeft?pointChartDialogLeft:0) + (newClientX - clientX);
      var newPointChartDialogTop = parseFloat(pointChartDialogTop?pointChartDialogTop:0) + (newClientY - clientY);
      pointChartDialogDiv.style.left = newPointChartDialogLeft + 'px';
      pointChartDialogDiv.style.top = newPointChartDialogTop + 'px';
  }
  //鼠标抬起事件
  pointChartDialogHeader.onmouseup = function() {
      //开关关闭
      isDown = false;
      pointChartDialogHeader.style.cursor = 'default';
  }
}
function receiveAlarmFunc(){
  var hasAlarmSound = dataModel._attrObject.hasAlarmSound
  // 报警信息
  var subscriptionAlarm = null;

    subscriptionAlarm = stompClient.subscribe('/user/queue/message/unread-alarm', function (response) {
      var data = JSON.parse(response.body);
      try {
        var audio = null;
        if (hasAlarmSound) {
          audio = document.getElementById("alarmAudio")
          if (audio) {
            audio.currentTime = 0;
            audio.play()
          } else {
            audio = document.createElement("audio")
            audio.setAttribute("controls", "controls")
            audio.setAttribute("autoplay", "autoplay")
            audio.setAttribute("loop", "loop")
            audio.setAttribute("id", "alarmAudio")
            var source = document.createElement("source")
            source.setAttribute("src", "custom/alarm.mp3")
            source.setAttribute("type", "audio/mpeg")
            audio.appendChild(source)
            audio.style.visibility = "hidden";
            document.body.appendChild(audio)
          }
        }
        alarmInfoDialog(data, audio)
      } catch (e) {
        console.log(e)
      }
    })
}

var confirmAlarmDialogIndex = null;
var alarmDetailDialogIndex = null
function alarmInfoDialog(data, audio) {
  var tplHtml = '<div class="ivu-notice-notice" style="margin-bottom:0;background:rgba(255,255,255,0.9)">'+
                  '<div class="ivu-notice-notice-content">'+
                    '<div class= "ivu-notice-custom-content ivu-notice-with-icon ivu-notice-with-warning ivu-notice-with-desc">'+
                      '<span class="ivu-notice-icon ivu-notice-icon-warning">'+
                          '<i class="alarm-level">' + (data.importantLevel||"")+'级</i>'+
                      '</span>'+
                      '<div class="ivu-notice-title">' + data.title+'</div>'+
                      '<div class="ivu-notice-desc">' + data.content+'</div>'+
                    '</div>'+
                  '<div class="ivu-notice-content-with-icon"></div><a class="ivu-notice-notice-close"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a></div>'+
                '</div>';
  if (document.getElementById("layerAlarmMsg")){
    document.getElementById("layerAlarmMsg").innerHTML = tplHtml
  }else{
    layui.use('layer', function () {
      var $ = layui.jquery, layer = layui.layer;
      layer.open({
        type: 1,
        title: false,
        offset: "rt",
        id: 'layerAlarmMsg',
        skin: "alarm-msg-dialog",
        content: tplHtml,
        btnAlign: 'c', //按钮居中
        shade: 0, //不显示遮罩
        fixed: true,
        resize: false,
        closeBtn: 0,
        isOutAnim :false,
        success: function (layero) {
          layero.find('#layerAlarmMsg').on('click', '.ivu-icon-ios-close-empty',function (e) {
            e.stopPropagation();
            layer.closeAll();
            // 关闭音频
            if (audio) {
              audio.pause()
            }
            // 全部已读
            // allReaded()
          });
          layero.find('#layerAlarmMsg').on('click','.ivu-notice-notice', function () {
            layer.closeAll();
            // 关闭音频
            if (audio) {
              audio.pause()
            }
            // 弹出报警历史列表
            alarmHistoryListDialog($, layer);
            // 全部已读
            // allReaded()
          });
        }
      });
    })
  }
}
// function allReaded(){
//   // 点击全部已读
//   window.axios.put(envApi("/message/api/messages/read-all"), { category: 2}).then(function (res) {
//     noticeTip('成功', 'success','操作成功');
//   }).catch(function (err) {
//     messageTip(err)
//   });
// }
function alarmHistoryListDialog($, layer){
  var config = {
    elem: '#alarmHistoryTable',
    width: 1000,
    height: 442,
    skin: 'nob',
    even: true,
    size: 'lg',
    url: envApi("/loong/api/alarm-records"),
    request: {
      pageName: 'currentPage', //页码的参数名称，默认：page
      limitName: 'pageSize'    //每页数据量的参数名，默认：limit
    },
    limit:7,
    title: '报警列表',
    cols: [[{
      field: 'siteName',
      title: '区域位置',
      templet: function (d) {
        return '<div class="ell" title="'+ (d.siteName || "") +'">' + (d.siteName || "") + '</div>'
      }
    }, {
      field: 'alarmName',
      title: '报警名称',
      templet: function (d) {
        return '<div class="ell" title="' + (d.alarmName || "") +'">' + (d.alarmName || "") + '</div>'
      }
    }, {
      field: 'alarmLevel',
      title: '等级',
      width: 60,
      templet: function (d) {
        return '<span class="alarm-lev-' + d.alarmLevel + '">' + d.alarmLevel + '级</span>'
      }
    },  {
      field: 'alarmStatus',
      title: '确认状态',
      width: 90,
      templet: function (d) {
        var classname = 'alarm-status-' + d.alarmStatus.toLowerCase();
        var statesText = {
          Unremove: '未解除',
          Remove: '已解除'
        };
        return '<span class="' + classname + '">' + statesText[d.alarmStatus] + '</span>'
      }
    }, {
      field: 'alarmTriggerTime',
      title: '发生时间',
      width: 100,
      templet: function (d) {
        var dateTimeString = d.alarmTriggerTime
        if (typeof dateTimeString == "string" && /[TZ]/.test(dateTimeString) == false) {
          dateTimeString = dateTimeString.replace(/-/g, '/');
        }
        return '<div style="font-size: 12px;line-height: 1.5;"><div>' + util.F(dateTimeString, 'hh:mm:ss') + '</div><div>' + util.F(dateTimeString, 'yyyy-MM-dd') + '</div>' + '</div>';
      }
    }
      , {
      field: 'alarmReleaseTime',
      title: '确认时间',
      width: 100,
      templet: function (d) {
        var dateTimeString = d.alarmReleaseTime
        if (typeof dateTimeString == "string" && /[TZ]/.test(dateTimeString) == false) {
          dateTimeString = dateTimeString.replace(/-/g, '/');
        }
        return '<div style="font-size: 12px;line-height: 1.5;padding:"><div>' + util.F(dateTimeString, 'hh:mm:ss') + '</div><div>' + util.F(dateTimeString, 'yyyy-MM-dd') + '</div>' + '</div>';
      }
    }, {
      field: 'duration',
      title: '持续时间',
      width: 100,
      templet: function (d) {
        return '<div class="ell">' + (d.duration || "") + '</div>'
      }
    }, {
      field: 'releaseUserName',
      title: '确认人',
      width: 80,
      templet: function (d) {
        return '<div class="ell" title="' + (d.releaseUserName || "") +'">' + (d.releaseUserName || "") + '</div>'
      }
    }, {
      field: 'action',
      title: '操作',
      width: 110,
      skin: 'alarm-action-btn',
      templet: function (d) {
        var btnHtml = '<a href="javascript:;" style="color: rgb(75, 126, 254); margin: 0px 10px 0px 0px;" data-type="detail" data-id="' + d.id + '">查看</a>'
        if (d.disarmMethod != 'Auto' && d.alarmStatus != 'Remove') {
          btnHtml += '<a href="javascript:;" style="color: rgb(75, 126, 254); margin: 0px 10px 0px 0px;" data-type="confirm" data-id="' + d.id + '">确认</a>'
        }
        return btnHtml
      }
    }
    ]],
    page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
      layout: ['count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
      , first: false //不显示首页
      , last: false //不显示尾页
      , theme:"#4b7efe"
    },
    response: {
      statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
    },
    parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
      return {
        "code": 200,
        "count": res.total, //解析数据长度
        "data": res.items //解析数据列表
      };
    }
  }
  if (document.getElementById("layerAlarmHistory")) {
    var table = layui.table;
    table.render(config);
  } else {
    // 报警历史列表
    layer.open({
      type: 1,
      title: false,
      area: ['1000px', '446px'],
      skin: "alarm-history-list-dialog",
      offset: "auto",
      id: 'layerAlarmHistory',
      content: '<table class="layui-hide" id="alarmHistoryTable" lay-filter="alarmHistoryTable"></table>',
      btnAlign: 'c', //按钮居中
      shade: 0, //不显示遮罩
      resize: false,
      closeBtn: 1,
      anim: -1 ,
      isOutAnim: false,
      cancel:function(){
        layer.close(confirmAlarmDialogIndex)
        layer.close(alarmDetailDialogIndex)
      },
      success: function (layero) {
        layui.use(['table', 'laytpl', 'form'], function () {
          var table = layui.table;
          //监听表格复选框选择
          table.render(config);
          $('#layerAlarmHistory').on('click', "td a", function () {
            var type = $(this).attr('data-type');
            var id = $(this).attr('data-id');
            if (type == "detail") {
              // 查看详情
              layer.close(confirmAlarmDialogIndex)
              alarmHistoryDetail($, layer, id)
              
            }
            if (type == "confirm") {
              //确认解除报警
              layer.close(alarmDetailDialogIndex)
              if (!document.getElementById("confirmAlarmDialog")){
                confirmAlarmDialog($, layer, id)
              }
            }
          });
        });
      }
    })
  }
}
function alarmHistoryDetail($, layer,id){
  if (document.getElementById("layerAlarmdetail")) {
    getAlarmDetail(id)
  } else {
    alarmDetailDialogIndex=layer.open({
      type: 1,
      title: "历史报警详情",
      area: ['520px', '470px'],
      skin: "alarm-history-detail-dialog",
      offset: "auto",
      id: 'layerAlarmdetail',
      content: '<div id="alarmDetailWrap"></div>',
      btnAlign: 'c', //按钮居中
      shade: 0, //不显示遮罩
      resize: false,
      isOutAnim: false,
      // closeBtn: 0,
      success: function (layero) {
        getAlarmDetail(id);
      }
    })
  }
  
}
function getAlarmDetail(id){
    window.axios.get(envApi("/loong/api/alarm-records/detail/"+id)).then(function (res) {
        var result = res.data || {};
        if (!result.items){
          result.items=[]
        }
        var laytpl=layui.laytpl
        laytpl('<div class="alarm-history-detail">'+
                  '<h3> 报警值信息</h3>' +
                  '{{#  layui.each(d.items, function (index, item) { }}'+
                  '<div class="alarm-history-point">' +
                    '<div class="layui-row">' +
                      '<div class="layui-col-md6">' +
                        '<label>测点名称：</label>{{ item.mpointName }}' +
                      '</div>' +
                      '<div class="layui-col-md6">' +
                        '<label>条件：</label>{{ item.symbol||"" }}' +
                      '</div>' +
                    '</div>' +
                    '<div class="layui-row">' +
                      '<div class="layui-col-md6">' +
                        '<label>阈值：</label>{{ item.threshold||"" }}' +
                      '</div>' +
                      '<div class="layui-col-md6">' +
                        '{{# if(isNaN(item.alarmValue * 1) || item.alarmValue === null) {item.alarmValue = "";} else {item.alarmValue = Math.round(item.alarmValue * 100) / 100;}}}'+
                        '<label>报警值：</label>{{ item.alarmValue }}' +
                      '</div>' +
                    '</div>' +
                    '<div class="layui-row">' +
                      '<div class="layui-col-md6">' +
                        '<label>单位：</label>{{ item.unit||"" }}' +
                      '</div>' +
                      '<div class="layui-col-md6">' +
                        '<label>所属设备：</label>{{ item.equipment||"" }}' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                 '{{# }); }}'+
                  '<h3 style="margin-top: 10px;">处理预案</h3>' +
                  '<div class="layui-row">' +
                    '<div style="margin-bottom: 10px;max-height: 50px;overflow:auto;">{{ d.record.processingPlan || "无" }}</div>' +
                  '</div>' +
                  '<h3>备注</h3>' +
                  '<div class="layui-row">' +
                    '<div style="margin-bottom: 10px;max-height: 50px;overflow:auto;">{{ d.record.remarks || "无" }}</div>' +
                  '</div>' +
                  '<h3>联系方式</h3>' +
                  '<div class="layui-row">' +
                    '<div class="layui-col-md6">' +
                      '<label>联系人：</label>{{ d.record.contactPersonName||"" }}' +
                    '</div>' +
                    '<div class="layui-col-md6">' +
                      '<label>联系方式：</label>{{ d.record.contactPhone||"" }}' +
                    '</div>' +
                  '</div>' +
            '</div >').render(result, function (html) {
            document.getElementById("alarmDetailWrap").innerHTML = html;
        })
    
      }).catch(function (err) {
        messageTip(err)
      });
}

function confirmAlarmDialog($, layer,id){
  var form = layui.form
  confirmAlarmDialogIndex = layer.open({
    type: 1,
    title: "确认报警",
    area: ['500px', '300px'],
    skin: "confirm-alarm-dialog",
    offset: "auto",
    id: 'confirmAlarmDialog',
    content: '<div class="confirm-alarm-wrap">'+
              '<form class="layui-form" action="" lay-filter="confirmAlarm">' +
                '<div class="layui-form-item">' +
                  '<label class="layui-form-label">类型：</label>' +
                  '<div class="layui-input-block">' +
                  '<input type="radio" name="alarmReleaseType" value="2" title="误报" checked="">' +
                  '<input type="radio" name="alarmReleaseType" value="3" title="测试">' +
                  '<input type="radio" name="alarmReleaseType" value="1" title="确认报警">' +
                  '</div>' +
                '</div>' +
                '<div class="layui-form-item layui-form-text">' +
                  '<label class="layui-form-label">备注：</label>' +
                  '<div class="layui-input-block">' +
                    '<textarea placeholder="" class="layui-textarea" name="remarks"></textarea>' +
                  '</div>' +
                '</div>'+
              '</form></div>',
    btnAlign: 'c', //按钮居中
    shade: 0, //不显示遮罩
    resize: false,
    isOutAnim: false,
    btn:["确认","取消"],
    // closeBtn: 0,
    success: function (layero) {
      var form = layui.form
      form.render();
    }, 
    yes:function (index, layero) {
        //do something
      layer.close(index); //如果设定了yes回调，需进行手工关闭
      var data=form.val("confirmAlarm");
      data.ids = [id]
      window.axios.put(envApi("/loong/api/alarm-records/confirm"),data).then(function (res) {
        noticeTip('报警已确认', 'success');
        alarmHistoryListDialog($, layer)
      }).catch(function (err) {
        messageTip(err);
      });
    }
  })
}