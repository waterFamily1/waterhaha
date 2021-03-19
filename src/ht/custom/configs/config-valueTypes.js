(function () {
    var createColorIcon = function (color) {
        return {
            width: 20,
            height: 14,
            comps: [
                {
                    type: 'rect',
                    rect: [1, 1, 18, 12],
                    background: color
                }
            ]
        };
    };
    window.hteditor_config.valueTypes = {
        CustomType: createPointsValueType(),
        FlowDirection: {
            type: 'enum',
            values: [1, -1],
            i18nLabels: [
                'R_L',
                'L_R'
            ]
        },
        AlarmSeverity: {
            type: 'enum',
            values: [500, 400, 300, 200, 100, 0],
            i18nLabels: [
                'AlarmSeverityCritical',
                'AlarmSeverityMajor',
                'AlarmSeverityMinor',
                'AlarmSeverityWarning',
                'AlarmSeverityIndeterminate',
                'AlarmSeverityCleared'
            ],
            icons: [
                createColorIcon('#FF0000'),
                createColorIcon('#FFA000'),
                createColorIcon('#FFFF00'),
                createColorIcon('#00FFFF'),
                createColorIcon('#C800FF'),
                createColorIcon('#00FF00')
            ]
        },
        PVState: {
            type: 'enum',
            values: ['#323450', '#454668', '#FF6A01', '#FF2D0D'],
            i18nLabels: ['PV_state_0', 'PV_state_1', 'PV_state_2', 'PV_state_3'],
            icons: [
                createColorIcon('#323450'),
                createColorIcon('#454668'),
                createColorIcon('#FF6A01'),
                createColorIcon('#FF2D0D')
            ]
        },
        PVHLXState: {
            type: 'enum',
            values: ['#6F7082', '#76E33E', '#FF6A01', '#FF2D0D'],
            i18nLabels: ['PV_hlx_state_0', 'PV_hlx_state_1', 'PV_hlx_state_2', 'PV_hlx_state_3'],
            icons: [
                createColorIcon('#6F7082'),
                createColorIcon('#76E33E'),
                createColorIcon('#FF6A01'),
                createColorIcon('#FF2D0D')
            ]
        },
        Fullscreen: {
            type: 'enum',
            values: [undefined, 'fill', 'uniform']
        },
        theme: {
            type: 'enum',
            values: ["light", "dark"],
            i18nLabels: [
                '亮色',
                '暗色'
            ]
        },
        dateType: {
            type: 'enum',
            values: ["date", "year", "month", "time", "datetime"],
            i18nLabels: [
                '日期选择器',
                '年选择器',
                '年月选择器',
                '时间选择器',
                '日期时间选择器'
            ]
        },
        // Points: {
        //     type: 'button',
        //     input: true,
        //     readyonly: false,
        //     label: '...' // 按钮文本内容
        //     action: function(inspector) {} // 点击动作
        // }
    };
})();
