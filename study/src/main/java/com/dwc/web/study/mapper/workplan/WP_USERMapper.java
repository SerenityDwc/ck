package com.dwc.web.study.mapper.workplan;

import com.dwc.web.study.model.workplan.WP_USER;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WP_USERMapper {

    int deleteByPrimaryKey(String userId);

    int insert(WP_USER record);

    int insertSelective(WP_USER record);

    WP_USER selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(WP_USER record);

    int updateByPrimaryKey(WP_USER record);


    List<WP_USER> findUsersByDepartAndType(@Param(value = "departId") String departId, @Param(value = "userType") String userType);


    List<WP_USER> findAllUsersByDepartAndType(@Param(value = "departId") String departId, @Param(value = "userType") String userType);

    int updateFileId(@Param(value = "fileId") String fileId, @Param(value = "userId") String userId);

}