package com.dwc.web.study.mapper.activiti;

import com.dwc.web.study.model.activiti.TB_QJ;
import com.dwc.web.study.model.psms.SYS_PERMISSION;

import java.util.List;

public interface TB_QJMapper {

    List<TB_QJ> findQjlb();

    List findOwnWorklb();
}