(function () {

    var isHandling = false;
    var currentUnderControl = {};
    window.hteditor_config.onTitleCreated = function (editor, params) {
        // console.log(params)
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
        if (inspector.type === 'scene' && title === '场景') {
            addPropertiesToScene(inspector);
        }
        if (inspector.type === 'data' && title === '基础') {
            if (!inspector.getItemById("underControlSwitch")) {
                // 说明已经初始化过
                var underControl = inspector.getPropertyValue('underControl');
                currentUnderControl = underControl;
                addPropertiesToSymbol(inspector, editor, underControl)
            }
        }
    }
    function addPropertiesToScene(inspector){
        var S = hteditor.getString;
        var indent = hteditor.config.indent;
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
            var isReceivingAlarm = inspector.getPropertyValue('isReceivingAlarm')
            inspector.getItemById("isReceivingAlarm").element.setSelected(isReceivingAlarm)

            var hasAlarmSound = inspector.getPropertyValue('hasAlarmSound')
            inspector.getItemById("hasAlarmSound").element.setSelected(hasAlarmSound)

        });
    }
    function addPropertiesToSymbol(inspector, editor, underControl) {
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
    window.hteditor_config.onInspectorCreated = function (editor, params) {
        var inspector = params.inspector;
        if (inspector.type === 'scene') {
            var items = [];
            inspector.addLabelInput(items, '背景图',
                hteditor.getter('a', "background.url"),
                hteditor.setter('a', 'background.url'))
            inspector.addDBRow(items, 'a', 'background.url');
            return;
        }
        addCustomPropertiesToData(inspector);
    };

    function addCustomPropertiesToData(inspector) {
        // 国际化转换函数，可在 instance/custom/locales 目录下的国际化文件中配置相关属性映射
        var S = hteditor.getString;
        var indent = hteditor.config.indent;

        inspector.addTitle(S('Custom'));

        var items = [];

        /**
         * hteditor.getter(accessType, key) 生成 get 自定义属性方法
         *     accessType: 'a' -> attr | 's' -> style | 'p' -> property
         *            key: 用户自定义的属性名称
         *
         * hteditor.setter(accessType, key) 生成 set 自定义属性方法
         *     accessType: 'a' -> attr | 's' -> style | 'p' -> property
         *            key: 用户自定义的属性名称
         */
        inspector.addLabelCheckBox(
            items, '2d可见',
            hteditor.getter('s', "2d.visible"),
            hteditor.setter('s', '2d.visible')
        );
        inspector.addDBRow(items, 's', '2d.visible');
        items = []
        inspector.addLabelCheckBox(
            items, '3d可见',
            hteditor.getter('s', "3d.visible"),
            hteditor.setter('s', '3d.visible')
        );
        inspector.addDBRow(items, 's', '3d.visible');
        items = []
        inspector.addLabelRange(
            items, '透明度',
            hteditor.getter('s', "shape3d.opacity"),
            hteditor.setter('s', 'shape3d.opacity'), 0, 1, 0.01, 'number'
        );
        inspector.addDBRow(items, 's', 'shape3d.opacity');
        // items = []
        // inspector.addLabelColor(
        //     items, '颜色',
        //     hteditor.getter('s', "shape3d.color"),
        //     hteditor.setter('s', 'shape3d.color')
        // );
        // inspector.addDBRow(items, 's', 'shape3d.color');
        items = []
        inspector.addLabelColor(
            items, '染色',
            hteditor.getter('s', "shape3d.blend"),
            hteditor.setter('s', 'shape3d.blend')
        );
        inspector.addDBRow(items, 's', 'shape3d.blend');
        items = []
        inspector.addLabelRotation(
            items, '绕x轴旋转',
            hteditor.getter('p', "rotationX"),
            hteditor.setter('p', 'rotationX')
        );
        inspector.addDBRow(items, 'p', 'rotationX');
        items = []
        inspector.addLabelRotation(
            items, '绕y轴旋转',
            hteditor.getter('p', "rotation"),
            hteditor.setter('p', 'rotation')
        );
        inspector.addDBRow(items, 'p', 'rotation');
        items = []
        inspector.addLabelRotation(
            items, '绕z轴旋转',
            hteditor.getter('p', "rotationZ"),
            hteditor.setter('p', 'rotationZ')
        );
        inspector.addDBRow(items, 'p', 'rotation');
        items = []
        inspector.addLabelRange(items, '长',
            hteditor.getter('p', "width"),
            hteditor.setter('p', 'width'),
            0, void 0, void 0, "int")
        inspector.addDBRow(items, 'p', 'width');
        items = [];
        inspector.addLabelRange(items, '高',
            hteditor.getter('p', "tall"),
            hteditor.setter('p', 'tall'),
            0, void 0, void 0, "int")
        inspector.addDBRow(items, 'p', 'tall');
        items = [];
        inspector.addLabelRange(items, '宽',
            hteditor.getter('p', "height"),
            hteditor.setter('p', 'height'),
            0, void 0, void 0, "int")
        inspector.addDBRow(items, 'p', 'height');
        items = [];
        inspector.addLabelRange(items, '最大值',
            hteditor.getter('a', "maxValue"),
            hteditor.setter('a', 'maxValue'),
            0, void 0, void 0, "int")
        inspector.addDBRow(items, 'a', 'maxValue');

        items = [];
        inspector.addLabelFunction(items, '动画函数',
            hteditor.getter('a', "animate.func"),
            hteditor.setter('a', 'animate.func'))
        inspector.addDBRow(items, 'a', 'animate.func');

        items = [];
        inspector.addLabelInput(items, '动画开关',
            hteditor.getter('a', "animate.running"),
            hteditor.setter('a', 'animate.running'))
        inspector.addDBRow(items, 'a', 'animate.running');

        items = [];
        inspector.addLabelFunction(items, '点击函数',
            hteditor.getter('a', "click.func"),
            hteditor.setter('a', 'click.func'))
        inspector.addDBRow(items, 'a', 'click.func');
    }
})();