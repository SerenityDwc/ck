package com.dwc.web.study.service.workplan;

import com.dwc.web.study.model.workplan.WP_DEPART;

import java.util.List;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2018/2/28
 * \* @time: 上午9:15
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:
 */

public interface WpDepartService {
    List<WP_DEPART> findDepartByDepartId(String departId);

    List<WP_DEPART> findDepartByDepartIdWithOutRoot(String departId);


    List<WP_DEPART> findDepartByDepartIdZrq(String departId);

    List<WP_DEPART> findDepartByDepartIdWithOutRootZrq(String departId);
}
