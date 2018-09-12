package com.dwc.web.study.service.workplan.impl;

import com.dwc.web.study.mapper.psms.TP_USERSMapper;
import com.dwc.web.study.mapper.workplan.WP_USERMapper;
import com.dwc.web.study.model.psms.TP_USERS;
import com.dwc.web.study.model.workplan.WP_USER;
import com.dwc.web.study.service.workplan.WpUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2018/1/30
 * \* @time: 上午9:20
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:
 */
@Service(value = "wpUserService")
public class WpUserServiceImpl implements WpUserService {

    @Autowired
    private WP_USERMapper wb_userMapper;

    @Autowired
    private TP_USERSMapper tpUsersMapper;

    @Override
    public List<WP_USER> findUsersByDepartAndType(String departId, String userType) {
//        PageHelper.startPage(1, 10);
        return wb_userMapper.findUsersByDepartAndType(departId,userType);
    }


    @Override
    public List<WP_USER> findAllUsersByDepartAndType(String departId, String userType) {
//        PageHelper.startPage(1, 10);
        return wb_userMapper.findAllUsersByDepartAndType(departId,userType);
    }

    @Override
    public WP_USER selectByPrimaryKey(String userId) {
        return wb_userMapper.selectByPrimaryKey(userId);
    }

    @Override
    public boolean updateFileId(String fileId, String userId) {
        return wb_userMapper.updateFileId(fileId,userId)==1;
    }

    @Override
    public List<TP_USERS> findUsersByDepart(String departId) {
        return tpUsersMapper.findUsersByDepart(departId);
    }
}