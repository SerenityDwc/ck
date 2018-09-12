package com.dwc.web.study.mapper.workplan;

import com.dwc.web.study.model.workplan.WP_DEPART;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WP_DEPARTMapper {
    int deleteByPrimaryKey(String jgbm);

    int insert(WP_DEPART record);

    int insertSelective(WP_DEPART record);

    WP_DEPART selectByPrimaryKey(String jgbm);

    int updateByPrimaryKeySelective(WP_DEPART record);

    int updateByPrimaryKey(WP_DEPART record);

    List<WP_DEPART> findDepartByDepartId(@Param(value = "departId") String departId);

    List<WP_DEPART> findDepartByDepartIdWithOutRoot(@Param(value = "departId") String departId);

    List<WP_DEPART> findDepartByDepartIdZrq(@Param(value = "departId") String departId);

    List<WP_DEPART> findDepartByDepartIdWithOutRootZrq(@Param(value = "departId") String departId);


    WP_DEPART findParentDepart(String departId);
}