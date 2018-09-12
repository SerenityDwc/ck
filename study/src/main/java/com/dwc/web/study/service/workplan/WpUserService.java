package com.dwc.web.study.service.workplan;

import com.dwc.web.study.model.psms.TP_USERS;
import com.dwc.web.study.model.workplan.WP_USER;

import java.util.List;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2018/1/30
 * \* @time: 上午10:06
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:
 */
public interface WpUserService {

    List<WP_USER> findUsersByDepartAndType(String departId, String userType);

    List<WP_USER> findAllUsersByDepartAndType(String departId, String userType);

    WP_USER selectByPrimaryKey(String userId);

    boolean updateFileId(String fileId, String userId);

    List<TP_USERS> findUsersByDepart(String departId);



}
