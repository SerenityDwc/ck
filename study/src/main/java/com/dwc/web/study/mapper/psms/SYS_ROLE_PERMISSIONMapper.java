package com.dwc.web.study.mapper.psms;

import com.dwc.web.study.model.psms.SYS_ROLE_PERMISSION;

public interface SYS_ROLE_PERMISSIONMapper {
    int deleteByPrimaryKey(String id);

    int insert(SYS_ROLE_PERMISSION record);

    int insertSelective(SYS_ROLE_PERMISSION record);

    SYS_ROLE_PERMISSION selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SYS_ROLE_PERMISSION record);

    int updateByPrimaryKey(SYS_ROLE_PERMISSION record);
}