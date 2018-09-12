package com.dwc.web.study.service.workplan.impl;

import com.dwc.web.study.mapper.workplan.WP_DEPARTMapper;
import com.dwc.web.study.model.workplan.WP_DEPART;
import com.dwc.web.study.service.workplan.WpDepartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2018/2/28
 * \* @time: 上午9:15
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:
 */

@Service(value = "wpDepartService")
public class WpDepartServiceImpl implements WpDepartService {

    @Autowired
    private WP_DEPARTMapper wp_departMapper;

    @Override
    public List<WP_DEPART> findDepartByDepartId(String departId) {
        return wp_departMapper.findDepartByDepartId(departId);
    }

    @Override
    public List<WP_DEPART> findDepartByDepartIdWithOutRoot(String departId) {
        return wp_departMapper.findDepartByDepartIdWithOutRoot(departId);
    }

    @Override
    public List<WP_DEPART> findDepartByDepartIdZrq(String departId) {
        return wp_departMapper.findDepartByDepartIdZrq(departId);
    }

    @Override
    public List<WP_DEPART> findDepartByDepartIdWithOutRootZrq(String departId) {
        return wp_departMapper.findDepartByDepartIdWithOutRootZrq(departId);
    }
}