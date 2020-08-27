export default {
    /**
	 * 登录
	 */
    'uaa_auth_notfound': '用户名错误，请联系管理员',
    'uaa_auth_passwordError': '密码输入错误',
    'uaa_auth_expire': '系统已到期，请与我们联系，邮箱xxxx，电话xxxx',
    'uaa_auth_tenantException': '租户状态异常，请联系管理员',
    'uaa_auth_countOverLimit': '3分钟内登录错误5次,请稍后重试',
    'uaa_auth_validCodeError': '验证码不正确',
    'uaa_auth_deletedOrDisabled': '用户已删除或者禁用',
    'uaa_auth_thisRoleNotAllowLogin': '此用户的角色禁止登录',

    /**
	 * 用户
	 */
    // Domain
    'uaa_user_idNotNull': '用户id不能为空',
    'uaa_user_nameNotBlank': '用户姓名不能为空',
    'uaa_user_telNotBlank': '用户手机号不能为空',
    'uaa_user_emailNotBlank': '用户邮箱不能为空',
    'uaa_user_emailInvalid': '用户邮箱无效',
    'uaa_user_orgIdNotNull': '用户组织不能为空',
    'uaa_user_verNotNull': '用户版本号不能为空',
    'uaa_user_newPasswordMin6Max20': '密码有效长度为6至20个字符',
    // Resource
    'uaa_user_idIsNull': '新建用户不能存在id',
    'uaa_user_telUsed': '该手机号已被使用，请重新输入',
    'uaa_user_emailUsed': '该邮箱已被使用，请重新输入',
    'uaa_user_loginUsed': '用户名已经被使用',
    'uaa_user_userNotFound': '未找到对应用户',
    'uaa_user_idsNotBlank': '用户ids不能为空',
    'uaa_user_imgUrlNotBlank': '用户头像不能为空',
    'uaa_user_newPasswordSame': '新密码与旧密码相同',
    'uaa_user_oldPasswordMistake': '旧密码验证错误',
    'uaa_user_noAuth': '无该用户权限',
    'uaa_user_notDelYourserf': '不能删除自己',
    'uaa_user_notDelTAdmin': '不能删除租户管理员',
    'uaa_user_notEditTAdmin': '不能编辑租户管理员',
    'uaa_user_numLimit': '用户数量已达到购买上限',
    'uaa_user_verifyValidateFailure': '验证码校验失败',

    /**
	 * 角色
	 */
    // Domain
    'uaa_role_idNotNull': '角色id不能为空',
    'uaa_role_orgIdNotNull': '角色组织不能为空',
    'uaa_role_nameNotBlank': '角色名称不能为空',
    'uaa_role_verNotNull': '角色版本号不能为空',
    'uaa_roleuser_roleIdNotNull': '角色id不能为空',
    'uaa_roleDataAuth_roleIdNotNull': '角色数据权限的角色id不能为空',
    'uaa_roleDataAuth_valueNotNull': '角色数据权限的设置值不能为空',
    'uaa_roleOper_roleIdNotNull': '角色操作权限的角色id不能为空',
    'uaa_roleOper_menuIdsNotNull': '角色操作权限的菜单ids不能为空',
    'uaa_roleOper_operIdsNotNull': '角色操作权限的操作ids不能为空',
    // Resource
    'uaa_role_haveId': '新建角色不能存在id',
    'uaa_role_roleNotFound': '未找到对应角色',
    'uaa_role_idsNotBlank': '角色ids不能为空',
    'uaa_roleuser_userIdsInvalid': '用户ids无效',
    'uaa_roleuser_userIdsNotBlank': '用户ids不能为空',
    'uaa_role_processNotFound': '未找到对应区域位置',
    'uaa_role_hasUsers': '该角色下存在用户，无法删除',
    
    /**
	 * 组织
	 */
    // Domain
    'organization_idNotNull': '组织id不能为空',
    'organization_parentIdNotNull': '组织父节点id不能为空',
    'organization_nameIsNotNull': '组织名称不能为空',
    'organization_typeIsNotNull': '组织类型不能为空',
    'organization_tenantIdIsNotNull': '组织租户id不能为空',
    // Resource
    'uaa_organization_notfound': '未找到该组织',
    'uaa_organization_hasUsed': '该组织已经被使用',
    'uaa_organization_typeNotUpdate': '组织类型不允许修改',
    'uaa_organization_failToUpdateType': '所选类型和其上/下级节点冲突',
    'uaa_organization_invalidateType': '不合法的组织类型',
    'uaa_organization_repeatName': '组织名称不能重复',
    'uaa_organization_noAuth': '无该组织权限',
    'uaa_organization_notDelRoot': '不能删除根组织',
    
    /**
	 * 区域位置
	 */
    // Domain
    'uaa_process_idIsNull': '新建区域位置不能存在id',
    'uaa_process_idNotNull': '区域位置id不能为空',
    'uaa_process_parentIdNotNull': '区域位置父节点id不能为空',
    'uaa_process_nameNotNull': '名称不能为空',
    'uaa_process_typeNotNull': '类型不能为空',
    // Resource
    'uaa_process_noAuth': '无该区域位置权限',
    'uaa_process_notfound': '该区域位置不存在',
    'uaa_process_hasUsed': '该区域位置已被使用,不能删除',
    'uaa_process_invalidType': '所选类型无效',
    'uaa_process_rootNotArea': '根结点必须为区域类型',
    'uaa_process_repeatName': '同级别下同名称节点已经存在',
   
    /**
	 * 菜单
	 */
    // Resource
    'uaa_webMenu_noProduct': '未购买任何产品',
    'uaa_webMenu_expiredProduct': '所购产品已经过期',
    'uaa_webMenu_noWebMenuAuth': '尚无任何菜单权限',
    
    /**
	 * uaa数据导入
	 */
    // Resource
    'uaa_import_noAuth': '无本类型数据导入权限',
    'uaa_import_typeInvalid': '数据导入类型无效',
    'uaa_import_templateNotExist': '导入模板不存在',
    'uaa_import_templateDownErr': '导入模板下载失败',
    'uaa_import_fileTypeInvalid': '文件类型无效',
    'uaa_import_validateErr': '数据校验失败',
    'uaa_import_cacheErr': '未找到对应缓存或缓存已超时，请重新校验后导入',
    'uaa_import_importErr': '数据导入失败',
    
    /**
	 * HT
	 */
    // Resource
    'uaa_ht_urlNotSet': '获取HT的SID请求路径未配置',
    'uaa_ht_sidGetFail': '获取HT的SID失败',
    
    /**
     * base
     * 
     */
    'base_file_upload_err':'文件上传失败',
    'base_calendar_save_err':'节假日保存失败',
    /**
	 * 设备台账
	 */
    // Domain
    'equ_equ_idIsNull': '新建设备不能存在id',
    'equ_equ_idNotNull': '设备id不能为空',
    'equ_equ_nameNotBlank': '设备名称不能为空',
    'equ_equ_codeNotBlank': '设备编码不能为空',
    'equ_equ_typeIdNotNull': '设备类型不能为空',
    'equ_equ_orgIdNotNull': '组织不能为空',
    'equ_equ_processIdNotNull': '区域位置不能为空',
    'equ_equ_abcNotNull': '设备ABC分类不能为空',
    'equ_equ_verNotNull': '设备版本号不能为空',
    
    'equ_equType_idIsNull': '新建设备类型不能存在id',
    'equ_equType_idNotNull': '设备类型id不能为空',
    'equ_equType_nameNotBlank': '设备类型名称不能为空',
    'equ_equType_typeNotNull': '设备类型的节点类型不能为空',
    'equ_equType_nameMax20': '设备类型名称不得超过20个字符',
    'equ_equType_parentIdNotNull': '父设备类型不能为空',
    'equ_equType_orgIdNotNull': '组织不能为空',
    'equ_equType_verNotNull': '设备类型版本号不能为空',
    
    'equ_equAttach_idIsNull': '新建原厂附件不能存在id',
    'equ_equAttach_idNotNull': '原厂附件id不能为空',
    'equ_equAttach_equIdNotNull': '所属设备不能为空',
    'equ_equAttach_typeNotNull': '附件类型不能为空',
    
    'equ_equFile_idIsNull': '新建相关资料不能存在 id',
    'equ_equFile_idNotNull': '相关资料id不能为空',
    'equ_equFile_equIdNotNull': '所属设备不能为空',
    'equ_equFile_sizeNotBlank': '文件大小不能为空',
    'equ_equFile_urlNotBlank': '文件路径不能为空',
    
    'equ_equParam_idIsNull': '新建设备参数不能存在id',
    'equ_equParam_idNotNull': '设备参数id不能为空',
    'equ_equParam_equIdNotNull': '所属设备不能为空',

    'equ_maintain_report_id_notNull': '保养报告id不能为空',
    'equ_maintain_report_maintainTaskId_notNull': '保养任务id不能为空',
    'equ_maintain_report_areaId_notNull': '区域位置id不能为空',
    'equ_maintain_report_startDate_notNull': '开始时间不能为空',
    'equ_maintain_report_endDate_notNull': '审核时间不能为空',
    'equ_maintain_report_userId_notNull': '维保人不能为空',
    'equ_maintain_report_maintainPeriod_notNull': '保养周期不能为空',
    'equ_maintain_report_tenantId_notNull': '租户id不能为空',
    // Resource
    'equ_equ_noAuth': '无该设备权限',
    'equ_equ_equNotFound': '该设备不存在',
    'equ_equ_codeHasUsed': '编码已经被使用',
    'equ_equ_procTypeInvalid': '无效的区域位置类型',
    'equ_equ_equTypeInvalid': '无效的设备类型',
    'equ_equ_invalidParseMathod': '无效的解析方法',
    'equ_equ_idHasUsed': '该设备已经被使用',
    'equ_equ_idsNotBlank': '设备ids不能为空',
    'equ_equ_imgUrlNotBlank': '设备图片不能为空',
    'equ_equ_qrExportFailure': '二维码导出失败，请重试',
    'equ_equ_numLimit': '设备数量已达到购买上限',
    'excel_import_validateErr':'数据校验失败',
    'excel_import_err':'设备导入失败',
    
    'equ_equType_noAuth': '无该设备类型权限',
    'equ_equType_typeInvalid': '该设备类型的节点类型无效',
    'equ_equType_equNotFound': '该设备类型不存在',
    'equ_equType_idHasUsed': '该设备类型已经被使用',
    'equ_equType_idEquHasUsed': '该类型已关联设备，不可再添加子类型',
    'equ_equType_idsNotBlank': '设备类型ids不能为空',
    'equ_file_sizeMax10M': '文件大小不能超过10M',
    'equ_file_sizeMax20M': '文件大小不能超过20M',
    'equ_file_uploadFailure': '文件上传失败',
    'equ_file_downloadFailure': '文件下载失败',

    'equ_maintain_report_task_notFound': '保养任务不存在',
    'equ_maintain_report_getError': '查看保养报告失败',
    'equ_maintain_report_alreadyExists': '保养报告已存在',
    'equ_maintain_report_addError': '新增保养报告失败',
    'equ_maintain_report_notFound': '保养报告不存在',
    'equ_maintain_report_updateError': '更新保养报告失败',
    'equ_maintain_report_exportError': '下载保养报告失败',
    'equ_maintain_report_task_undone': '保养任务未完成',
    'equ_file_upload_err':'文件上传失败',
    'equ_datacachekey_is_null_err':'数据缓存key为空',
    'equ_cache_data_is_null_err':'数据缓存为空',
    'equ_primary_key_conflict_err':'主键冲突',
    'equ_data_import_err':'数据导入失败',
    'equ_file_is_not_exist_err':'文件不存在',
    'equ_failed_to_parse_excel_file_err':'excel文件解析失败',
    'equ_clear_cache_data_err':'清空缓存失败',
    'equ_failed_to_parse_template_file_err':'解析模板文件失败',
    'equ_template_path_is_null_err':'模板路径为空',
    'equ_fault_id_null_err':'缺陷id为空',
    'equ_fault_type_null_err':'缺陷类型为空',
    'equ_fault_not_exist_err':'缺陷记录不存在',
    'equ_fault_null_err':'缺陷为空',
    'equ_fault_record_not_exist_err':'缺陷记录不存在',
    'equ_fault_record_process_not_null_err':'缺陷处理结果不能为空',
    'equ_fault_record_not_exist_err':'缺陷记录不存在',
    'equ_file_upload_err':'文件上传失败',
    'equ_maintain_plan_terminate_err':'保养计划终止失败',
    'equ_calendar_param_err':'日历参数格式错误',
    'equ_repaircontrail_id_null_err':'危机记录id为空',
    'equ_repaircontrail_type_null_err':'维修记录类型为空',
    'equ_repair_id_null_err':'维修记录id为空',
    'equ_repair_reocrd_not_exist_err':'维修记录为空',
    'equ_repair_param_null_err':'设备维修参数不能为空',
    'equ_fault_not_exist_err':'缺陷不存在',
    'equ_fault_is_repaired_err':'缺陷不能重复报修',
    'equ_repair_err':'设备报修失败',
    'equ_repair_fill_err':'维修工单填报 失败',
    'equ_apply_userid_no_authorized_err':'申请调试用户id不是区域内的管理员',
    'equ_maintaintask_state_not_executing_err':'任务状态非执行中或者已经逾期',
    'equ_maintaintask_is_adready_apply_debug_err':'该任务已经审核了测试模式',
    'equ_main_task_is_state_err':'保养任务的状态不对，不能审核',
    'equ_main_task_is_not_complete_err':'保养项目没有完成，不能提交审核',
    'equ_main_task_is_submit_audited_err':'已经提交审核，不能再次审核',
    'equ_main_task_is_completed_err':'任务已经完成，不能再次审核',
    'equ_main_task_is_not_submit_audit_err':'任务没有提交审核，不能审核',
    'equ_main_task_audit_user_id_err':'待审核人与审核人不符，请核对',
    /**
	 * 巡检
	 */
    // Domain
    'patrol_patrolTask_executeStatusNotBlank': '执行状态不能为空',
    'patrol_patrolTask_patrolPointCountNotNull': '关联的巡检点数不能为空',
    'patrol_patrolTask_stateNotBlank': '是否被删除不能为空',
    'patrol_patrolPoint_noNotBlank': '编号不能为空',
    'patrol_patrolPoint_updateTimeNotNull': '修改时间不能为空',
    'Patrol_patrolStep_stepNotBlank': '步骤名称不能为空',
    'patrol_patrolStep_resultTypeIsNotNull': '结果类型不能为空',
    'patrol_patrolStep_stateNotNull': '是否被删除不能为空',
    'patrol_patrolTask_taskidNotNull': '巡检计划路线的任务id不可为空',
    'patrol_patrolTask_longitudeNotNull': '计划路线经度不可为空',
    'patrol_patrolTask_latitudeNotNull': '计划路线纬度不可为空',
    'patrol_patrolTaskPoint_patrolTaskIdNotNull': '巡检点的巡检任务id不可为空',
    'patrol_patrolTaskPoint_patrolPointIdNotNull': '巡检点的巡检点id不可为空',
    'patrol_patrolTaskPoint_faultCountNotNull': '步骤报缺数不可为空',
    'patrol_patrolTaskPointStep_patrolTaskIdNotNull': '巡检步骤的巡检任务id不可为空',
    'patrol_patrolTaskPointStep_patrolPointIdNotNull': '巡检步骤的巡检点id不可为空',
    'patrol_patrolTaskPointStep_patrolStepIdNotNull': '巡检步骤的id不可为空',
    'patrol_patrolTaskPointStep_stepNameNotBlank': '巡检步骤名称不可为空',
    'patrol_patrolTaskPointStep_stepResultTypeNotNull': '巡检步骤结果类型不可为空',
    'patrol_patrolActualPath_patrolTaskIdNotNull': '巡检实际轨迹的任务id不可为空',
    'patrol_patrolActualPath_longitudeNotNull': '巡检实际轨迹的经度不可为空',
    'patrol_PointIdIsNotNull': '巡检点id不可为空',
    'patrol_PlanIdIsNotNull': '巡检计划id不为空',
    'patrol_PlanIdIsNull': '巡检计划id不可为空',
    'patrol_PlanNameIsNull': '巡检计划名称不可为空',
    'patrol_PlanTypeIsNull': '巡检计划类型不可为空',
    'patrol_PlanOrgIdIsNull': '巡检计划组织不可为空',
    'patrol_PlanPeriodIsNull': '巡检间隔频率不可为空',
    'patrol_PlanStartIsNull': '巡检开始日期不可为空',
    'patrol_PlanEndIsNull': '巡检结束日期不可为空',
    'patrol_PlanStartTimeIsNull': '巡检开始时间不可为空',
    'patrol_PlanEndTimeIsNull': '巡检结束时间不可为空',
    'patrol_PlanWorkDaysIsNull': '巡检工作日设置不可为空',
    'patrol_PlanRemindAdvanceMoreThanZero': '巡检提前提醒时间需大于零',
    'patrol_PlanRemindAdvanceLessThanSixty': '巡检提前提醒时间需小于60',
    'patrol_PlanCreateDateIsNull': '巡检计划创建日期需为空',
    'patrol_PlanUpdateDateIsNull': '巡检计划修改日期需为空',
    'patrol_PlanReleaseDateIsNull': '巡检计划下达日期需为空',
    'patrol_PlanInterruptDateIsNull': '巡检计划终止日期需为空',
    'patrolplan_is_not_exist_err': '巡检计划不存在',
    'patrolplan_status_is_not_new_can_not_del_err': '巡检状态非新建状态，不能删除',
    'patrol_patrolPoint_del_err': '巡检点已使用,不能删除',

    
    // Resource
    'patrol_patrolTask_idNotNull': '巡检任务id不可为空',
    'patrol_patrolTask_noAuth': '无权限',
    'patrol_patrolTask_failToCreate': '创建失败',
    'patrol_patrolTask_taskIdNotNull': '任务id不可为空',
    'patrol_patrolTask_failToUpdate': '修改失败',
    'patrol_patrolTask_idsNotBlank': '任务id不可为空',
    'patrol_patrolTask_NotFound': '巡检任务已删除或者不存在',
    'patrol_patrolTask_actualPathsFailToAdd': '上传轨迹失败',
    'patrol_patrolPoint_noAuth': '无权限',
    'patrol_patrolPoint_idNotNull': '巡检点id不可为空',
    'patrol_patrolPoint_NotFound': '不存在该巡检点',
    'patrol_patrolPoint_patrolStepNotNull': '巡检步骤不可为空',
    'patrol_patrolPoint_failToCreate': '创建失败',
    'patrol_patrolPoint_failToUpdate': '修改失败',
    'patrol_patrolPoint_failToDelete': '删除失败',
    // DTO
    'patrol_patrolPoint_idIsNull': '巡检点id必须为空',
    'patrol_patrolPoint_idIsNotNull': '巡检点id不可为空',
    'patrol_patrolPoint_patrolPointNameNotBlank': '巡检点名称不可为空',
    'patrol_patrolPoint_orgIdIsNotNull': '巡检点所属组织不可为空',
    'patrol_patrolPoint_descriptionNotBlank': '巡检点描述不可为空',
    'patrol_patrolPoint_relatedProcessNotBlank': '巡检点关联区域位置不可为空',
    
    /**
	 * message
	 */
    // domain
    'message_message_contentNotNull': '消息内容不可为空',
    'message_message_typeNotNull': '消息类型不可为空',
    'message_message_serderIdNotNull': '消息发送者不可为空',
    'message_massage_messageHaveId': '消息id必须为空',
    
    // Resource
    'massage_failToCreate': '消息创建失败',
    'massage_noMessage': '消息列表为空',
    'massage_notFount': '消息不存在',
    'massage_isTheFirstMessage': '当前是第一条消息',
    'massage_isTheLastMessage': '当前是最后一条消息',
    'message_captcha_sendFailure': '验证码获取失败，请稍后重试',
    'message_captcha_invalid': '验证码已失效，请重新获取',
    'message_captcha_incorrect': '验证码错误',
    
    /**
	 * base
	 */
    // domain
    'base_APPHistory_idIsNull': 'id必须为空',
    'base_APPHistory_idIsNotNull': 'id不能为空',
    'base_APPHistory_nameNotBlank': '版本名称不能为空',
    'base_APPHistory_versionNoNotBlank': '版本号不能为空',
    'base_APPHistory_iosAndroidNotBlank': '类型不能为空',
    'base_APPHistory_apkPathNotBlank': '存放路径不能为空',
    'base_APPHistory_typeNotBlank': '类别不能为空',
    'base_concern_userIdNotNull': '关注人id不能为空',
    'base_concern_concernIdNotNull': '关注项id不能为空',
    'base_concern_typeNotNull': '关注类型不能为空',
    'base_concern_timeNotNull': '关注时间不能为空',
    'base_': '',
    
    // resource
    'base_concern_failToCreate': '新增关注失败',
    'base_concern_failToCancle': '取消关注失败',
    'base_file_sizeMax10M': '文件大小不能超过10M',
    'base_file_sizeMax20M': '文件大小不能超过20M',
    'base_file_sizeMax50M': '文件大小不能超过50M',
    'base_file_uploadFailure': '文件上传失败',
    'base_file_downloadFailure': '文件下载失败',
    
    /**
	 * DAX
	 */
    /**
	 * 报警
	 */
    'loong_alarmDefineId_isNotNull': '报警定义ID不可为空',
    'loong_alarmConsition_alreadyExists': '报警条件已经存在',
    'loong_alarmSubscribe_alreadyExists': '报警订阅已经存在',
    'loong_alarmRecord_idsNotNull': '报警记录ID不可为空',
    'loong_alarmSubscribe_idsNotBlank': '报警订阅ID不可为空',
    'loong_alarmSubscribeDTO_defineId_notNull': '报警订阅中的报警定义ID不可为空',
    'loong_alarmSubscribe_Object_NotNull': '订阅对象不可为空',
    'loong_alarmConditionDTO_mpointId_notNull': '报警条件中的测点不可为空',
    'loong_alarmConditionDTO_symbol_notNull': '报警条件中的条件符不可为空',
    'loong_alarmConditionDTO_threshold_notNull': '报警条件中的阈值不可为空',
    'loong_alarmSubscribeDTO_userId_notNull': '报警订阅中的订阅用户不可为空',
    'loong_alarmSubscribeDTO_subscribeMode_notNull': '报警订阅中的订阅方式不可为空',
    'loong_alarmSubscribeDTO_pushFrequency_notNull': '报警订阅中的推送频率不可为空',
    'loong_alarmSubscribeDTO_delayPushTime_notNull': '报警订阅中的延迟推送时间不可为空',
    'loong_defineId_notNull': '报警定义不可为空',
    
    /**
	 * 计算任务
	 */
    'loong_formula_type_isnull': '算法类型不可为空',
    'loong_calcTask_srcMpoint_isnull': '结果存放测点ID不可为空',
    'loong_formula_id_isnull': '公式ID不可为空',
    'loong_calcTask_insert_failed': '计算任务添加失败',
    'loong_calcTask_dependentTask_exist': '存在依赖的计算任务，无法删除',
    
    /**
	 * 曲线
	 */
    'loong_mpoint_idNotNull': '测点ID不可为空',
    'loong_combine_idNotNull': '曲线组合ID不可为空',
    
    /**
	 * 数据录入
	 */
    'loong_datainputForm_idNotNull': '录入表单ID不可为空',
    'loong_datainputForm_mpoint_alreadyExists': '录入表单中测点已存在',
    'loong_datainputForm_formName_alreadyExists': '录入表单名称已存在',
    'loong_mpoint_filenameNotBlank': '错误信息存放文件名称不可为空',
    'loong_record_idNotNull': '数据录入记录ID不可为空',
    
    /**
	 * 测点
	 */
    'loong_mpoint_idsNotBlank': '测点ID组合字符串不可为空',
    'loong_mpoint_isnot_null': '测点不可为空',
    'loong_task_isnot_null': '计算任务不可为空',
    'loong_status_isnot_null': '状态不可为空',
    'loong_mpointid_is_null': '测点ID组合字符串不可为空',
    'loong_type_is_null': '批量保存类型不可为空',
    'loong_mpoint_name_exits': '测点名称已存在',
    'loong_mpoint_point_exits': '测点点位已存在',
     'loong_key_not_null': '数据缓存key不能为空',
    'loong_cache_data_null': '缓存数据为空，不能导入数据，需要重新导入excel文件',
    'loong_mpoint_num_over': '租户下测点数量已满，不能新建测点数据',
    'loong_mpoint_repeat': '数据重复,请核对',
    'loong_screen_not_exist': '原监视画面名称不存在',
    
    // Common
    'loong_unknownError': '未知错误',
    'loong_siteId_notNull': '区域位置不可为空',
    
    // 网关
    'box_org_isnot_exist': '网关分组对应组织不存在',
    'box_boxno_is_exist': '网关编号已存在',
    'box_terminalno_is_null': '网关终端号为空',
    'box_mpoint_create_error': '创建测点失败',
    'box_mpoint_update_error': '更新测点失败',

    // SIM卡
    'box_iccids_notNull': 'ICCID字符串不可为空',
    'box_iccid_notNull': 'ICCID字符串不可为空',
    'box_user_notExist': '租户不存在',
    'box_iccid_alreadyExist': 'ICCID已经存在',
    'box_unknownError': '未知错误',
    'box_filenameNotBlank': '错误文件名称不可为空',
    'box_user_notNull': '租户名称不可为空',
    'box_system_error': '系统错误',
    'box_iccid_notExist': 'ICCID不存在',
    'box_iccid_notSupport': '此账户不支持该ICCID查询',
    'box_parameter_error': '参数错误',
    'box_notSupport': '该卡不支持此接口',
    'box_appid_illegal': '非法的APPID',
    'box_timestamp_error': '时间戳错误',
    'box_date_formatError': '查询日期格式错误',
    'box_ip_unauthorized': 'IP未授权',
    'box_signature_error': '签名错误',
    'box_orders_alreadyExist': '订单已存在',
    'box_product_notExist': '产品不存在',
    'box_msisdn_notExist': 'MSISDN不存在',
    'box_handle_failed': '办理失败',
    'box_processing': '办理中',
    'box_operator_processingFailed': '运营商处理失败',
    'box_operating_notSupport': '不支持该操作',
    'box_boxAlarm_alreadyExists': '报警已存在',
    'box_boxAlarm_notExist': '报警不存在',
    'box_boxAlarm_ids_notNull': 'ID不可为空',
    'box_boxAlarm_alarmObject_notNull': '报警对象不可为空',
    'box_boxAlarm_id_notNull': 'ID不可为空',
    'box_boxAlarm_userId_notNull': '订阅人不可为空',
    'box_boxAlarm_subscribeMode_notNull': '订阅方式不可为空',
    'box_boxAlarm_alarmType_notNull': '报警类型不可为空',
    'box_boxAlarm_threshold_notNull': '阈值不可为空',

    // 数据曲线分析
    'loong_combineName_alreadyExists': '组合名称已存在',

    'loong_index_exits': '指标已存在',

    // 物料类别管理
    'inventory_materielCategoryDTO_id_notNull' : 'ID不可为空',
    'inventory_materielCategoryDTO_orgId_notNull' : '所属组织不可为空',
    'inventory_materielCategoryDTO_categoryName_notNull' : '类别名称不可为空',
    'inventory_materielCategory_categoryName_exist' : '类别名称已存在',
    'inventory_materielCategory_add_err' : '新增物料类别失败',
    'inventory_materielCategory_update_err' : '更新物料类别失败',
    'inventory_materielCategory_id_notFound' : '物料类别不存在',
    'inventory_materielCategory_hava_used' : '物料类别已被使用,不可删除',
    'inventory_materielCategory_delete_err' : '删除物料类别失败',

    // 盘点管理
    'inventory_materielInventoryDTO_id_notNull' : 'ID不可为空',
    'inventory_materielInventoryDTO_orgId_notNull' : '所属组织不可为空',
    'inventory_materielInventoryDTO_warehouseId_notNull' : '盘点仓库不可为空',
    'inventory_materielInventoryDTO_userId_notNull' : '盘点人员不可为空',
    'inventory_materielInventoryDTO_orgName_notNull' : '组织名称不可为空',
    'inventory_materielInventoryDetail_id_notNull' : '盘点明细ID不可为空',
    'inventory_materielInventoryDetail_amount_notNull' : '盘点数量不可为空',
    'inventory_materielInventory_add_err' : '新增盘点失败',
    'inventory_materielInventory_update_err' : '更新盘点失败',
    'inventory_materielInventory_id_notFound' : '盘点单不存在',
    'inventory_materielInventory_delete_err' : '删除盘点失败',
    'inventory_excel_export_err' : '导出失败',
    'inventory_excel_import_err' : '导入失败',
    'inventory_audited_err' : '审核失败',
    'inventory_is_audited' : '已被审核，请勿重复审核',
    'inventory_is_audited_notEdit' : '已被审核，不可修改',

    // 库存调整
    'inventory_storeAdjustmentDTO_id_notNull' : 'ID不可为空',
    'inventory_storeAdjustmentDTO_orgId_notNull' : '所属组织不可为空',
    'inventory_storeAdjustmentDTO_warehouseId_notNull' : '调整仓库不可为空',
    'inventory_storeAdjustmentDTO_userId_notNull' : '操作人员不可为空',
    'inventory_storeAdjustmentDTO_orgName_notNull' : '组织名称不可为空',
    'inventory_storeAdjustmentDetail_id_notNull' : '调整明细ID不可为空',
    'inventory_storeAdjustmentDetail_afterAmount_notNull' : '调整后数量不可为空',
    'inventory_storeAdjustmentMoveDTO_warehouseId_notNull' : '当前仓库不可为空',
    'inventory_storeAdjustmentMoveDTO_materielId_notNull' : '物料ID不可为空',
    'inventory_storeAdjustmentMoveDTO_currentWarehousePositionId_notNull' : '当前库位不可为空',
    'inventory_storeAdjustmentMoveDTO_targetWarehousePositionId_notNull' : '目标库位不可为空',
    'inventory_storeAdjustment_add_err' : '新增库存调整失败',
    'inventory_storeAdjustment_update_err' : '更新库存调整失败',
    'inventory_storeAdjustment_id_notFound' : '库存调整单不存在',
    'inventory_storeAdjustment_delete_err' : '删除库存调整失败',
    'inventory_storeAdjustment_move_err' : '库存物料移库失败',

    // 调拨管理
    'inventory_transferDTO_id_notNull' : 'ID不可为空',
    'inventory_transferDTO_orgId_notNull' : '所属组织不可为空',
    'inventory_transferDTO_userId_notNull' : '创建人员',
    'inventory_transferDTO_warehouseOutId_notNull' : '出库仓库不可为空',
    'inventory_transferDTO_warehouseInId_notNull' : '入库仓库不可为空',
    'inventory_transferDTO_orgName_notNull' : '组织名称不可为空',
    'inventory_transferDetail_id_notNull' : '调拨明细ID不可为空',
    'inventory_transferDetail_materielId_notNull' : '物料ID不可为空',
    'inventory_transferDetail_warehousePositionOutId_notNull' : '出库库位不可为空',
    'inventory_transferDetail_warehousePositionInId_notNull' : '入库库位不可为空',
    'inventory_transferDetail_amount_notNull' : '调拨数量不可为空',
    'inventory_transfer_add_err' : '新增调拨失败',
    'inventory_transfer_update_err' : '更新调拨失败',
    'inventory_transfer_id_notFound' : '调拨单不存在',
    'inventory_transfer_delete_err' : '删除调拨失败',

    // 物料管理
    'inventory_materiel_id_notFound':'物料没有找到',
    'inventory_materiel_update_err':'物料更新错误',
    'inventory_materiel_idsNotBlank':'物料编号不能为空',
    'inventory_materiel_save_err':'物料信息保存失败',
    'inventory_materiel_excel_export_err':'物料信息失败',
    'inventory_materielDTO_NOT_NULl':'物料对象信息不能为空',
    'inventory_materiel_is_in_storage_can_not_delete_err':'物料信息删除失败,物料信息已经入库不能删除',
    'inventory_materiel_delete_err':'物料信息删除失败',
    'inventory_materiel_save_err':'物料信息保存失败',
    'inventory_query_materiel_by_warehouse_no':'查询物料信息失败',
    'inventory_materielInventory_delete_err':'物料信息删除失败',
    'inventory_materiel_excel_import_err':'物料信息导入失败',
    'inventory_excel_datacache_clear_err':'清空缓存失败',
    'excel_file_sizeMax20M':'文件不能超过20M',
    'file_exten_name_err':'文件扩展名不正确',
    'inventory_excel_import_err':'excel导入错误',
    'inventory_excel_cache_key_null':'缓存key不存在',
    'inventory_excel_import_primarykey_err':'数据导入主键冲突',
    'inventory_excel_import_err':'物料信息导入失败',
    'inventory_excel_import_cancel_err': '物料缓存数据清空失败',
    'inventory_excel_temlate_down_err':'物料信息导入模板下载失败',

    // 入库单
    'inventory_inbound_NotFound':'入库没有查询到',
    'inventory_audite_inbound_err':'入库单审核失败',
    'inventory_inbound_idsNotBlank':'入库单id不能为空',
    'inventory_inbound_not_exist_err':'入库单不存在',
    'inventory_inbound_is_audited_can_not_delete_err':'入库单已经审核不能删除',
    'inventory_inboundDTO_not_null':'入库单保存对象不能为空',
    'inventory_inbound_save_err':'入库单保存失败',
    'inventory_inbound_not_exist':'入库单不存在',
    'inventory_inbound_is_audited_can_not_update_err':'入库单已经审核，不能删除',
    'inventory_inbound_upate_err':'入库单更新失败',
    'inventory_inbound_is_audited_can_not_audite_err':'入库单已经审核，不能再审核',
    'inventory_inbound_detail_is_null_err")':'入库单详情为空',
    'inventory_audite_inbound_err':'入库单审核失败',
    'inventory_query_inboundDetails_err':'入库单查询详情失败',
    'inventory_query_inboundDetails_count_err':'入库单查询详情失败',
    'inventory_query_inbound_count_err':'入库单查询详情失败',
    'inventory_inboundBodyDetails_is_null_err':'入库明细数据不存在',
    'inventory_inboundBodyDetails_is_null_err':'入库单明不存在',
    'inventory_inbound_is_audited_err':'入库单已经审核，不能再审核',

    // 出库单
    'inventory_query_outbound_head_err':'查询入库单表头信息失败',
    'inventory_query_outbound_detail_err':'出库单明细查询失败',
    'inventory_audite_outbound_err':'出库单审核失败',
    'inventory_outbound_idsNotBlank':'出库单id不能为空',
    'inventory_outbound_is_audited_can_not_delete_err':'出库单已经审核，不能再审核',
    'inventory_outbound_save_err':'出库单保存失败',
    'inventory_outbounddetail_is_null_err':'出库单明细数据为空',
    'inventory_outbounddetail_is_not_null_exist_err':'出库单详情数据不存在',
    'inventory_outbounddetail_is_audited_err':'出库已经审核，不能再修改',
    'inventory_outbounddetail_update_err':'出库单更新失败',
    'inventory_outbound_is_not_exist_err':'出库单不存在',
    'inventory_outbound_is_audited_err':'出库单已经审核',
    'inventory_outsbound_detail_is_null_err':'出库单明细为空',
    'inventory_audite_outbound_err':'出库单审核失败',
    'inventory_outbound_not_exist_err':'出库单不存在',
    'inventory_query_outbound_head_err':'出库单查询失败',

    // 库存上下限
    'inventory_materiel_stock_limit_NotFound':'库存上下限没找到',
    'inventory_materiel_stockLimits_ids_NotBlank':'参数id不能为空',
    'inventory_materiel_stockLimit_update_err':'库存上限更新失败',
    'inventory_warehouseList_query_detail_err':'仓库明细查询失败',
    'inventory_query_warehouse_info_err':'仓库库存信息查询失败',
    'inventory_query_warehouse_list_err':'仓库下拉框查询失败',
    'inventory_warehouse_ids_not_null':'仓库id不能为空',
    'inventory_warehouse_excel_export_err':'仓库信息导出事变',
    'inventory_warehouseList_find_err':'仓库信息列表查询失败',
    'inventory_warehouseList_query_detail_err':'仓库信息查询失败',
    'inventory_warehouseInfo_save_err':'仓库信息保存失败',
    'inventory_warehouseInfo_update_err':'仓库信息更新失败',
    'inventory_warehouse_is_used_can_not_delete_err':'仓库信息已被使用，不能删除',
    'inventory_warehouse_excel_export_err':'仓库信息导出失败',
    'inventory_query_warehouse_list_err':'仓库下拉信息列表失败',
    'inventory_is_audited_notDelete' : '已审核完成，不可删除',
    'inventory_materiel_stocklimit_batch_save_err':'批量保存物料库存上下限失败',
    'inventory_warehouseposition_batch_save_err':'批量保存仓库库位信息失败',
    'inventory_file_upload_err':'文件上传失败',
    'inventory_cache_data_is_null_err':'数据缓存为空，请重新导入excel文件',
    'inventory_failed_to_parse_template_file_err':'读取到模板文件失败',
    'inventory_data_cache_key_null_err':'数据缓存key不能为空',
    'inventory_template_path_null_err':'文档路径为空',
    'inventory_no_orgId_auth_err':'没有该组织的权限',
    'inventory_stock_info_excel_export_err':'库存信息导出失败',
    'inventory_stock_inoutbound_excel_export_err':'进销存报表导出失败',
    'inventory_stock_mobility_report_excel_export_err':'库存移动报表导出失败',
    'inventory_materielInventory_excel_export_err':'盘点盈亏报表导出失败',
    'inventory_materiel_stocklimit_duplicateKey_err':'主键冲突',
    'inventorywarehouseposition_duplicateKey_err':'库位重复',
    'inventory_warehouse_postion_is_used_err':'库位已经使用，不能删除',
     //测试模式
     'test_pattern_the_other_test_pattern_is_unfinished_err': '有其他测试模式还未结束',
     'test_pattern_save_err':'测试模式申请失败',
     'query_is_in_test_pattern_err':'查询是否在测试模式中失败',
     'the_other_test_pattern_is_unfinished_err':'当前有其他测试模式没有结束，不能新建测试模式',
     'test_pattern_save_err':'测试模式保存失败',
     'test_pattern_is_not_exist':'测试模式失败',
     'test_pattern_close_err':'测试模式关闭失败',
     'maintain_task_not_exist_err':'保养任务不存在',
     'no_in_test_pattern_err':'当前不在测试模式中，不能申请',
     'apply_test_pattern_err':'申请测试模式失败',
     'maintain_task_audit_err':'任务审核失败',
     'maintain_task_withdrawal_err':'任务撤回失败',
     'query_test_pattern_err':'查测试模式失败',
     'test_pattern_is_not_exist_err':'测试模式不存在',
     'test_pattern_is_aready_opened_err':'测试模式已经开通',

     //管理体系
     'fileAttachExsist':'目录下有文件无法删除!',
}
