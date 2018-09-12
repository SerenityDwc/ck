package com.dwc.web.study.config;

import org.activiti.spring.SpringAsyncExecutor;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.activiti.spring.boot.AbstractProcessEngineAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.io.IOException;

/**
 * @desc Activiti的数据和事物配置.
 */
@Configuration//声名为配置类，继承Activiti抽象配置类
public class ActivitiConfig extends AbstractProcessEngineAutoConfiguration {

    @Resource
    DataSource activitiDataSource;//注入配置好的数据源

    @Resource
    PlatformTransactionManager activitiTransactionManager;//注入配置好的事物管理器

    //注入数据源和事务管理器
    @Bean
    public SpringProcessEngineConfiguration springProcessEngineConfiguration(
            SpringAsyncExecutor springAsyncExecutor) throws IOException {
        return this.baseSpringProcessEngineConfiguration(activitiDataSource, activitiTransactionManager, springAsyncExecutor);
    }


}