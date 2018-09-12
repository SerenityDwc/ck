package com.dwc.web.study.controller;

import com.dwc.web.study.model.workplan.WP_DEPART;
import com.dwc.web.study.model.workplan.WP_USER;
import com.dwc.web.study.service.workplan.WpDepartService;
import com.dwc.web.study.service.workplan.WpUserService;
import com.dwc.web.study.util.ZtreeUtil;
import com.dwc.web.study.util.result.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

/**
 * @Auther: dwc
 * @Date: 2018/8/24 11:13
 * @Description:
 */
@Api(value = "排班", description = "排班Api")
@Controller
@RequestMapping("/workplan")
public class WorkPlanController {
    private final static String rootDepartId = "320500000000";

    @Autowired
    private WpDepartService wpDepartService;

    @Autowired
    private WpUserService wpUserService;

    /**
     * 页面跳转  工作排班首页
     */
    @ApiIgnore
    @RequestMapping(value = {"", "/index"})
    public String pageIndex(Model model, @RequestParam(defaultValue = "320500000000") String departId, @RequestParam(defaultValue = "苏州交警支队") String departName, @RequestParam(defaultValue = "1") String userType, @RequestParam(defaultValue = "999999") String submitUser) {
        model.addAttribute("departId", departId);
        model.addAttribute("departName", departName);
        model.addAttribute("userType", userType);
        model.addAttribute("submitUser", submitUser);
        return "workplan";
    }

    @ApiOperation(value = "获取机构树然后非顶层机构的人员(民警，辅警)", notes = "获取机构树然后非顶层机构的人员(民警，辅警)")
    @RequestMapping(value = "/depart/user", produces = {"application/json;charset=UTF-8"}, method = RequestMethod.GET)
    @ResponseBody
    public Object queryDepartUser(@RequestParam(required = false) String id, @RequestParam(required = false, defaultValue = "0") Integer level, @RequestParam String departId, @RequestParam boolean showUser, @RequestParam String userType) {
        String _departId = id != null ? id : departId;
        List<WP_DEPART> wp_departList = new ArrayList<WP_DEPART>();
        if (level == 0) {
            wp_departList = wpDepartService.findDepartByDepartId(_departId);
        } else {
            wp_departList = wpDepartService.findDepartByDepartIdWithOutRoot(_departId);
        }
        List<WP_USER> wp_userList = new ArrayList<WP_USER>();
        if (showUser && !(rootDepartId).equals(_departId)) {
            wp_userList = wpUserService.findUsersByDepartAndType(_departId, userType);
        }
        //组装ztree数据
        return ResultUtil.sucess(ZtreeUtil.convertData(wp_departList, wp_userList, _departId));
    }
}
