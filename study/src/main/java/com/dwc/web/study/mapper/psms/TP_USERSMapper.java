package com.dwc.web.study.mapper.psms;

import com.dwc.web.study.model.psms.TP_USERS;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TP_USERSMapper {
    int insert(TP_USERS record);

    int insertSelective(TP_USERS record);

    List<TP_USERS> findUsersByDepart(@Param(value = "departId") String departId);

    TP_USERS queryOneUser(@Param(value = "mjjh") String mjjh);
}