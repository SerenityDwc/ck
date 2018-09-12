package com.dwc.web.study.service.psms.impl;

import com.dwc.web.study.mapper.psms.USERSMapper;
import com.dwc.web.study.service.psms.UsersInterface;
import com.dwc.web.study.model.psms.USERS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Auther: dwc
 * @Date: 2018/8/20 15:28
 * @Description:
 */
@Service
public class UsersInterfaceImpl implements UsersInterface {

    @Autowired
    private USERSMapper usersMapper;
    @Override
    public USERS findByName(String name) {
        USERS users=usersMapper.findByName(name);
        return users;
    }
}
