package com.dwc.web.study.service.activiti;

import org.activiti.engine.task.Task;

import java.util.List;

/**
 * @Auther: dwc
 * @Date: 2018/8/22 14:48
 * @Description:
 */
public interface ActivitiService {
    public void startProcess( String key);

    void deploy(String id);

    public List<Task> findTasksByUserId(String userId);

    public void storeResume();

    List findQjlb(int pageNumber, int pageSize);

    List findOwnWorklb(int pageNumber, int pageSize);
}
