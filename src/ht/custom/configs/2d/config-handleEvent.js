(function () {
  function creatNewDisplay(editor) {
    // 检查是否有该图纸，如没有就新建一张空图纸
    screenList.forEach(function (item, index) {
      editor.request('source', { url: item.fullPath, encoding: 'utf-8' }, function (res) {
        if (!res) {
          editor.request('upload', {
            path: item.fullPath,
            content: new ht.DataModel().serialize()
          },
            function (res) { });
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
      // params是需要删除的图纸名称以","拼接的字符串
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
    label: '预定义图纸',
    url: 'displays/0'
  };
  // 工艺区域以及工艺位置的集合
  var displaysList = [],
    // 属性名为工艺区域以及工艺位置路径的对象
    displaysObject = {},
    mpointsObject = {},
    // 所有图纸集合
    screenList = [],
    // 属性名为图纸路径的图纸对象
    screenObject = {};
  var displayUpdating = false;
  var displayDeleting = false;
  var displayRenaming = false;
  var displayPasteFileing = false;
  var dataCache = false;

  /**
      * 转换树的各项节点属性
      */
  var transAttrByDisplay = function (tree, editor) {
    displaysList = [],
      displaysObject['displays/0'] = [preDefinedDir];
    mpointsObject = {},
      screenList = [];
    screenObject['displays'] = [];
    screenObject['displays/0'] = [];
    (function eachList(array) {
      var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'displays';
      var parentPathByMpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '测点根目录';
      array.forEach(function (item, index) {
        item.indexNum = index;
        if (item.type == 9) {
          // 拼接父级id，合成后台路径
          if (item.screenType == 1) {
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
          displaysList.push(item);
          displaysObject[item.fullPath] = item;
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
    // if (type == "dataCreated") {
    //   // 监听拖拽图标进入图纸data创建完成时，
    //   // 此时将图标中的dataBindings默认值手动写入到图纸中对应图标对象的属性中，该属性中主要存放动画相关属性
    //   // 在预览页面通过调用动画函数触发动画
    //   // dataModel为当前图纸的数据容器
    //   var dataModel = params.data._dataModel;
    //   // datas为图纸中的图标数据列表
    //   var datas = params.data._dataModel._datas._as;
    //   // symbolData:新增的图标数据(角标是最后一个)
    //   var symbolData = datas[datas.length - 1];
    //   if (!symbolData._image || symbolData._image.search(".json") == -1) return;
    //   ht.Default.xhrLoad(symbolData._image, function (text) {
    //     var iconObj = ht.Default.parse(text);
    //     if (iconObj && iconObj.dataBindings) {
    //       iconObj.dataBindings.forEach(function (data) {
    //         // 通过图标ID,获取图标数据
    //         var item = dataModel.getDataById(symbolData._id);
    //         item.a(data.attr, data.defaultValue);
    //       });
    //     }
    //   });
    // }
    // 获取“创建监视画面”的api
    var screenApi = envApi('/loong/api/monitors');
    // 不能对树目录进行重命名操作
    if (/^displays/.test(params.url) && !/.json$/.test(params.url) && /^fileRenaming$/.test(type)) {
      params.preventDefault = true;
      return false;
    } 
    if (/^displays/.test(params.url) && /^displayViewSaving$/.test(type) && params.url.split(/\//).length == 2) {
      params.preventDefault = true;
      var dialogByRoot = new ht.widget.Dialog();
      dialogByRoot.setConfig({
        title: '提示',
        content: '不可在根目录下操作图纸',
        draggable: true,
        closable: true,
        contentPadding: 10,
        width: 200,
        height: 80
      });
      dialogByRoot.show();
      return false;
    }
    // 如果操作是针对图纸，并且是保存、重命名、删除，则进行数据缓存
    if (/^displays/.test(params.url) && ~['pasteFile', 'displayViewSaving', 'fileRenaming', 'fileDeleting'].indexOf(type)) {
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
      displayUpdating = type === 'displayViewSaving';
      displayRenaming = type === 'fileRenaming';
      displayDeleting = type === 'fileDeleting';
      displayPasteFileing = type === 'pasteFile';
    }
    // 如果更新完毕
    if (displayUpdating && type === 'response' && params.cmd === 'upload' && params.data && dataCache) {
      var url = dataCache.url;
      var args = url.split(/\/|\./);
      var len = args.length;
      var siteId = args[len - 3];
      var name = args[len - 2];
      var previewURL = dataCache.displayView.graphView._dataModel.a("previewURL") || "display.html";
      var uploadPath = previewURL + "?tag=" + url
      if (siteId == "displays") return false;
      updateScreenObject("add", url.replace("/" + name + ".json", ""), {
        fullPath: url,
        name: name
      })
      if (siteId != 0) {
        window.axios.post(screenApi, { siteId: siteId, screenName: name, screenType: '1', uploadPath: uploadPath }).then(function (res) { }).catch(function (err) {
          messageTip(err);
        });
      }
      dataCache = false;
    }
    // 如果粘贴完毕
    if (displayPasteFileing && type === 'response' && params.cmd === 'upload' && params.data && dataCache && dataCache.url.indexOf(".json") != -1) {
      var url = dataCache.url;
      var args = url.split(/\/|\./);
      var len = args.length;
      var siteId = args[len - 3];
      var name = args[len - 2];
      if (siteId == "displays") return false;
      updateScreenObject("add", url.replace("/" + name + ".json", ""), {
        fullPath: url,
        name: name
      })
      if (siteId != 0) {
        editor.request('source', { url: url, encoding: 'utf-8' }, function (res) {
          var previewURL = ht.Default.parse(res).a && ht.Default.parse(res).a.previewURL;
          previewURL = previewURL || "display.html";
          var uploadPath = previewURL + "?tag=" + url
          window.axios.post(screenApi, { siteId: siteId, screenName: name, screenType: '1', uploadPath: uploadPath }).then(function (res) { }).catch(function (err) {
            messageTip(err);
          });
        });
      }
      dataCache = false;
    }

    // 如果重命名完毕
    if (displayRenaming && type === 'response' && params.cmd === 'rename' && params.data && dataCache) {
      var url = dataCache.url;
      var args = url.split(/\/|\./);
      var len = args.length;
      var siteId = args[len - 3];
      var name = args[len - 2];
      var newName = dataCache.data._styleMap.label.trim();
      if (siteId == "displays") return false;
      updateScreenObject("rename", dataCache.data.path, {
        fullPath: dataCache.data.path + '/' + newName + '.json',
        name: newName
      }, {
        fullPath: url,
        name: name
      })
      if (siteId != 0) {
        window.axios.post(screenApi, { siteId: siteId, screenName: newName, oldScreenName: name, screenType: '1' }).then(function (res) { }).catch(function (err) {
          messageTip(err);
        });
      }
      dataCache = false;
    }
    // 如果删除完毕
    if (displayDeleting && type === 'response' && params.cmd === 'remove' && params.data && dataCache) {
      var siteId = dataCache[0].data._parent._name;
      var names = dataCache.map(function (item) {
        return item.data._styleMap.label;
      });
      if (siteId == "displays") return false;
      updateScreenObject("delete", dataCache[0].data.path, {
        fullPath: '',
        name: names.join(',')
      })
      if (siteId != 0) {
        window.axios.delete(screenApi, { params: { siteId: siteId, screenName: names.join(','), screenType: '1' } }).then(function (res) { }).catch(function (err) {
          messageTip(err);
        });
      }
      dataCache = false;
    }
    if (type === 'editorCreated') {
      handleEditorCreated(editor);


      editor.mainMenu.setVisibleFunc(function (item) {
        if (item.id == 'edit' || item.label == "使用说明" || item.label == "发布日志") {
          return false
        }

        return true
      });
      // 获取所有工艺区域/位置以及工艺画面
      var treeApi = envApi('/loong/api/monitors/tree');
      var text = ht.Default.xhrLoad(treeApi, function () { }, {
        sync: true
      });
      var displaysTree = list2tree({ pid: 'parentId' })(string2array(text).items);

      // 将数据进行处理，存放各种形式
      transAttrByDisplay(displaysTree, editor);
      window.displaysList = displaysList
      // 测点的工艺位置列表
      addPoints(editor, displaysList, mpointsObject, function (points) {
        points.list.isDroppableToDisplayView = true;
      });
      // 根据接口返回的圖紙鏈接創建新圖紙
      // creatNewDisplay(editor);
      // 暴露给全局
      window.editor = editor;

      // 创建预览图纸
      editor.request('mkdir', preDefinedDir.url);
      // 图纸树目录禁止新建文件夹、重命名和删除
      // 图纸列表禁止新建文件夹
      editor.displays.tree.menu.setVisibleFunc(function (item) {
        if (item.id == "expandAll" || item.id == "collapseAll") {
          return true
        }
        return false
      });
      editor.displays.list.menu.setVisibleFunc(function (item) {
        var td = editor.displays.tree.sm().ld();
        var ld = editor.displays.list.sm().ld();
        //  工艺区域下无法新增图纸，只可在工艺位置下新增图纸，图纸根目录以及预定义图纸除外
        if (td && td.fileType == "root") {
          return false
        }
        if (!td._authorized) return false;
        switch (item.id) {
          // 新建图纸
          case 'newDisplayView':
            return true;
          // 粘贴只在已复制过文件有效
          case 'paste':
            return editor.displays.copyFileInfos.length;
          // 导出、复制、删除、重命名只对图纸文件有效
          case 'export':
          case 'copy':
          case 'delete':
          case 'rename':
            return ld && ld.fileType === 'display';
          default:
            return false;
        }
      });
      // 禁用树拖拽
      //var displayOldFuncDrag = editor.displays.list.handleDragAndDrop;
      editor.displays.tree.handleDragAndDrop = editor.displays.tree.handleCrossDrag = nothing;
      // 渲染树
      editor.displays.tree.getLabel = function (data) {
        // 如果是根节点，返回根节点原始名称
        if (data.fileType === 'root') {
          return data._displayName || '图纸根目录';
        } else if (data._name === preDefinedDir.id) {
          // 如果是预定义图纸，返回预定义图纸文字描述
          return preDefinedDir.label;
        } else {
          // 如果是其他文件，则做文件映射
          var node = displaysList.find(function (node) {
            return node.fullPath.toString() == data.url;
          });
          // 若映射节点存在，则返回名字，否则获取显示名称或名称
          return node ? node.name : data._displayName || data._name;
        }
      };
      var treeIsVisible = editor.displays.tree.isVisible;
      editor.displays.tree.isVisible = function (data) {
        // 节点的显示条件
        if (data.url.indexOf('.json') != -1 && data.url.indexOf('.png') != -1) return false;
        return treeIsVisible.call(this, data) && (displaysList.some(function (node) {
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
        })())
      }
      // 对图纸目录进行排序规则重定义
      editor.displays.tree.setSortFunc(function (a, b) {
        var itemA = displaysObject[a.url],
          itemB = displaysObject[b.url];
        return itemA.indexNum - itemB.indexNum;
      });

      // 渲染列表
      editor.displays.list.getLabel = function (data) {
        // 如果是根节点，返回根节点原始名称
        if (data.fileType === 'root') {
          return data._displayName;
        } else if (data._name == preDefinedDir.id) {
          // 如果是预定义图纸，返回预定义图纸文字描述
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
      var listIsVisible = editor.displays.list.isVisible;

      // editor.newDisplayView("haha");
      // editor._currentTab.getView().url="displays/1/haha.json"
      // editor.save();
      editor.displays.list.isVisible = function (data) {
        // 节点的显示条件
        if (data.url.indexOf('.json') == -1) return false;
        return listIsVisible.call(this, data) && (screenObject[data.path] && screenObject[data.path].some(function (node) {
          return node.fullPath.toString() == data.url;
        }) || data.path === "displays" || data.path === preDefinedDir.url);
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
      // 组件list显示规则——不显示文件夹
      var listIsVisibleByComponents = editor.components.list.isVisible;
      editor.components.list.isVisible = function (data) {
        // 节点的显示条件
        return listIsVisibleByComponents.call(this, data) && data.fileType != "dir";
      };

      var userInfo = string2json(sessionStorage.getItem('__MANGO_U_'));
      window.isAdmin = isAdmin(userInfo);
      if (window.isAdmin) return;

      /**
       * list右键菜单
       * id: "open", label: '打开'
       * id: "locateFile", label: '定位文件'
       * id: "newFolder", label: '新建文件夹'
       * id: "newDisplayView", label: '新建图纸'
       * id: "copy", label: '复制'
       * id: "paste", label: '粘贴'
       * id: "rename", label: '重命名'
       * id: "delete", label: '删除'
       * id: "export", label: '导出'
       */
      // 移除最后一个无用项
      // editor.displays.list.menu._items.pop();
      editor.displays.list.menu.setVisibleFunc(function (item) {
        // 这里逻辑很复杂
        // tree的选择项(treeData)
        var td = editor.displays.tree.sm().ld();
        // list的选择项(listData)
        var ld = editor.displays.list.sm().ld();
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
          if (~['newDisplayView', 'paste', 'delete', 'rename'].indexOf(item.id)) {
            return false;
          }
        }
        // 其他文件的操作
        switch (item.id) {
          // 新建图纸
          case 'newDisplayView':
            return true;
          // 粘贴只在已复制过文件有效
          case 'paste':
            return editor.displays.copyFileInfos.length;
          // 复制、删除、重命名只对图纸文件有效
          case 'copy':
          case 'delete':
          case 'rename':
            return ld && ld.fileType === 'display';
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

      /////////////组件部分
      // 组件tab移除不显示
      editor.componentsTab.removeFromDataModel();

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
      editor.displays.tree.handleDragAndDrop = editor.symbols.tree.handleDragAndDrop = editor.components.tree.handleDragAndDrop = editor.assets.tree.handleDragAndDrop = editor.points.tree.handleDragAndDrop = nothing;

      // 禁用树拖拽动画
      editor.displays.tree.handleCrossDrag = editor.symbols.tree.handleCrossDrag = editor.components.tree.handleCrossDrag = editor.assets.tree.handleCrossDrag = editor.points.tree.handleCrossDrag = nothing;
      // 禁止电脑本地的资源拖拽到编辑器列表显示区域
      editor.displays.list.handleCrossDrag = editor.symbols.list.handleCrossDrag = editor.components.list.handleCrossDrag = editor.assets.list.handleCrossDrag = editor.points.list.handleCrossDrag = nothing;

      // 禁止对预定义图纸、图标进行保存或重命名操作
      editor.addEventListener(function (event) {
        // 禁止保存或重命名
        if ((event.type.includes("fileRenaming") || event.type.includes('Saving')) && (~event.params.url.indexOf(preDefinedDir.url) || ~event.params.url.indexOf('symbols') || ~event.params.url.indexOf('assets'))) {
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

  function handleEditorCreated(editor) {
    // Prevent some files from being renamed, moved or deleted
    editor.displays.list.menu.getItemById("paste").action = function () {
      if (editor.displays.copyFileInfos.length > 1) {
        editor.displays.copyFileInfos.length = 0;
        var dialog = new ht.widget.Dialog();
        dialog.setConfig({
          title: '提示',
          content: '每次只可粘贴一个图纸',
          draggable: true,
          closable: true,
          contentPadding: 10,
          width: 200,
          height: 80
        });
        dialog.show();
      } else {
        editor.pasteFiles()
      }
    }
    editor.addEventListener(function (event) {
      if (event.type === 'fileRenaming' || event.type === 'fileMoving' || event.type === 'fileDeleting') {
        if (event.params.url === 'symbols/basic/ht.json' || event.params.url === 'symbols/basic' || event.params.url === 'displays/basic') {
          event.params.preventDefault = true;
        }
      }
    });
    editor.displays.list.menu.setItemVisible('open', false);
    editor.symbols.list.menu.setItemVisible('open', false);
    editor.symbols.list.menu.setItemVisible('insert', false);
    editor.components.list.menu.setItemVisible('open', false);
    editor.components.list.menu.setItemVisible('insert', false);
    editor.assets.list.menu.setItemVisible('insert', false);
  }

})();