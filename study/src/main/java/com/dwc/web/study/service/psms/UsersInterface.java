package com.dwc.web.study.service.psms;

import com.dwc.web.study.model.psms.USERS;

/**
 * @Auther: dwc
 * @Date: 2018/8/20 15:25
 * @Description:
 */
public interface UsersInterface {
    public USERS findByName(String name);
}
