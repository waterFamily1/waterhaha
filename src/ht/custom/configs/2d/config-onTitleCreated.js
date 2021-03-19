(function () {

    var isHandling = false;
    var currentUnderControl = {};
    window.hteditor_config.onTitleCreated = function (editor, params) {
        if (!isHandling) {
            isHandling = true;
            handleTitleCreated(editor, params);
            isHandling = false;
        }
    };

    function handleTitleCreated(editor, params) {
        var title = params.title;
        var oldTitle = params.oldTitle;
        var inspector = params.inspector;
        if (inspector.type === 'display' && title === 'TitleBasic') {
            addPropertiesToDisplay(inspector);
        }
        // console.log(inspector.type)
        if (inspector.type === 'data' && title === 'TitleBasic') {

            // 获取选中的图元 getSelectionModel=>sm
            var datas = editor.dm.sm();
            var data = {};
            datas.each(function (item, index) {
                if (index == 0) {
                    data = item;
                }
            })
            addPropertiesToSymbol(inspector, editor, data);
        }
    }
    function addPropertiesToSymbol(inspector, editor, data) {
        var underControl = data.a("underControl") || {};
        var S = hteditor.getString;
        var indent = hteditor.config.indent;
        var items = [];
        var label = '远程控制';
        var toolTip = '设置远程控制';
        var icon = null;
        var onClicked = function () {
            var dialog = createDialogBySymbol(inspector, editor);
            dialog.show();
        };
        var button = hteditor.createButton(label, toolTip, icon, onClicked);
        items.push('远程控制');
        items.push(button);
        items.push({
            id: 'underControlSwitch',
            checkBox: {
                selected: underControl ? !!underControl.openUnderControl : false,
                onValueChanged: function onValueChanged() {
                    var _self = this;
                    editor.dm.getSelectionModel().each(function (item, index) {
                        if (item.a("underControl")) {
                            item.a("underControl").openUnderControl = _self.getValue()
                        } else {
                            item.a("underControl", {
                                openUnderControl: _self.getValue()
                            })
                        }
                    })
                }
            }
        });
        inspector.addRow(items, [indent, 0.1, 20]);
        inspector.addUpdateHandler(function () {
            var underControl = inspector.getPropertyValue('underControl');
            currentUnderControl = underControl;
            inspector.getItemById("underControlSwitch").element.setSelected(underControl ? !!underControl.openUnderControl : false)
        });
    }

    function createDialogBySymbol(inspector, editor) {
        var formPane = new ht.widget.FormPane();
        var underControl = currentUnderControl || {};
        var type = underControl.type || 0,
            pointId = underControl.pointId || '',
            pointName = underControl.pointName || '',
            pointUnit = underControl.pointUnit || '',
            status = underControl.status || '',
            statusText = underControl.statusText || '',
            openUnderControl = underControl.openUnderControl || false;

        var underControl = {
            type: type || 0,
            pointId: editor.points.list.sm().isEmpty() ? pointId : editor.points.list.sm().ld().a('id'),
            pointName: editor.points.list.sm().isEmpty() ? pointName : editor.points.list.sm().ld().a('name'),
            pointUnit: editor.points.list.sm().isEmpty() ? pointUnit : editor.points.list.sm().ld().a('unit'),
            status: status,
            statusText: statusText,
            openUnderControl: openUnderControl
        };
        var editable = false;
        if (underControl.type == 1) {
            // 模拟值
            editable = true
        }
        formPane.addRow([
            '测点名称:',
            {
                id: 'pointName',
                textField: {
                    text: underControl.pointName
                }
            }
        ],
            [60, 0.1]);
        formPane.addRow([
            '测点ID:',
            {
                id: 'pointId',
                textField: {
                    text: underControl.pointId
                }
            }
        ],
            [60, 0.1]);
        formPane.addRow([
            '单位:',
            {
                id: 'pointUnit',
                textField: {
                    text: underControl.pointUnit
                }
            }
        ],
            [60, 0.1]);
        formPane.addRow([
            {
                radioButton: {
                    label: '数值',
                    selected: underControl.type == 0 ? true : false,
                    // icon: 'node_icon',
                    // iconColor: '#FF0000',
                    groupId: 'alarm',
                    onClicked: function (e) {
                        underControl.type = 0;
                        formPane.v("status", '')
                        formPane.v("statusText", '')
                        formPane.getItemById("status").element.setEditable(false)
                        formPane.getItemById("statusText").element.setEditable(false)
                    }
                }
            },
            {
                radioButton: {
                    label: '状态',
                    selected: underControl.type == 1 ? true : false,
                    // icon: 'node_icon',
                    // iconColor: '#FFA000',
                    groupId: 'alarm',
                    onClicked: function (e) {
                        underControl.type = 1;
                        formPane.getItemById("status").element.setEditable(true)
                        formPane.getItemById("statusText").element.setEditable(true)
                    }
                }
            }
        ],
            [0.1, 0.1]);

        formPane.addRow([
            '状态值:',
            {
                id: 'status',
                textField: {
                    text: underControl.status
                }
            },
            '状态描述:',
            {
                id: 'statusText',
                textField: {
                    text: underControl.statusText
                }
            }
        ],
            [60, 0.1, 60, 0.1]);

        formPane.getItemById("status").element.setEditable(editable)
        formPane.getItemById("statusText").element.setEditable(editable)
        var dialog = new ht.widget.Dialog();
        var buttons = [];
        buttons.push({
            label: '确定',
            action: function () {
                underControl.pointName = formPane.v("pointName")
                underControl.pointId = formPane.v("pointId")
                underControl.pointUnit = formPane.v("pointUnit")
                underControl.status = formPane.v("status")
                underControl.statusText = formPane.v("statusText")
                inspector.setPropertyValue('underControl', underControl);
                dialog.hide();
            }
        });
        buttons.push({
            label: '取消',
            action: function () {
                dialog.hide();
            }
        });
        dialog.setConfig({
            title: '设置远程控制',
            closable: true,
            draggable: true,
            width: 300,
            height: 200,
            contentPadding: 6,
            resizeMode: "wh",
            maximizable: true,
            content: formPane,
            buttons: buttons,
            buttonsAlign: 'right'
        });
        return dialog;
    }
    function addPropertiesToDisplay(inspector) {
        var S = hteditor.getString;
        var indent = hteditor.config.indent;

        var dialog = createDialog(inspector);

        var items = [];
        var label = '定时器';
        var toolTip = '设置定时器';
        var icon = null;
        var onClicked = function () {
            updateTimers(inspector, dialog);
            dialog.show();
        };
        var button = hteditor.createButton(label, toolTip, icon, onClicked);
        items.push('定时器');
        items.push(button);
        inspector.addRow(items, [indent, 0.1]);

        inspector.addRow([
            '图纸移动',
            {
                id: 'isMovedByDisplay',
                checkBox: {
                    selected: inspector.getPropertyValue('isMovedByDisplay') ? true : false,
                    onValueChanged: function () {
                        inspector.setPropertyValue('isMovedByDisplay', this.getValue());
                    }
                }
            }
        ], [indent, 0.1]);
        inspector.addRow([
            '接收报警',
            {
                id: 'isReceivingAlarm',
                checkBox: {
                    selected: inspector.getPropertyValue('isReceivingAlarm') ? true : false,
                    onValueChanged: function () {
                        var value = this.getValue()
                        inspector.setPropertyValue('isReceivingAlarm', value);
                        if (!Boolean(value)) {
                            inspector.setPropertyValue('hasAlarmSound', false);
                        }
                        inspector.getItemById("hasAlarmSound").element.setDisabled(!Boolean(value))
                    }
                }
            }
        ], [indent, 0.1]);
        
        inspector.addRow([
            '报警音效',
            {
                id: 'hasAlarmSound',
                checkBox: {
                    disabled: true,
                    selected: inspector.getPropertyValue('hasAlarmSound') ? true : false,
                    onValueChanged: function () {
                        inspector.setPropertyValue('hasAlarmSound', this.getValue());
                    }
                }
            }
        ], [indent, 0.1]);
        inspector.addUpdateHandler(function () {
            var isMovedByDisplay = inspector.getPropertyValue('isMovedByDisplay')
            inspector.getItemById("isMovedByDisplay").element.setSelected(isMovedByDisplay)

            var isReceivingAlarm = inspector.getPropertyValue('isReceivingAlarm')
            inspector.getItemById("isReceivingAlarm").element.setSelected(isReceivingAlarm)
            
            var hasAlarmSound = inspector.getPropertyValue('hasAlarmSound')
            inspector.getItemById("hasAlarmSound").element.setSelected(hasAlarmSound)
            
        });
    }

    function updateTimers(inspector, dialog) {
        var timers = inspector.getPropertyValue('timers');
        dialog.tableModel.clear();
        if (timers) {
            timers.forEach(function (timer) {
                var data = new ht.Data();
                data.a('func', timer.func);
                data.a('interval', timer.interval);
                dialog.tableModel.add(data);
            });
        }
    }

    function commitTimers(inspector, dialog) {
        var timers = [];
        dialog.tableModel.each(function (data) {
            timers.push({
                func: data.a('func'),
                interval: data.a('interval')
            });
        });
        inspector.setPropertyValue('timers', timers);
    }

    function createDialog(inspector) {
        var tableModel = new ht.DataModel();
        var tablePane = new ht.widget.TablePane(tableModel);
        var tableView = this.tableView = tablePane.getTableView();
        tableView.setEditable(true);
        tablePane.getView().style.border = hteditor_config.color_line + ' solid 1px';
        tablePane.addColumns([
            {
                name: 'func',
                accessType: 'attr',
                width: 200,
                displayName: '函数名称',
                editable: true
            },
            {
                name: 'interval',
                accessType: 'attr',
                valueType: 'int',
                width: 140,
                displayName: '周期（单位：毫秒）',
                editable: true
            }
        ]);

        var formPane = new ht.widget.FormPane();

        formPane.addRow([
            {
                button: {
                    label: '添加',
                    onClicked: function () {
                        var data = new ht.Data();
                        data.a('func', 'action');
                        data.a('interval', 500);
                        tableModel.add(data);
                    }
                }
            },
            {
                button: {
                    label: '删除',
                    onClicked: function () {
                        tableView.removeSelection();
                    }
                }
            }
        ],
            [40, 40]);

        formPane.addRow([tablePane], [0.1], 0.1)
        var dialog = new ht.widget.Dialog();
        var buttons = [];
        buttons.push({
            label: '确定',
            action: function () {
                commitTimers(inspector, dialog);
                dialog.hide();
            }
        });
        buttons.push({
            label: '取消',
            action: function () {
                dialog.hide();
            }
        });
        dialog.setConfig({
            title: '设置定时器',
            closable: true,
            draggable: true,
            width: 400,
            height: 300,
            contentPadding: 6,
            resizeMode: "wh",
            maximizable: true,
            content: formPane,
            buttons: buttons,
            buttonsAlign: 'right'
        });

        dialog.tableModel = tableModel;
        return dialog;
    }
})();