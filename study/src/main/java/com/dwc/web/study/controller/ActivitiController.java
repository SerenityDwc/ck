package com.dwc.web.study.controller;

import com.dwc.web.study.model.activiti.TB_QJ;
import com.dwc.web.study.service.activiti.ActivitiService;
import com.dwc.web.study.util.PoiUtil;
import com.dwc.web.study.util.result.ResultUtil;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.task.Task;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: dwc
 * @Date: 2018/8/22 19:47
 * @Description:
 */
@Controller
@RequestMapping("/activiti")
public class ActivitiController {

    @Autowired
    private ActivitiService activitiService;

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ProcessEngine processEngine;

    @RequestMapping("/qjlb")
    public String qjlb(){
        System.out.print("进入请假列表");
        return "activiti/index";
    }

    @RequestMapping("/ownWork")
    public String ownWork(){
        System.out.print("进入我的工作审批界面");
        return "activiti/ownWork";
    }
    @RequestMapping("/page/insert")
    public String insert(){
        return "activiti/add";
    }
    @ApiOperation(value = "查询请假列表", notes = "查询请假列表")
    @RequestMapping(value = "/qjlb", produces = {"application/json;charset=UTF-8"}, method = RequestMethod.GET)
    @ResponseBody
    public Object qjlb(@RequestParam(value = "pageNumber", defaultValue = "1") @ApiParam(name = "pageNumber", value = "查询起始页") int pageNumber, @RequestParam(value = "pageSize", defaultValue = "10") @ApiParam(name = "pageSize", value = "查询每页数据量") int pageSize) {
        return ResultUtil.sucess(new PageInfo(activitiService.findQjlb(pageNumber, pageSize)));
    }

    @ApiOperation(value = "查询请假列表导出数据", notes = "查询请假列表导出数据")
    @RequestMapping(value = "/qjlb/export", produces = {"application/json;charset=UTF-8"}, method = RequestMethod.POST)
    public Object queryDuty(@RequestParam String columns, HttpServletRequest request, HttpServletResponse response) {
        PageInfo<TB_QJ> dutyPageInfo;
        dutyPageInfo = new PageInfo(activitiService.findQjlb( 1, 999999999));

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("dataList", dutyPageInfo.getList());
        map.put("dataNum", dutyPageInfo.getTotal()+"");
        map.put("columns", columns);

        HSSFWorkbook workBook = PoiUtil.buildXlsExcelRecord(map);

        try {
            String fileName = "请假列表";
            fileName = new String(fileName.getBytes("utf-8"), "ISO-8859-1");
            fileName += ".xls";
            OutputStream os = response.getOutputStream();
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            response.setCharacterEncoding("utf-8");
            workBook.write(os);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //开启流程实例
//    @RequestMapping(value="/process/{key}", method= RequestMethod.GET)
//    public void startProcessInstance(@PathVariable String key){
//        activitiService.startProcess(key);
//    }

    @RequestMapping("/deploy/{id}")
    @ResponseBody
    public Object deploy(@PathVariable String id) {
        activitiService.deploy(id);
        return ResultUtil.sucess("部署流程成功");
    }


    //开启请假流程
    @RequestMapping(value = "/kqlc/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Object startProcessInstance(@PathVariable String id){
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("qjid", id);
        variables.put("kqr", "杜万超");
        runtimeService.startProcessInstanceByKey("qingjia", variables);
        return ResultUtil.sucess("流程开启成功");
    }

    /**
     * 请假审批，根据id完成节点
     */
    @RequestMapping(value = "/sp/{id}")
    @ResponseBody
    public Object testComplete(@PathVariable String id){
        processEngine.getTaskService().complete(id);
        return ResultUtil.sucess("当前节点审批完成");
    }

    /**
     * 根据用户id查询待办事项
     */
    @RequestMapping(value = "/dsp/{username}")
    @ResponseBody
    public void taskList(@PathVariable String username){
        List<Task> taskList=activitiService.findTasksByUserId(username);
        System.out.println(taskList);
    }


    @ApiOperation(value = "查询请假审批列表", notes = "查询请假审批列表")
    @RequestMapping(value = "/ownWorklb", produces = {"application/json;charset=UTF-8"}, method = RequestMethod.GET)
    @ResponseBody
    public Object ownWorklb(@RequestParam(value = "pageNumber", defaultValue = "1") @ApiParam(name = "pageNumber", value = "查询起始页") int pageNumber, @RequestParam(value = "pageSize", defaultValue = "10") @ApiParam(name = "pageSize", value = "查询每页数据量") int pageSize) {


        return ResultUtil.sucess(new PageInfo(activitiService.findOwnWorklb(pageNumber, pageSize)));
    }
}
