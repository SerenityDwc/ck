package com.dwc.web.study.mapper.psms;

import com.dwc.web.study.model.psms.SYS_ROLES;

public interface SYS_ROLESMapper {
    int deleteByPrimaryKey(String id);

    int insert(SYS_ROLES record);

    int insertSelective(SYS_ROLES record);

    SYS_ROLES selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SYS_ROLES record);

    int updateByPrimaryKey(SYS_ROLES record);
}