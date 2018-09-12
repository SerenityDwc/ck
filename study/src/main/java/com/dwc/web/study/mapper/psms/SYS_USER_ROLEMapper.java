package com.dwc.web.study.mapper.psms;

import com.dwc.web.study.model.psms.SYS_USER_ROLE;

public interface SYS_USER_ROLEMapper {
    int deleteByPrimaryKey(String id);

    int insert(SYS_USER_ROLE record);

    int insertSelective(SYS_USER_ROLE record);

    SYS_USER_ROLE selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SYS_USER_ROLE record);

    int updateByPrimaryKey(SYS_USER_ROLE record);
}