package com.dwc.web.study.mapper.psms;

import com.dwc.web.study.model.psms.USERS;

public interface USERSMapper {
    int deleteByPrimaryKey(String id);

    int insert(USERS record);

    int insertSelective(USERS record);

    USERS selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(USERS record);

    int updateByPrimaryKey(USERS record);

    USERS findByName(String name);
}