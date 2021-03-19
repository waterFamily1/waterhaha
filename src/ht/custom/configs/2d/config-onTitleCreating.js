(function () {

    var isHandling = false;
    window.hteditor_config.onTitleCreating = function (editor, params) {
        if (!isHandling) {
            isHandling = true;
            handleTitleCreating(editor, params);
            isHandling = false;
        }
    };
    function looseJsonParse(obj, data) {
        try {
            return Function('"use strict";return (' + obj + ')').call(data);
        } catch (error) {
            throw error
        }
    }
    function handleTitleCreating(editor, params) {
        var title = params.title;
        var oldTitle = params.oldTitle;
        var inspector = params.inspector;

        if (inspector.type === 'symbol' && oldTitle === 'TitleBasic') {
            // addPropertiesToSymbol(inspector);
        }

        if (inspector.type === 'data' && title === 'TitleSelect') {
            var datas = editor.dm.sm();
            var data = {};
            datas.each(function (item, index) {
                if (index == 0) {
                    data = item;
                }
            })
            // 在图元属性面板最末处增加
            addTitleToSymbol(inspector, editor, data);
        }
    }
    function addTitleToSymbol(inspector, editor, data) {
        var S = hteditor.getString;
        var indent = hteditor.config.indent;
        // 1、数据源设置——类型（SQL，测点）+数据源
        inspector.addTitle('TitleDataSource');

        var items = [];
        items.push(S('Type'));

        items.push({
            id: 'dataSourceType',
            label: '',
            unfocusable: true,
            comboBox: {
                values: ['SQL', 'mpointDataSource', 'API'],
                labels: ['SQL', '测点', '接口'],
                onValueChanged: function () {
                    // alert('Select Value:' + this.getValue());
                    inspector.setPropertyValue("dataSourceParams", null)
                    if (this.getValue() == "API") {

                        inspector.setPropertyValue("chartDataMap", null)
                    }
                    inspector.setPropertyValue("dataSourceType", this.getValue())
                }
            }
        })

        inspector.addRow(items, [indent, 0.1, 40, 20]);
        items = [];
        items.push(S('TitleDataSource'), hteditor.createButton("设置", null, null, function () {
            if (!inspector.getPropertyValue("dataSourceType")) {
                return false;
            }
            // var dataModel = new ht.DataModel();
            var formPane = new ht.widget.FormPane();
            var title = '测点数据源';
            var dialogHeight = 160;
            var buttons = []
            var okHandleCallBack = function () { }
            var dataSourceParams = inspector.getPropertyValue("dataSourceParams") || {}
            var timeRangeType = dataSourceParams["timeRangeType"]
            if (inspector.getPropertyValue("dataSourceType") == "mpointDataSource") {
                formPane.addRow([
                    '测点',
                    {
                        id: "mpointId",
                        textField: {
                            text: dataSourceParams["mpointId"] || '',
                            editable: true
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

                                    // treeView.checkData(data);
                                    // treeView.setFocusData(data);
                                    // treeView.makeVisible(data);
                                    // treeView.setVisibleFunc(function (data) {
                                    //     var text = "厂";
                                    //     if (text) {
                                    //         return data.getName().indexOf(text) >= 0;
                                    //     }
                                    //     return true;
                                    // });

                                    // multiComboBox.element.getElement().onkeyup = function (e) {
                                    //     listView.invalidateModel();
                                    // };
                                    // borderPane.setCenterView(treeView);
                                    // treeView.getLabel = function (data) {
                                    //     return data.a("siteName")
                                    // }
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
                                    listView.setCheckMode(true);
                                    listView.sm().ms(function (e) {
                                        master.setValue(self.getValue());
                                    });
                                    // for (var key in mpointDataBySiteId) {
                                    //     if (mpointDataBySiteId.hasOwnProperty(key)) {
                                    //         var element = mpointDataBySiteId[key];
                                    //         var data = new ht.Data();
                                    //         data._id = key;
                                    //         data.setName(element);
                                    //         data.setTag(key);
                                    //         listView.dm().add(data);
                                    //     }
                                    // }
                                    mpointDataBySiteId.forEach(function (element) {
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
                                    // getSelectedValue: function () {
                                    //     var names = "", ids = "",
                                    //         listView = this._listView;
                                    //     listView.sm().each(function (data) {
                                    //         names += data.getName() + ",";
                                    //         ids += data.getTag() + ",";
                                    //     });
                                    //     if (names !== "") names = names.substr(0, names.length - 1);
                                    //     if (ids !== "") ids = ids.substr(0, ids.length - 1);
                                    //     multiComboBox2.ids = ids
                                    //     return names;

                                    // },
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

                                // selectPointFormPane.addRow([
                                //     '测点',
                                //     {
                                //         id: 'mpointName',
                                //         unfocusable: true,
                                //         comboBox: {
                                //             values: [],
                                //             labels: [],
                                //             onValueChanged: function () {
                                //                 alert('Select Value:' + this.getValue());
                                //             }
                                //         }
                                //     }
                                // ], [60, 0.1]);

                                var selectPointDialog = new ht.widget.Dialog();
                                var buttons = [{
                                    label: S('OK'),
                                    action: function () {

                                        // formPane.getItemById("mpointId").setValue(multiComboBox2.ids)
                                        formPane.setValue("mpointId", multiComboBox2.ids)
                                        selectPointDialog.hide();
                                    }
                                },{
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
                ], [70, 0.1, 100]);

                formPane.addRow([
                    '时间范围',
                    {
                        radioButton: {
                            label: '当天',
                            groupId: 'radioTime',
                            selected: timeRangeType == "day",
                            onClicked: function (e) {
                                timeRangeType = "day"
                            }
                        }
                    },
                    {
                        radioButton: {
                            label: '当周',
                            groupId: 'radioTime',
                            selected: timeRangeType == "week",
                            onClicked: function (e) {
                                timeRangeType = "week"
                            }
                        }
                    },
                    {
                        radioButton: {
                            label: '当月',
                            groupId: 'radioTime',
                            selected: timeRangeType == "month",
                            onClicked: function (e) {
                                timeRangeType = "month"
                            }
                        }
                    },
                    {
                        radioButton: {
                            label: '当季',
                            groupId: 'radioTime',
                            selected: timeRangeType == "season",
                            onClicked: function (e) {
                                timeRangeType = "season"
                            }
                        }
                    },
                    {
                        radioButton: {
                            label: '当年',
                            groupId: 'radioTime',
                            selected: timeRangeType == "year",
                            onClicked: function (e) {
                                timeRangeType = "year"
                            }
                        }
                    }
                ], [70, 0.1, 0.1, 0.1, 0.1, 0.1]);

                okHandleCallBack = function () {
                    dataSourceParams["mpointId"] = formPane.getValue("mpointId")
                    dataSourceParams["timeRangeType"] = timeRangeType
                    inspector.setPropertyValue("dataSourceParams", dataSourceParams);
                    dialog.hide();
                }
            } else if (inspector.getPropertyValue("dataSourceType") == "SQL") {
                title = "SQL数据源"
                dialogHeight = 400
                formPane.addRow([
                    {
                        id: 'sqlStatement',
                        textArea: {
                            value: dataSourceParams["sqlStatement"] || ""
                        }
                    }
                ], [0.1], 0.1);
                buttons = [{
                    label: '预览',
                    action: function () {
                        //调用接口，将SQL运行，将结果渲染在表格中查看
                        // 此时预览最新填入的SQL运行结果
                        var sql = formPane.getValue("sqlStatement");
                        if (!sql) {
                            return
                        }
                        sql = sql.replace(/\$\{(.*?)\}/g, function (word) {
                            var expression = word.slice(2, -1);
                            return looseJsonParse(expression, data);
                        });

                        var dataModel = new ht.DataModel();
                        var tablePane = new ht.widget.TablePane(dataModel);

                        window.axios.post(envApi("/data-analysis/api/dynamic-sql"), {
                            sql: sql
                        }).then(function (result) {
                            var res = result.data || [];
                            var filterFunc = inspector.getPropertyValue("filterFunc")
                            if(filterFunc){
                                filterFunc = looseJsonParse(filterFunc)
                            }
                            
                            if (typeof (filterFunc) == "function") {
                                res = filterFunc(res, data)
                            }

                            var columns = []
                            for (var i = 0; i < res.length; i++) {
                                var data = new ht.Data();
                                if (i == 0) {
                                    for (var key in res[i]) {
                                        if (res[i].hasOwnProperty(key)) {
                                            var element = res[i][key];
                                            columns.push({
                                                name: key,
                                                width: 120,
                                                displayName: key,
                                                accessType: 'attr',
                                                align: 'left'
                                            })
                                        }
                                    }
                                    tablePane.addColumns(columns);
                                }
                                data.a(res[i]);
                                dataModel.add(data);
                            }

                        }).catch(function (err) {
                            messageTip(err);
                        });

                        var tableHeader = tablePane.getTableHeader();

                        tableHeader.setColumnLineColor('#C8C8C8');
                        tableHeader.setInsertColor('#6DCDF3');
                        tableHeader.getLabelFont = function (column) { return 'bold 12px Arial' };

                        var tableView = tablePane.getTableView();
                        tableView.enableToolTip();
                        tableView.setSelectBackground('#6DCDF3');
                        tableView.setRowLineColor('#EDEDED');
                        tableView.setColumnLineVisible(true);
                        tableView.setRowHeight(23);
                        tableView.setAutoHideScrollBar(false);
                        tableView.drawRowBackground = function (g, data, selected, x, y, width, height) {
                            if (selected) {
                                g.fillStyle = '#87A6CB';
                            }
                            else if (tableView.getRowIndex(data) % 2 === 0) {
                                g.fillStyle = '#F1F4F7';
                            }
                            else {
                                g.fillStyle = '#FAFAFA';
                            }
                            g.beginPath();
                            g.rect(x, y, width, height);
                            g.fill();
                        };



                        // tableView.setVisibleFunc(function (data) {
                        //     var nation = data.a('nation'),
                        //         sex = data.a('sex');
                        //     // filter nation 

                        //     return true;
                        // });
                        var previewDialog = new ht.widget.Dialog();
                        var buttons = [ {
                            label: S('OK'),
                            action: function () {
                                previewDialog.hide();
                            }
                        },{
                            label: S('Cancel'),
                            action: function () {
                                 previewDialog.hide();
                            }
                        }]
                        previewDialog.setConfig({
                            title: '预览',
                            draggable: true,
                            width: 400,
                            height: 400,
                            contentPadding: 4,
                            content: tablePane,
                            buttons: buttons,
                            buttonsAlign: 'right'
                        });

                        previewDialog.show();
                    }
                }];
                okHandleCallBack = function () {
                    dataSourceParams["sqlStatement"] = formPane.getValue("sqlStatement");
                    inspector.setPropertyValue("dataSourceParams", dataSourceParams)
                    inspector.setPropertyValue("chartDataMap", null)
                    dialog.hide();
                }
            } else {
                // 接口数据源
                title = "接口数据源"
                dialogHeight = 400
                formPane.addRow([
                    "接口",
                    {
                        id: 'url',
                        textField: {
                            text: dataSourceParams["url"] || ""
                        }
                    }
                ], [60, 0.1]);
                formPane.addRow([
                    {
                        element: "参数",
                        vAlign: 'top'
                    },
                    {
                        id: 'jqueryParameter',
                        vAlign: 'top',
                        textArea: {
                            value: dataSourceParams["jqueryParameter"] || ""
                        }
                    }
                ], [60, 0.1], 0.1);

                buttons = [{
                    label: '预览',
                    action: function () {
                        //调用接口，将结果渲染在表格中查看
                        // 此时预览最新填入的接口运行结果
                        if (!formPane.getValue("url")) {
                            return
                        }

                        var dataModel = new ht.DataModel();
                        var tablePane = new ht.widget.TablePane(dataModel);
                        var params = formPane.getValue("jqueryParameter")
                        if(params){
                            params=looseJsonParse(params, data)||{}
                        }
                        window.axios.get(envApi(formPane.getValue("url")), {
                            params: params
                        }).then(function (result) {
                            var res = result.data.items || [];
                            var filterFunc = inspector.getPropertyValue("filterFunc")
                            if(filterFunc){
                                filterFunc = looseJsonParse(filterFunc)
                            }
                            if (typeof (filterFunc) == "function") {
                                res = filterFunc(res, data)
                            }
                            var columns = []
                            for (var i = 0; i < res.length; i++) {
                                var data = new ht.Data();
                                if (i == 0) {
                                    for (var key in res[i]) {
                                        if (res[i].hasOwnProperty(key)) {
                                            var element = res[i][key];
                                            columns.push({
                                                name: key,
                                                width: 120,
                                                displayName: key,
                                                accessType: 'attr',
                                                align: 'left'
                                            })
                                        }
                                    }
                                    tablePane.addColumns(columns);
                                }
                                data.a(res[i]);
                                dataModel.add(data);
                            }
                        }).catch(function (err) {
                            messageTip(err);
                        });

                        var tableHeader = tablePane.getTableHeader();

                        tableHeader.setColumnLineColor('#C8C8C8');
                        tableHeader.setInsertColor('#6DCDF3');
                        tableHeader.getLabelFont = function (column) { return 'bold 12px Arial' };

                        var tableView = tablePane.getTableView();
                        tableView.enableToolTip();
                        tableView.setSelectBackground('#6DCDF3');
                        tableView.setRowLineColor('#EDEDED');
                        tableView.setColumnLineVisible(true);
                        tableView.setRowHeight(23);
                        tableView.setAutoHideScrollBar(false);
                        tableView.drawRowBackground = function (g, data, selected, x, y, width, height) {
                            if (selected) {
                                g.fillStyle = '#87A6CB';
                            }
                            else if (tableView.getRowIndex(data) % 2 === 0) {
                                g.fillStyle = '#F1F4F7';
                            }
                            else {
                                g.fillStyle = '#FAFAFA';
                            }
                            g.beginPath();
                            g.rect(x, y, width, height);
                            g.fill();
                        };
                        var previewDialog = new ht.widget.Dialog();
                        var buttons = [{
                            label: S('OK'),
                            action: function () {
                                previewDialog.hide();
                            }
                        },{
                            label: S('Cancel'),
                            action: function () {
                                previewDialog.hide();
                            }
                        }]
                        previewDialog.setConfig({
                            title: '预览',
                            draggable: true,
                            width: 400,
                            height: 400,
                            contentPadding: 4,
                            content: tablePane,
                            buttons: buttons,
                            buttonsAlign: 'right'
                        });

                        previewDialog.show();
                    }
                }];
                okHandleCallBack = function () {
                    dataSourceParams["url"] = formPane.getValue("url")
                    dataSourceParams["jqueryParameter"] = formPane.getValue("jqueryParameter")
                    inspector.setPropertyValue("dataSourceParams", dataSourceParams)
                    inspector.setPropertyValue("chartDataMap", null)
                    dialog.hide();
                }
            }
            var dialog = new ht.widget.Dialog();
            buttons.push({
                label: S('OK'),
                action: function () {
                    okHandleCallBack()
                }
            },{
                label: S('Cancel'),
                action: function () {
                    dialog.hide();
                }
            });
            dialog.setConfig({
                title: title,
                draggable: true,
                width: 400,
                height: dialogHeight,
                contentPadding: 4,
                content: formPane,
                buttons: buttons,
                buttonsAlign: 'right'
            });
            dialog.show();
        }));
        inspector.addRow(items, [indent, 0.1, 40, 20]);
        items = [];
        items.push("过滤器", hteditor.createButton("设置", null, null, function () {
            var formPane = new ht.widget.FormPane();
            formPane.addRow([
                {
                    element: S('Func'),
                    vAlign: 'top'
                },
                {
                    id: 'filterFunc',
                    element: new hteditor.CodeEditor({
                        value: hteditor.stringifyFunction(inspector.getPropertyValue("filterFunc")),
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
                    inspector.setPropertyValue("filterFunc", formPane.getValue("filterFunc"))
                    dialog.hide();
                }
            },{
                label: S('Cancel'),
                action: function () {
                    dialog.hide();
                }
            }];
            dialog.setConfig({
                title: "过滤器",
                draggable: true,
                width: 400,
                height: 400,
                contentPadding: 4,
                content: formPane,
                buttons: buttons,
                buttonsAlign: 'right'
            });
            dialog.show();
        }))
        inspector.addRow(items, [indent, 0.1, 40, 20]);

        inspector.addRow(["刷新频率", {
            id: 'refreshFrequency',
            textField: {
                text: ""
            }
        }], [indent, 0.1, 40, 20]);
        inspector.getItemById('refreshFrequency').element.getElement().onkeyup = function (e) {

            var value = inspector.getItemById('refreshFrequency').element.getValue()
            if (!isNaN(Number(value))){
                value = Math.floor(Number(value))||""
            }else{
                value=""
            }
            inspector.getItemById('refreshFrequency').element.setValue(value)
            inspector.setPropertyValue("refreshFrequency", value)

        };

        // 2、图表设置——data（设置数据源与图表的绑定关系）+style（echart的options）
        inspector.addTitle('TitleChart');

        items = [];
        // 设置数据源与图表的绑定关系
        items.push('字段映射', hteditor.createButton("设置", null, null, function () {
            var dataSourceType = inspector.getPropertyValue("dataSourceType");
            if (!dataSourceType || dataSourceType == "mpointDataSource") {
                return false;
            }
            var dataSourceParams = inspector.getPropertyValue("dataSourceParams") || {}
            // var dataModel = new ht.DataModel();
            var formPane = new ht.widget.FormPane();
            var chartDataMap = inspector.getPropertyValue('chartDataMap') || {};
            formPane.addRow([
                'x轴：',
                {
                    unfocusable: true,
                    comboBox: {
                        value: chartDataMap["x"],
                        onValueChanged: function () {
                            chartDataMap["x"] = this.getValue()
                        }
                    }
                }
            ], [60, 0.1]);
            formPane.addRow([
                'y轴：',
                {
                    unfocusable: true,
                    comboBox: {
                        value: chartDataMap["y"],
                        onValueChanged: function () {
                            chartDataMap["y"] = this.getValue()
                        }
                    }
                }
            ], [60, 0.1]);
            formPane.addRow([
                '系列名：',
                {
                    unfocusable: true,
                    comboBox: {
                        value: chartDataMap["s"],
                        onValueChanged: function () {
                            chartDataMap["s"] = this.getValue()
                        }
                    }
                }
            ], [60, 0.1]);
           
            var url = ""; var params = {}; var method = "";
            if (dataSourceType == "API") {
                params = { params: {} }
                url = envApi(dataSourceParams["url"])
                
                params.params = dataSourceParams["jqueryParameter"]
                if(params.params){
                    params.params = looseJsonParse(params.params, data)||{}
                }
                method = "get"
            }
            if (dataSourceType == "SQL") {
                url = envApi("/data-analysis/api/dynamic-sql")
                var sql = dataSourceParams["sqlStatement"]
                if (!sql) {
                    return
                }
                params.sql = sql.replace(/\$\{(.*?)\}/g, function (word) {
                    var expression = word.slice(2, -1);
                    return looseJsonParse(expression, data);
                });
                method = "post"
            }
            if (!url) return
            window.axios[method](url, params).then(function (result) {
                if (dataSourceType == "API") {
                    var res = result.data.items || [];
                }else{
                    var res = result.data || [];
                }
                
                var filterFunc = inspector.getPropertyValue("filterFunc")
                if(filterFunc){
                    filterFunc = looseJsonParse(filterFunc)
                }
                if (typeof (filterFunc) == "function") {
                    res = filterFunc(res, data)
                }

                var columns = []
                for (var key in res[0]) {
                    if (res[0].hasOwnProperty(key)) {
                        var element = res[0][key];
                        columns.push(key)
                    }
                }
                formPane._rows.forEach(function (ele, index) {
                    // if (index != 2) {
                    ele.items[1].element.setValues(columns)
                    // }
                })

                // var multiComboBoxBySerieName = new ht.widget.MultiComboBox();
                // multiComboBoxBySerieName.setEditable(false);
                // multiComboBoxBySerieName.setValue(chartDataMap["s"]);
                // multiComboBoxBySerieName.setDropDownComponent(DropDownListBySerieName);
                // formPane.addRow(['系列名：', multiComboBoxBySerieName], [60, 0.1]);
                var dialog = new ht.widget.Dialog();
                var buttons = [];
                buttons.push({
                    label: S('OK'),
                    action: function () {

                        inspector.setPropertyValue('chartDataMap', chartDataMap);
                        dialog.hide();
                    }
                },{
                    label: S('Cancel'),
                    action: function () {
                        dialog.hide();
                    }
                });
                dialog.setConfig({
                    title: '字段映射',
                    draggable: true,
                    width: 400,
                    height: 200,
                    contentPadding: 4,
                    content: formPane,
                    buttons: buttons,
                    buttonsAlign: 'right'
                });
                dialog.show();
            }).catch(function (err) {
                messageTip(err);
            });
        }));

        inspector.addRow(items, [indent, 0.1, 40, 20]);
        items = [];

        items.push('配置项', hteditor.createButton("设置", null, null, function () {
            if (!inspector.getPropertyValue("dataSourceType")) {
                return false;
            }
            // var dataModel = new ht.DataModel();
            var formPane = new ht.widget.FormPane();
            formPane.addRow([
                {
                    element: "option=",
                    vAlign: 'top'
                },
                {
                    id: 'chart.option',
                    textArea: {
                        value: inspector.getPropertyValue('chart.option') || ""
                    }
                }
            ], [50, 0.1], 0.1);



            var dialog = new ht.widget.Dialog();
            var buttons = [];
            buttons.push({
                label: S('OK'),
                action: function () {
                    inspector.setPropertyValue('chart.option', formPane.getValue("chart.option") || "");
                    dialog.hide();
                }
            }, {
                label: S('Cancel'),
                action: function () {
                    dialog.hide();
                }
            });
            dialog.setConfig({
                title: '配置项',
                draggable: true,
                width: 500,
                height: 400,
                contentPadding: 4,
                content: formPane,
                buttons: buttons,
                buttonsAlign: 'right'
            });
            dialog.show();
        }));
        inspector.addRow(items, [indent, 0.1, 40, 20]);
        inspector.addRow([], [indent, 0.1, 40, 20]);
        inspector.addUpdateHandler(function () {
            var dataSourceType = inspector.getPropertyValue('dataSourceType');
            inspector.getItemById("dataSourceType").element.setValue(dataSourceType)
            var refreshFrequency = inspector.getPropertyValue('refreshFrequency')||"";
            inspector.getItemById("refreshFrequency").element.setValue(refreshFrequency)
        });
    }
    function addPropertiesToSymbol(inspector) {
        var S = hteditor.getString;
        var indent = hteditor.config.indent;

        inspector.addTitle('TitleTest');

        var items = [];
        items.push(S('Type'));
        var textField = new ht.widget.TextField();
        textField.setEditable(false);
        items.push(textField);

        var label = S('Pick');
        var toolTip = null;
        var icon = null;
        var onClicked = function () {
            var dataModel = new ht.DataModel();
            var tree = new ht.widget.TreeView(dataModel);
            for (var i = 0; i < 3; i++) {
                var parent = new ht.Data();
                parent.setName('Type-' + i);
                parent.setIcon('symbols/basic/ht.json');
                dataModel.add(parent);
                for (var j = 0; j < 3; j++) {
                    var child = new ht.Data();
                    child.setName('Type-' + i + '-' + j);
                    child.setParent(parent);
                    dataModel.add(child);
                }
            }
            tree.expandAll();
            dataModel.sm().setSelectionMode('single');

            var formPane = new ht.widget.FormPane();
            formPane.addRow([
                tree
            ], [0.1], 0.1);

            var dialog = new ht.widget.Dialog();
            var buttons = [];
            buttons.push({
                label: S('OK'),
                action: function () {
                    var data = dataModel.sm().ld();
                    var value = data ? data.getName() : undefined;
                    inspector.setPropertyValue('test.type', value);
                    dialog.hide();
                }
            },{
                label: S('Cancel'),
                action: function () {
                    dialog.hide();
                }
            });
            dialog.setConfig({
                title: S('PickType'),
                draggable: true,
                width: 200,
                height: 300,
                contentPadding: 0,
                content: formPane,
                buttons: buttons,
                buttonsAlign: 'right'
            });
            dialog.show();
        };
        var button = hteditor.createButton(label, toolTip, icon, onClicked);
        items.push(button);

        label = null;
        toolTip = 'HT for Web';
        icon = 'symbols/demo/gas/red.json';
        onClicked = function () {
            setTimeout(function () {
                alert('HIGHTOPO is AWESOME!!!');
            }, 20)
        };
        button = hteditor.createButton(label, toolTip, icon, onClicked);
        items.push(button);

        inspector.addRow(items, [indent, 0.1, 40, 20]);

        inspector.addCustomProperty({
            property: 'test.name',
            name: 'Name',
            valueType: 'String'
        });

        inspector.addCustomProperty({
            property: 'test.description',
            name: 'Description',
            valueType: 'Multiline'
        });

        inspector.addUpdateHandler(function () {
            textField.setText(inspector.getPropertyValue('test.type') || '')
        });
    }

})();
























