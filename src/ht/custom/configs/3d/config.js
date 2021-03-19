window.hteditor_config = {
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
    promptBeforeClosing: true,
    indent: 110,
    imageSize: 400,
    useCodeEditor: false,

    // 为 socket.io 提供路径映射
    // urlPrefix: '2d/',

    // 配置编辑器扩展，运行于 client.js 加载前
    subConfigs: [
        'custom/configs/config-points.js',
        'custom/configs/config-valueTypes.js',
        'custom/configs/config-customProperties.js',
        'custom/configs/3d/config-dataBindings.js',
        'custom/configs/3d/config-handleEvent.js',
        'custom/configs/3d/config-onEditor3dCreated.js',
        'custom/configs/3d/config-onTitleCreated.js'
    ],

    // 配置运行时依赖类库，运行于 client.js 加载后，
    // 一般放置需要与运行时共享的通用类库
    libs: [
        'custom/libs/gaolu-modeling.js',
        'custom/libs/gaolu-dialog.js'
        // 'vs/loader.js',
        // 'vs/editor/editor.main.nls.js',
        // 'vs/editor/editor.main.js'
    ]
};
