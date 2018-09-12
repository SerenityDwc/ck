package com.dwc.web.study.service.activiti.impl;

import com.dwc.web.study.mapper.activiti.TB_QJMapper;
import com.dwc.web.study.service.activiti.ActivitiService;
import com.github.pagehelper.PageHelper;
import org.activiti.engine.*;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: dwc
 * @Date: 2018/8/22 19:48
 * @Description:
 */
@Service("activitiService")
public class ActivitiServiceImpl implements ActivitiService {

    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private TaskService taskService;
    //流程引擎（核心对象）
    @Autowired
    private ProcessEngine processEngine;
    @Autowired
    private HistoryService historyService;
    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private TB_QJMapper tb_qjMapper;
    //开始流程，传入申请者的id以及公司的id
    public void startProcess( String key){
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("personId", "personId");
        variables.put("compId", "compId");
        runtimeService.startProcessInstanceByKey(key, "ceshi",variables);
    }

    @Override
    public void deploy(String id) {
        Deployment deployment = processEngine.getRepositoryService()//获取流程定义和部署对象相关的Service
                .createDeployment()//创建部署对象
                .name("请假流程最新")//声明流程的名称
                .addClasspathResource("processes/"+id+".bpmn")//加载资源文件，一次只能加载一个文件
                .deploy();//完成部署
    }

    //根据用户id查询待办事项
    public List<Task> findTasksByUserId(String userId) {
        List<Task> resultTask = taskService.createTaskQuery().processDefinitionKey("qingjia").taskCandidateOrAssigned(userId).list();
        return resultTask;
    }


    public void storeResume() {
        System.out.println("任务已经执行.....................................");
    }

    @Override
    public List findQjlb(int pageNumber, int pageSize) {
        PageHelper.startPage(pageNumber, pageSize);
        return tb_qjMapper.findQjlb();
    }

    @Override
    public List findOwnWorklb(int pageNumber, int pageSize) {
        PageHelper.startPage(pageNumber, pageSize);
        return tb_qjMapper.findOwnWorklb();
    }
}
