window.isPracticing = window.location.host.indexOf('hightopo') >= 0;
window.hteditor_config = {
    //color_select: '#FF7733',
    fontList: [
        "UniDreamLED",
        "founderBlack",
        "SimSun",
        "NSimSun",
        "FangSong",
        "KaiTi",
        "FangSong_GB2312",
        "Microsoft YaHei",
        "cursive", "monospace",
        "serif",
        "sans-serif",
        "fantasy",
        "Arial",
        "Arial Black",
        "Arial Narrow",
        "Arial Rounded MT Bold",
        "Bookman Old Style",
        "Bradley Hand ITC",
        "Century",
        "Century Gothic",
        "Comic Sans MS",
        "Courier",
        "Courier New",
        "Georgia",
        "Gentium",
        "Impact",
        "King",
        "Lucida Console",
        "Lalit",
        "Modena",
        "Monotype Corsiva",
        "Papyrus",
        "Tahoma",
        "TeX",
        "Times",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
        "Verona"
    ],
    locale: 'zh',
    locateFileEnabled: !isPracticing,
    componentsVisible: !isPracticing,
    displaysModifiable: !isPracticing,
    symbolsModifiable: !isPracticing,
    componentsModifiable: !isPracticing,
    assetsModifiable: !isPracticing,
    useCodeEditor: false,
    fontPreview: '中文简体 - AaBbGg',
    scenesVisible: false,

    // 为 socket.io 提供路径映射
    // urlPrefix: '2d/',

    // saveSymbolCustomDefaultValue: true,
    // saveCompCustomDefaultValue: true,
    expandedTitles: {
        TitleExtension: false
    },
    subConfigs: [
        'custom/configs/config-points.js',
        'custom/configs/config-valueTypes.js',
        'custom/configs/config-customProperties.js',
        'custom/configs/2d/config-dataBindings.js',
        'custom/configs/2d/config-handleEvent.js',
        'custom/configs/2d/config-connectActions.js',
        'custom/configs/2d/config-inspectorFilter.js',
        'custom/configs/2d/config-onTitleCreating.js',
        'custom/configs/2d/config-onTitleCreated.js',
        'custom/configs/2d/config-onMainToolbarCreated.js',
        'custom/configs/2d/config-onMainMenuCreated.js',
        'custom/configs/2d/config-onRightToolbarCreated.js'
    ],
    // explorerMode: 'accordion',
    libs: [
        'custom/libs/echarts.js',
        // 'vs/loader.js',
        // 'vs/editor/editor.main.nls.js',
        // 'vs/editor/editor.main.js'
    ]
};