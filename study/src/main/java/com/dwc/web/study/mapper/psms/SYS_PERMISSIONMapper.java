package com.dwc.web.study.mapper.psms;

import com.dwc.web.study.model.psms.SYS_PERMISSION;

public interface SYS_PERMISSIONMapper {
    int deleteByPrimaryKey(String id);

    int insert(SYS_PERMISSION record);

    int insertSelective(SYS_PERMISSION record);

    SYS_PERMISSION selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SYS_PERMISSION record);

    int updateByPrimaryKey(SYS_PERMISSION record);
}