/**
 * data.setDataBindings({
 *     p: {
 *         name: { id: 'M001' },
 *         icon: {
 *             id: 'M002',
 *             func: function(value) {
 *                 if (value > 70) {
 *                     return 'symbols/scada/alarm.json';
 *                 }
 *                 if (value > 50) {
 *                     return 'symbols/scada/warning.json';
 *                 }
 *                 return 'symbols/scada/normal.json';
 *             }
 *         }
 *     },
 *     s: {
 *         'shape.background': {
 *             id: 'M002'
 *             func: function(value) {
 *                 if (value > 70) {
 *                     return 'red';
 *                 }
 *                 if (value > 50) {
 *                     return 'yellow';
 *                 }
 *                 return 'green';
 *             }
 *         }
 *         'shape.border.width': { id: 'M003' },
 *     },
 *     a: {
 *         'pressure': { id: 'M004' },
 *         'temperature': { id: 'M005' },
 *         'volume': { id: 'M006' }
 *     }
 * });
 */
window.hteditor_config.dataBindings = {

    onButtonClicked: function (data, accessType, name) {
        var dataBindings = data.getDataBindings();
        var id = '';
        var mpointName = '';
        var func = null;
        if (dataBindings && dataBindings[accessType] && dataBindings[accessType][name]) {
            id = dataBindings[accessType][name].id;
            mpointName = dataBindings[accessType][name].mpointName || '';
            func = dataBindings[accessType][name].func;
        }

        var S = hteditor.getString;
        var formPane = new ht.widget.FormPane();
        formPane.addRow([
            S('Property'),
            {
                textField: {
                    text: name,
                    editable: false
                }
            }
        ], [50, 0.1]);
        formPane.addRow([
            S('Id'),
            {
                id: "input",
                textField: {
                    text: editor.points.list.sm().isEmpty() ? id : editor.points.list.sm().ld().a('id') || ''
                }
            }, {
                button: {
                    label: '选择测点',
                    onClicked: function (e) {
                        var mpointDataBySiteId = [];
                        function DropDownTree(master) {
                            function createData(item, map) {
                                var data = new ht.Data();
                                data.setName(item.name);
                                data.setToolTip(item.name);
                                data.setTag(item.id);

                                if (map[item.parentId]) {
                                    data.setParent(map[item.parentId])
                                }
                                siteNameDataModel.add(data)
                                map[item.id] = data;
                            }
                            var self = this;
                            DropDownTree.superClass.constructor.call(self, master);
                            // var self = this,
                            //     borderPane = self._borderPane = new ht.widget.BorderPane();
                            var siteNameDataModel = new ht.DataModel();
                            var treeView = self._treeView = new ht.widget.TreeView(siteNameDataModel);
                            var map = {}, treeData = [];
                            treeData = list2tree({ pid: 'parentId' })(window.displaysList || []);

                            var translateData = function (treeData) {
                                (function eachList(array) {
                                    array.forEach(function (item, index) {
                                        createData(item, map)
                                        if (item.hasOwnProperty('children') && item.children.length) {
                                            eachList(item.children);
                                        }
                                    });
                                })(treeData);
                            }
                            translateData(treeData)

                            treeView.sm().ms(function (e) {
                                master.setValue(self.getSelectedValue());
                            });
                            treeView.setCheckMode(null);
                            treeView.enableToolTip();
                            treeView.getView().style.background = "white";
                        }
                        ht.Default.def(DropDownTree, ht.widget.BaseDropDownTemplate, {
                            getView: function () {
                                return this._treeView.getView();
                            },
                            onOpened: function (v) {
                                if (multiComboBox.siteId) {
                                    var treeView = this._treeView;
                                    treeView.dm().toDatas().each(function (data) {

                                        if (multiComboBox.siteId.indexOf(data.getTag()) >= 0) {
                                            treeView.sm().as(data);
                                        }
                                    });
                                }

                            },
                            handleInputValueChange: function () {
                                var inputValue = this._master._input.value,
                                    treeView = this._treeView;
                                treeView.setVisibleFunc(function (data) {
                                    var name = data.getName();
                                    if (name) {
                                        if (name.indexOf(inputValue) >= 0) {
                                            return true;
                                        }
                                    }
                                });
                            },
                            onClosed: function () {

                            },
                            getSelectedValue: function () {
                                var name = "", id = "",
                                    treeView = this._treeView;
                                treeView.sm().each(function (data) {
                                    name = data.getName();
                                    id = data.getTag();
                                });
                                multiComboBox.siteId = id;
                                window.axios.get(envApi('/loong/api/mpoints/monitor'), { params: { siteId: id } }).then(function (res) {
                                    var data = res.data;
                                    mpointDataBySiteId = data || []

                                }).catch(function (err) {
                                    messageTip(err);
                                });
                                return name
                            },
                            // 下拉框关闭时被回调
                            getValue: function (v) {
                                var name = "",
                                    treeView = this._treeView;
                                treeView.sm().each(function (data) {
                                    name = data.getName();
                                });
                                return name
                            },
                            getHeight: function () {
                                return 200;
                            }
                        });
                        function DropDownList(master) {
                            var self = this;
                            DropDownList.superClass.constructor.call(self, master);
                            var listView = self._listView = new ht.widget.ListView();
                            listView.setCheckMode(null);
                            listView.sm().ms(function (e) {
                                master.setValue(self.getValue());
                            });
                            
                            mpointDataBySiteId.forEach(function(element){
                                var data = new ht.Data();
                                data._id = element.id;
                                data.setName(element.mpointName);
                                data.setTag(element.id);
                                listView.dm().add(data);
                            })

                            listView.getView().style.background = "white";
                            self.bindingHandleInputValueChange = self.handleInputValueChange.bind(self);
                        }
                        ht.Default.def(DropDownList, ht.widget.BaseDropDownTemplate, {
                            getView: function () {
                                return this._listView.getView();
                            },
                            handleInputValueChange: function () {
                                var inputValue = this._master._input.value,
                                    listView = this._listView;
                                var nameArr = inputValue && inputValue.split(",")
                                listView.setVisibleFunc(function (data) {
                                    var name = data.getName();
                                    if (nameArr) {
                                        var bol = false;
                                        nameArr.forEach(function (ele, index) {
                                            if (name.indexOf(ele) >= 0) {
                                                bol = true;
                                            }
                                        })
                                        return bol
                                    } else {
                                        return true
                                    }
                                });
                            },
                            onOpened: function (v) {
                                if (multiComboBox2.ids) {
                                    var listView = this._listView,
                                        idArr = multiComboBox2.ids.split(",");
                                    listView.dm().toDatas().each(function (data) {
                                        if (idArr.indexOf(data.getTag()) >= 0) {
                                            listView.sm().as(data);
                                        }
                                    });
                                }
                                this.bindingHandleInputValueChange();
                                this._master._input.addEventListener("keyup", this.bindingHandleInputValueChange);
                            },
                            onClosed: function () {
                                this._master._input.removeEventListener("keyup", this.bindingHandleInputValueChange);
                            },
                            getValue: function () {
                                var names = "", ids = "",
                                    listView = this._listView;
                                listView.sm().each(function (data) {
                                    names += data.getName() + ",";
                                    ids += data.getTag() + ",";
                                });
                                if (names !== "") names = names.substr(0, names.length - 1);
                                if (ids !== "") ids = ids.substr(0, ids.length - 1);
                                multiComboBox2.ids = ids
                                return names;
                            },
                            getHeight: function () {
                                return 200;
                            }
                        });
                        // 带搜索的下拉列表
                        var selectPointFormPane = new ht.widget.FormPane();
                        var multiComboBox = new ht.widget.MultiComboBox();
                        multiComboBox.setEditable(false);
                        multiComboBox.setDropDownComponent(DropDownTree);
                        multiComboBox.siteId = "";


                        var multiComboBox2 = new ht.widget.MultiComboBox();
                        multiComboBox2.setEditable(true);
                        multiComboBox2.setDropDownComponent(DropDownList);
                        multiComboBox2.ids = ""


                        selectPointFormPane.addRow(['区域位置', multiComboBox], [60, 0.1]);
                        selectPointFormPane.addRow(['测点', multiComboBox2], [60, 0.1]);

                        var selectPointDialog = new ht.widget.Dialog();
                        var buttons = [{
                            label: S('OK'),
                            action: function () {
                                formPane.setValue("input", multiComboBox2.ids)
                                formPane.setValue("nameInput", multiComboBox2.getValue())
                                selectPointDialog.hide();
                            }
                        }, {
                            label: S('Cancel'),
                            action: function () {
                                selectPointDialog.hide();
                            }
                        }]
                        selectPointDialog.setConfig({
                            title: S('选择测点'),
                            draggable: true,
                            width: 400,
                            height: 160,
                            contentPadding: 4,
                            content: selectPointFormPane,
                            buttons: buttons,
                            buttonsAlign: 'right'
                        });

                        selectPointDialog.show();
                    }
                }
            }
        ], [50, 0.1, 100]);
        
        formPane.addRow([
            S('Name'),
            {
                id: 'nameInput',
                textField: {
                    text: editor.points.list.sm().isEmpty() ? mpointName : editor.points.list.sm().ld().a('name')
                }
            }
        ], [50, 0.1]);
        formPane.addRow([
            {
                element: S('Func'),
                vAlign: 'top'
            },
            {
                id: 'textArea',
                element: new hteditor.CodeEditor({
                    value: hteditor.stringifyFunction(func),
                    language: 'javascript',
                    minimap: {
                        enabled: false
                    }
                })
            }
        ], [50, 0.1], 0.1);

        var dialog = new ht.widget.Dialog();
        var buttons = [{
            label: S('OK'),
            action: function () {
                var id = formPane.v('input');
                var mpointName = formPane.v('nameInput');
                var func = formPane.v('textArea');
                var dataBindings = data.getDataBindings();
                if (!dataBindings) {
                    dataBindings = {};
                }
                if (!dataBindings[accessType]) {
                    dataBindings[accessType] = {};
                }
                if (!dataBindings[accessType][name]) {
                    dataBindings[accessType][name] = {};
                }
                if (!id) {
                    delete dataBindings[accessType][name];
                    if (data._attrObject) {
                        delete data._attrObject.id
                        delete data._attrObject.name
                        delete data._attrObject.unit
                    }
                }
                else {
                    if (data.a("id")) {
                        // 拖拽的测点，在点击测点列表重新绑定测点时，改变测点编号、测点名称、默认文本名称以及内容
                        data.a("id", id);
                        if (!editor.points.list.sm().isEmpty()) {
                            var newName = editor.points.list.sm().ld().a('name');
                            data.a("name", newName);
                            data.s("text", newName);
                            data.setDisplayName(newName);
                        }
                    }
                    dataBindings[accessType][name].id = id;
                    dataBindings[accessType][name].mpointName = mpointName;
                    dataBindings[accessType][name].func = hteditor.parseFunction(func);
                }
                data.setDataBindings(dataBindings);
                data.fp('dataBindings', true, false);
                editor.points.list.sm().cs();
                dialog.hide();
            }
        },{
            label: S('Cancel'),
            action: function () {
                editor.points.list.sm().cs();
                dialog.hide();
            }
        }];
        dialog.setConfig({
            title: S('绑定测点'),
            draggable: true,
            width: 400,
            height: 400,
            contentPadding: 4,
            content: formPane,
            buttons: buttons,
            buttonsAlign: 'right'
        });
        dialog.show();
        formPane.getViewById('input').setFocus();
    }
};