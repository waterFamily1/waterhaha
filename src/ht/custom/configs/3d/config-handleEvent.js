(function () {
  function creatNewScene(editor) {
    // 检查是否有该图纸，如没有就新建一张空图纸
    screenList.forEach(function (item, index) {
      editor.request('source', { url: item.fullPath, encoding: 'utf-8' }, function (res) {
        if (!res) {
          editor.request('upload', {
            path: item.fullPath,
            content: new ht.DataModel().serialize()
          },
            function (res) { }
          );
        }
      });
    })
  }
  function updateScreenObject(action, parentPath, params, oldParams) {
    // var parentPath=currentUrl.split(/(.+)\//)[2];
    // 新增以及粘贴
    if (action == 'add') {
      if (!screenObject[parentPath]) {
        screenObject[parentPath] = [];
      }
      screenObject[parentPath].push(params)
    }
    if (action == 'rename') {
      screenObject[parentPath].some(function (ele, i) {
        if (oldParams.fullPath == ele.fullPath) {
          ele.fullPath = params.fullPath
          ele.name = params.name
          return true
        }
        return false
      })
    }
    if (action == 'delete') {
      // params是需要删除的图纸名称以，拼接的字符串
      var deleteScreenList = params.name.split(",");
      deleteScreenList.forEach(function (item, index) {
        screenObject[parentPath].forEach(function (ele, i) {
          if (ele.name == item) {
            screenObject[parentPath].splice(i, 1)
          }
        });
      })
    }
  }
  // 预定义图纸的数据
  var preDefinedDir = {
    id: '0',
    indexNum: -1,
    label: '预定义场景',
    url: 'scenes/0'
  };
  var scenesList = [],
    scenesObject = {},
    mpointsObject = {},
    screenList = [],
    screenObject = {};

  var sceneUpdating = false;
  var sceneDeleting = false;
  var sceneRenaming = false;
  var scenePasteFileing = false;
  var dataCache = false;
  /**
      * 转换树的各项节点属性
      */
  var transAttrByScene = function (tree, editor) {
    scenesList = [],
      scenesObject['scenes/0'] = [preDefinedDir];
    mpointsObject = {},
      screenList = [];
    screenObject['scenes'] = [];
    screenObject['scenes/0'] = [];
    (function eachList(array) {
      var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'scenes';
      var parentPathByMpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '测点根目录';
      array.forEach(function (item, index) {
        item.indexNum = index;
        if (item.type == 9) {
          if (item.screenType == 2) {
            // 拼接父级id，合成后台路径
            item.fullPath = parentPath + '/' + item.name + '.json';
            if (!screenObject[parentPath]) {
              screenObject[parentPath] = []
            }
            screenObject[parentPath].push(item);
            screenList.push(item);
          }
        } else {
          item.fullPath = parentPath + '/' + item.id;
          item.fullPathByMpoint = parentPathByMpoint + '/' + item.id;
          editor.request('mkdir', item.fullPath);
          scenesList.push(item);
          scenesObject[item.fullPath] = item;
          mpointsObject[item.fullPathByMpoint] = item;
          if (item.hasOwnProperty('children') && item.children.length) {
            eachList(item.children, item.fullPath, item.fullPathByMpoint);
          }
        }
      });
    })(tree);
    // return {displaysList : displaysList,screenList : screenList};
  };

  window.hteditor_config.handleEvent = function (editor, type, params) {
    editor.sid = sessionStorage.getItem('htEditor.sid');
    // 获取“创建监视画面”的api
    var screenApi = envApi('/loong/api/monitors');
    // 不能对树目录进行重命名操作
    if (/^scenes/.test(params.url) && !/.json$/.test(params.url) && /^fileRenaming$/.test(type)) {
      params.preventDefault = true;
      return false;
    }
    if (/^scenes/.test(params.url) && /^sceneSaving$/.test(type) && params.url.split(/\//).length == 2) {
      params.preventDefault = true;
      var dialogByRoot = new ht.widget.Dialog();
      dialogByRoot.setConfig({
        title: '提示',
        content: '不可在根目录下操作场景',
        draggable: true,
        closable: true,
        contentPadding: 10,
        width: 200,
        height: 80
      });
      dialogByRoot.show();
      return false;
    }
    // 如果操作是针对场景，并且是保存、重命名、删除，则进行数据缓存
    if (/^scenes/.test(params.url) && ~['pasteFile', 'sceneSaving', 'fileRenaming', 'fileDeleting'].indexOf(type)) {
      if (type === 'fileDeleting') {
        // 如果删除多份，进行叠加，删除单个也按照数组方式来处理
        if (dataCache instanceof Array) {
          dataCache.push(params);
        } else {
          dataCache = [params];
        }
      } else {
        if (type == 'pasteFile') {
          if (params.url.indexOf(".json") != -1) {
            dataCache = params;
          }
        } else {
          dataCache = params;
        }
      }
      // 状态更新
      sceneUpdating = type === 'sceneSaving';
      sceneRenaming = type === 'fileRenaming';
      sceneDeleting = type === 'fileDeleting';
      scenePasteFileing = type === 'pasteFile';
    }
    // 如果更新完毕
    // if (sceneUpdating && type === 'response' && params.cmd === 'upload' && params.data && dataCache) {
    if (sceneUpdating && dataCache) {
      var url = dataCache.url;
      var args = url.split(/\/|\./);
      var len = args.length;
      var siteId = args[len - 3];
      var name = args[len - 2];
      var previewURL = dataCache.scene._dataModel.a("previewURL") || "scene.html";
      var uploadPath = previewURL + "?tag=" + url
      if (siteId == "scenes") return false;
      updateScreenObject("add", url.replace("/" + name + ".json", ""), {
        fullPath: url,
        name: name
      })
      if (siteId != 0) {
        window.axios.post(screenApi, { siteId: siteId, screenName: name, screenType: '2', uploadPath: uploadPath }).then(function (res) { }).catch(function (err) {
          messageTip(err);
        });
      }
      dataCache = false;
    }
    // 粘贴
    // if (scenePasteFileing && type === 'response' && params.cmd === 'upload' && params.data && dataCache && dataCache.url.indexOf(".json") != -1) {
    if (scenePasteFileing && dataCache && dataCache.url.indexOf(".json") != -1) {
      var url = dataCache.url;
      var args = url.split(/\/|\./);
      var len = args.length;
      var siteId = args[len - 3];
      var name = args[len - 2];
      if (siteId == "scenes") return false;
      updateScreenObject("add", url.replace("/" + name + ".json", ""), {
        fullPath: url,
        name: name
      })
      if (siteId != 0) {
        editor.request('source', { url: url, encoding: 'utf-8' }, function (res) {
          var previewURL = ht.Default.parse(res).a && ht.Default.parse(res).a.previewURL;
          previewURL = previewURL || "scene.html";
          var uploadPath = previewURL + "?tag=" + url
          window.axios.post(screenApi, { siteId: siteId, screenName: name, screenType: '2', uploadPath: uploadPath }).then(function (res) { }).catch(function (err) {
            messageTip(err);
          });
        });
      }
      dataCache = false;
    }
    // 如果重命名完毕，TODO:此处未获取到修改后的名称
    // if (sceneRenaming && type === 'response' && params.cmd === 'rename' && params.data && dataCache) {
    if (sceneRenaming && dataCache && type == 'rename') {
      var url = dataCache.url;
      var args = url.split(/\/|\./);
      var len = args.length;
      var siteId = args[len - 3];
      var name = args[len - 2];
      var newName = params.new.split(/\/|\./)[len - 2].trim();
      if (siteId == "scenes") return false;
      updateScreenObject("rename", dataCache.data.path, {
        fullPath: dataCache.data.path + '/' + newName + '.json',
        name: newName
      }, {
          fullPath: url,
          name: name
        })
      if (siteId != 0) {
        window.axios.post(screenApi, { siteId: siteId, screenName: newName, oldScreenName: name, screenType: '2' }).then(function (res) { }).catch(function (err) {
          messageTip(err);
        });
      }
      dataCache = false;
    }
    // 如果删除完毕
    // if (sceneDeleting && type === 'response' && params.cmd === 'remove' && params.data && dataCache) {
    if (sceneDeleting && dataCache) {
      var siteId = dataCache[0].data._parent._name;
      var names = dataCache.map(function (item) {
        return item.data._styleMap.label;
      });
      if (siteId == "scenes") return false;
      updateScreenObject("delete", dataCache[0].data.path, {
        fullPath: '',
        name: names.join(',')
      })
      if (siteId != 0) {
        window.axios.delete(screenApi, { params: { siteId: siteId, screenName: names.join(','), screenType: '2' } }).then(function (res) { }).catch(function (err) {
          messageTip(err);
        });
      }
      dataCache = false;
    }
    if (type === 'editor3dCreated') {
      handleEditorCreated(editor);

      // 获取所有工艺区域/位置以及工艺画面
      var treeApi = envApi('/loong/api/monitors/tree');
      var text = ht.Default.xhrLoad(treeApi, function () { }, {
        sync: true
      });
      var scenesTree = list2tree({ pid: 'parentId' })(string2array(text).items);
      transAttrByScene(scenesTree, editor);
      window.scenesList = scenesList
      // 测点的工艺位置列表
      addPoints(editor, scenesList, mpointsObject);
      // creatNewScene(editor);
      // 暴露给全局
      window.editor3d = editor;

      // 创建预览场景
      editor.request('mkdir', preDefinedDir.url);
      // 场景树目录禁止新建文件夹、重命名和删除
      // 场景列表禁止新建文件夹
      editor.scenes.tree.menu.setVisibleFunc(function (item) {
        if (item.id == "expandAll" || item.id == "collapseAll") {
          return true
        }
        return false
      });
      editor.scenes.list.menu.setVisibleFunc(function (item) {
        var td = editor.scenes.tree.sm().ld();
        var ld = editor.scenes.list.sm().ld();
        //  工艺区域下无法新增场景，只可在工艺位置下新增场景，场景根目录以及预定义场景除外
        if (td && td.fileType == "root") {
          return false
        }
        if (!td._authorized) return false;
        switch (item.id) {
          // 新建场景只对空白处有效，即 ld=null 时
          case 'newSceneView':
            return true;
          // 粘贴只在空白处有效，且已复制过文件
          case 'paste':
            return editor.scenes.copyFileInfos.length;
          // 导出、复制、删除、重命名只对场景文件有效
          case 'export':
          case 'copy':
          case 'delete':
          case 'rename':
            return ld && ld.fileType === 'scene';
          default:
            return false;
        }
      });
      // 禁用树拖拽
      editor.scenes.tree.handleDragAndDrop = editor.scenes.tree.handleCrossDrag = nothing;
      // 渲染树
      editor.scenes.tree.getLabel = function (data) {
        // 如果是根节点，返回根节点原始名称
        if (data.fileType === 'root') {
          return data._displayName || '场景根目录';
        } else if (data._name === preDefinedDir.id) {
          // 如果是预定义场景，返回预定义场景文字描述
          return preDefinedDir.label;
        } else {
          // 如果是其他文件，则做文件映射
          var node = scenesList.find(function (node) {
            return node.fullPath.toString() == data.url;
          });
          // 若映射节点存在，则返回名字，否则获取显示名称或名称
          return node ? node.name : data._displayName || data._name;
        }
      };
      var treeIsVisible = editor.scenes.tree.isVisible;
      editor.scenes.tree.isVisible = function (data) {
        // 节点的显示条件
        if (data.url.indexOf('.json') != -1 || data.url.indexOf('.png') != -1) return false;
        return treeIsVisible.call(this, data) && (scenesList.some(function (node) {
          // type=1,表示是工艺区域
          if (node.fullPath.toString() == data.url) {
            data._type = node.type;
            data._authorized = node.authorized;
            return true
          } else {
            return false
          }
          // return node.fullPath.toString() == data.url;
        }) || data.fileType === 'root' || (function () {
          if (data._name === preDefinedDir.id) {
            data._authorized = true;
            return true
          } else {
            return false
          }
        })());
      };

      editor.scenes.tree.setSortFunc(function (a, b) {
        var itemA = scenesObject[a.url],
          itemB = scenesObject[b.url];
        return itemA.indexNum - itemB.indexNum;
      });

      // 渲染列表
      editor.scenes.list.getLabel = function (data) {
        // 如果是根节点，返回根节点原始名称
        if (data.fileType === 'root') {
          return data._displayName;
        } else if (data._name == preDefinedDir.id) {
          // 如果是预定义图纸，返回预定义场景文字描述
          return preDefinedDir.label;
        } else {
          // 如果是其他文件，则做文件映射
          var node = screenObject[data.path] && screenObject[data.path].find(function (node) {
            return node.fullPath.toString() == data.url;
          });
          // 若映射节点存在，则返回名字，否则获取显示名称或名称
          return node ? node.name : data._styleMap.label || data._name;
        }
      };
      // editor.newScene();
      // editor.url="scenes/0/haha.json"
      // editor.save();
      var listIsVisible = editor.scenes.list.isVisible;
      editor.scenes.list.isVisible = function (data) {
        // 节点的显示条件
        if (data.url.indexOf('.json') == -1) return false;
        return listIsVisible.call(this, data) && (screenObject[data.path] && screenObject[data.path].some(function (node) {
          return node.fullPath.toString() == data.url;
        }) || data.path === "scenes" || data.path === preDefinedDir.url);
      };

      // 资源list显示规则——不显示文件夹
      var listIsVisibleByAssets = editor.assets.list.isVisible;
      editor.assets.list.isVisible = function (data) {
        // 节点的显示条件
        return listIsVisibleByAssets.call(this, data) && data.fileType != "dir";
      };
      // 图标list显示规则——不显示文件夹
      var listIsVisibleBySymbols = editor.symbols.list.isVisible;
      editor.symbols.list.isVisible = function (data) {
        // 节点的显示条件
        return listIsVisibleBySymbols.call(this, data) && data.fileType != "dir";
      };
      // 模型list显示规则——不显示文件夹
      var listIsVisibleByModels = editor.models.list.isVisible;
      editor.models.list.isVisible = function (data) {
        // 节点的显示条件
        return listIsVisibleByModels.call(this, data) && data.fileType != "dir";
      };


      var userInfo = string2json(sessionStorage.getItem('__MANGO_U_'));
      window.isAdmin = isAdmin(userInfo);
      if (window.isAdmin) return;

      /**
       * list右键菜单
       * id: "locateFile", label: '定位文件'
       * id: "newFolder", label: '新建文件夹'
       * id: "rename", label: '重命名'
       * id: "delete", label: '删除'
       * id: "export", label: '导出'
       */
      // 移除最后一个无用项
      // editor.scenes.list.menu._items.pop();

      editor.scenes.list.menu.setVisibleFunc(function (item) {
        // 这里逻辑很复杂
        // tree的选择项(treeData)
        var td = editor.scenes.tree.sm().ld();
        // list的选择项(listData)
        var ld = editor.scenes.list.sm().ld();
        if (td && td.fileType == "root") {
          return false
        }
        if (!td._authorized) return false;
        if (item.id == "newFolder" || item.id == "locateFile") {
          return false
        }
        // 预定义文件夹及其子文件、文件夹不显示新建文件夹/粘贴/删除/重命名
        // ld.url.indexOf(preDefinedDir.url)，返回字符串值在字符串中首次出现的位置。找到就是0
        if (!ld && td && !td.url.indexOf(preDefinedDir.url) || ld && !ld.url.indexOf(preDefinedDir.url)) {
          if (~['newSceneView', 'paste', 'delete', 'rename'].indexOf(item.id)) {
            return false;
          }
        }
        // 其他文件的操作
        switch (item.id) {
          // 新建场景
          case 'newSceneView':
            return true;
          // 粘贴只在空白处有效，且已复制过文件
          case 'paste':
            return editor.scenes.copyFileInfos.length;
          // 复制、删除、重命名只对场景文件有效
          case 'copy':
          case 'delete':
          case 'rename':
            return ld && ld.fileType === 'scene';
          default:
            return false;
        }
      });

      /////////////图标部分
      /**
       * 树右键菜单
       * id: "locateFile", label: '定位文件'
       * id: "newFolder", label: '新建文件夹'
       * id: "newSymbolView", label: '新建图标'
       * id: "rename", label: '重命名'
       * id: "delete", label: '删除'
       * id: "expandAll", label: '展开全部'
       * id: "collapseAll", label: '折叠全部'
       */
      editor.symbols.tree.menu.setItemVisible('locateFile', false);
      editor.symbols.tree.menu.setItemVisible('newFolder', false);
      editor.symbols.tree.menu.setItemVisible('newSymbolView', false);
      editor.symbols.tree.menu.setItemVisible('rename', false);
      editor.symbols.tree.menu.setItemVisible('delete', false);
      // editor.symbols.tree.menu._items.pop();
      /**
       * list右键菜单
       * id: "open", label: '打开'
       * id: "insert", label: '插入'
       * id: "locateFile", label: '定位文件'
       * id: "newFolder", label: '新建文件夹'
       * id: "newSymbolView", label: '新建图纸'
       * id: "copy", label: '复制'
       * id: "paste", label: '粘贴'
       * id: "rename", label: '重命名'
       * id: "delete", label: '删除'
       * id: "export", label: '导出'
       */
      editor.symbols.list.menu.setItemVisible('open', false);
      editor.symbols.list.menu.setItemVisible('insert', false);
      editor.symbols.list.menu.setItemVisible('locateFile', false);
      editor.symbols.list.menu.setItemVisible('newFolder', false);
      editor.symbols.list.menu.setItemVisible('newSymbolView', false);
      editor.symbols.list.menu.setItemVisible('copy', false);
      editor.symbols.list.menu.setItemVisible('paste', false);
      editor.symbols.list.menu.setItemVisible('rename', false);
      editor.symbols.list.menu.setItemVisible('delete', false);
      editor.symbols.list.menu.setItemVisible('export', false);
      // editor.symbols.list.menu._items.pop();

      /////////////模型部分

      editor.models.tree.menu.setVisibleFunc(function (item) {
        if (item.id == "expandAll" || item.id == "collapseAll") {
          return true
        }
      });
      editor.models.list.menu.setVisibleFunc(function (item) {
        return false
      });
      /////////////资源部分
      /**
       * 树右键菜单
       * id: "locateFile", label: '定位文件'
       * id: "newFolder", label: '新建文件夹'
       * id: "rename", label: '重命名'
       * id: "delete", label: '删除'
       * id: "expandAll", label: '展开全部'
       * id: "collapseAll", label: '折叠全部'
       */
      editor.assets.tree.menu.setItemVisible('locateFile', false);
      editor.assets.tree.menu.setItemVisible('newFolder', false);
      editor.assets.tree.menu.setItemVisible('rename', false);
      editor.assets.tree.menu.setItemVisible('delete', false);
      // editor.assets.tree.menu._items.pop();
      /**
       * list右键菜单
       * id: "insert", label: '插入'
       * id: "locateFile", label: '定位文件'
       * id: "newFolder", label: '新建文件夹'
       * id: "copy", label: '复制'
       * id: "paste", label: '粘贴'
       * id: "rename", label: '重命名'
       * id: "delete", label: '删除'
       * id: "convertToDisplay", label: '转换成图纸'
       * id: "convertToSymbol", label: '转换成图标'
       */
      editor.assets.list.menu.setItemVisible('open', false);
      editor.assets.list.menu.setItemVisible('insert', false);
      editor.assets.list.menu.setItemVisible('locateFile', false);
      editor.assets.list.menu.setItemVisible('newFolder', false);
      editor.assets.list.menu.setItemVisible('copy', false);
      editor.assets.list.menu.setItemVisible('paste', false);
      editor.assets.list.menu.setItemVisible('rename', false);
      editor.assets.list.menu.setItemVisible('delete', false);
      editor.assets.list.menu.setItemVisible('convertToDisplay', false);
      editor.assets.list.menu.setItemVisible('convertToSymbol', false);
      // editor.assets.list.menu._items.pop();

      ////////////通用功能设置
      // var oldFuncDrag = editor.points.list.handleDragAndDrop;
      // var oldFuncCross = editor.points.list.handleCrossDrag;
      // 禁止树拖动
      editor.scenes.tree.handleDragAndDrop = editor.symbols.tree.handleDragAndDrop = editor.models.tree.handleDragAndDrop = editor.assets.tree.handleDragAndDrop = editor.points.tree.handleDragAndDrop = nothing;
      // 禁用树拖拽动画
      editor.scenes.tree.handleCrossDrag = editor.symbols.tree.handleCrossDrag = editor.models.tree.handleCrossDrag = editor.assets.tree.handleCrossDrag = editor.points.tree.handleCrossDrag = nothing;
      // 禁止电脑本地的资源拖拽到编辑器列表显示区域
      editor.scenes.list.handleCrossDrag = editor.symbols.list.handleCrossDrag = editor.models.list.handleCrossDrag = editor.assets.list.handleCrossDrag = editor.points.list.handleCrossDrag = nothing;
      // 双击模型列表时，禁止弹出obj模型弹框
      editor.models.list.handleDoubleClick = function () { }

      // 禁止预定义场景、图标进行保存或重命名操作
      editor.addEventListener(function (event) {
        // 禁止保存或重命名
        if ((event.type.includes("fileRenaming") || event.type.includes('Saving')) && (~event.params.url.indexOf(preDefinedDir.url) || ~event.params.url.indexOf('symbols') || ~event.params.url.indexOf('assets') || ~event.params.url.indexOf('models'))) {
          var dialog = new ht.widget.Dialog();
          dialog.setConfig({
            title: '提示',
            content: '您无权限操作',
            draggable: true,
            closable: true,
            contentPadding: 10,
            width: 160,
            height: 80
          });
          dialog.show();
          event.params.preventDefault = true;
        }
        return false;
      });
      // 设置菜单不显示
      editor.mainMenu._view.style.display = 'none';
      editor.mainToolbar.getItemById('menu').toolTip = null;
    }
  };
  function addNewScenesItem(view, editor) {
    var items = view.menu.getItems();
    items.unshift({
      id: 'newSceneView',
      icon: '',
      label: '新建场景',
      visible: function visible() {
        return true;
      },
      background: function background() {
        return '#fff';
      },
      action: function action() {
        editor.mainMenu.getItems()[0].action();
      }
    });
  }
  function addOtherItem(view, editor) {
    var items = view.menu.getItems();
    items.push("separator", {
      id: "expandAll",
      label: "展开全部",
      action: function action() {
        view.expandAll();
      }
    }, {
        id: "collapseAll",
        label: "折叠全部",
        action: function action() {
          view.collapseAll();
        }
      });
  }
  function handleEditorCreated(editor) {
    // Prevent some files from being renamed, moved or deleted
    editor.scenes.list.menu.getItemById("paste").action = function () {
      if (editor.scenes.copyFileInfos.length > 1) {
        editor.scenes.copyFileInfos.length = 0;
        var dialog = new ht.widget.Dialog();
        dialog.setConfig({
          title: '提示',
          content: '每次只可粘贴一个场景',
          draggable: true,
          closable: true,
          contentPadding: 10,
          width: 200,
          height: 80
        });
        dialog.show();
      } else {
        editor.scenes.pasteFiles();
      }
    }
    editor.addEventListener(function (event) {
      if (event.type === 'fileRenaming' || event.type === 'fileMoving' || event.type === 'fileDeleting') {
        if (event.params.url === 'symbols/basic/ht.json' || event.params.url === 'symbols/basic' || event.params.url === 'scenes/basic') {
          event.params.preventDefault = true;
        }
      }
    });

    editor.scenes.list.menu.setItemVisible('open', false);
    editor.symbols.list.menu.setItemVisible('open', false);
    editor.symbols.list.menu.setItemVisible('insert', false);
    editor.models.list.menu.setItemVisible('open', false);
    editor.models.list.menu.setItemVisible('insert', false);
    editor.assets.list.menu.setItemVisible('insert', false);
    // 右键菜单列表增加新增场景
    addNewScenesItem(editor.scenes.tree, editor);
    addNewScenesItem(editor.scenes.list, editor);

    addOtherItem(editor.scenes.tree, editor);
    addOtherItem(editor.symbols.tree, editor);
    addOtherItem(editor.models.tree, editor);
    addOtherItem(editor.assets.tree, editor);

  }
})();