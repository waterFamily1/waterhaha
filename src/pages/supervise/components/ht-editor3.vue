<template>
    <div id="ht-editor" style="width: 100%; height: 100%;">
        <i-frame src="index3d.html" />
    </div>
</template>
<style>
  /* @font-face {
      font-family: "UnidreamLED";
      src: url("../../../ht/editor/custom/font/UnidreamLED.ttf") format('truetype');
  } */
</style>

<script>
import { getSid } from '@/api/supervise/2d'
/**
 * 循环
 */
function loop(fn,vm) {
  return function loopBy(interval) {
    vm.timer = setTimeout(function task() {
      if (vm.timer ) {
        vm.timer  = clearTimeout(vm.timer );
      }
      fn(vm);
      vm.timer  = setTimeout(task, interval);
    },interval);
  };
}
// 获取HT服务的权限——sid
function getSid1(vm) {
    getSid().then(res=> {
        sessionStorage.setItem('htEditor.sid', res.data);
    })
//   vm.$http.get(api.getHTSid).then(sid => {
//       sessionStorage.setItem("htEditor.sid", sid);
//   });
}
function addScript(src) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    let head = document.getElementsByTagName("head");
    if (head.length) {
        head[0].appendChild(script);
    } else {
        document.documentElement.appendChild(script);
    }
    return script;
}
function initHt(id, vm) {
    var type=vm.type;
    var urls = hteditor_config.subConfigs || [];
    urls.push("client/libs/client.js");
    ht.Default.loadJS(urls, function() {
        urls = [
            "client/locales/" + hteditor.config.locale + ".js",
            "custom/locales/" + hteditor.config.locale + ".js"
        ];
        hteditor.config.host = htconfig.Default.host;
        hteditor.config.port = htconfig.Default.port;
        getSid().then(res=> {
            // 定义循环函数
            var loopHand = loop(getSid1,vm);
            // 10分钟执行一次
            loopHand(10*60*1000);
            sessionStorage.setItem("htEditor.sid", res.data);
            if (type === "2d") {
                // urls.push(hteditor.init);
                if ((!window.editor || !window.editor.unactived) && hteditor.config.libs) {
                    urls = urls.concat(hteditor.config.libs);
                }
            } else {
                urls.push("client/libs/client3d.js");
                if ((!window.editor3d || !window.editor3d.unactived) && hteditor.config.libs) {
                    urls = urls.concat(hteditor.config.libs);
                }
            }
            ht.Default.loadJS(urls, function() {
                hteditor_config.indent = 90;
                hteditor_config.leftSplitViewPosition = 240;
                hteditor_config.rightSplitViewPosition = 0.5;
                hteditor_config.mainSplitViewPosition = -260;
                hteditor_config.explorerSplitViewPosition = 0.5;
                hteditor.init();
                if (type === "2d") {
                    window.editor = createHt2D(id, sid);
                } else {
                    window.editor3d = createHt3D(id, sid);
                }
            });
        });
    });
    return;
}
function createHt2D(id, sid) {
    return Object.assign(
        hteditor.createEditor({
            container: id,
            onEditorCreated: function(editor) {
                window.editor.unactived = false;
            }
        }), { sid: sid }
    );
}
function createHt3D(id, sid) {
    return Object.assign(
        hteditor3d.createEditor3d({
            container: id,
            onEditor3dCreated:function(){
                window.editor3d.unactived = false;
            }
        }),
        { sid: sid }
    );
}
// import api from '@api/process-view';
export default {
    name: "ht-editor",
    timer:null,
    props: {
        type: {
            type: String,
            validator: value => ["2d", "3d"].indexOf(value) !== -1
        }
    },
    mounted() {
        const id = "ht-editor";
        const vm = this;
            var scripts = [
                "client/license/ywckSbRPEf7k.js",
                "custom/configs/htconfig.js",
                "client/libs/ht.js",
                "client/license/product_generated.js",
                "client/libs/ht-cssanimation.js",
                "client/libs/ht-contextmenu.js",
                "client/libs/ht-dialog.js",
                "client/libs/ht-edgetype.js",
                "client/libs/ht-form.js",
                "client/libs/ht-overview.js",
                "client/libs/ht-autolayout.js",
                "client/libs/ht-obj.js",
                "client/libs/ht-historymanager.js",
                "client/libs/ht-modeling.js",
                "client/libs/ht-vector.js",
                "client/libs/client.js",
                "client/libs/client3d.js",
                "client/socket.io/socket.io.js",
                "client/promise.js",
                "client/axios.js",
                "client/ramda.js"
            ];
            if (vm.type == "2d") {
                scripts.unshift("custom/configs/2d/config.js");
            } else {
                scripts.unshift("custom/configs/3d/config.js");
            }
            if (window.ht) {
                var configUrl = ["custom/configs/2d/config.js"];
                if (vm.type == "3d") {
                    configUrl = ["custom/configs/3d/config.js"];
                }
                ht.Default.loadJS(configUrl, function() {
                    initHt(id, vm);
                });
                return;
            }
            let i = 0;
            (function it(cb) {
                if (i === scripts.length) {
                    return initHt(id, vm);
                }
                addScript(scripts[i++]).onload = it
            })();
    },
    destroyed() {
        clearTimeout(this.timer)
        if (window.onbeforeunload) {
        window.removeEventListener("beforeunload", window.onbeforeunload, false);
        window.onbeforeunload = () => {};
        }
        if (this.type === "2d") {
        window.editor&&(window.editor.unactived = true);
        } else {
        window.editor3d&&(window.editor3d.unactived = true);
        }
    }
};
</script>