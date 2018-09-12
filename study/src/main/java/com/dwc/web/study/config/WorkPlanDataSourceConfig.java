package com.dwc.web.study.config;


import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;


@SuppressWarnings("AlibabaCommentsMustBeJavadocFormat")
@Configuration
@MapperScan(basePackages = WorkPlanDataSourceConfig.PACKAGE, sqlSessionFactoryRef = "workPlanSqlSessionFactory")
public class WorkPlanDataSourceConfig {

    // 精确到 workplan 目录，以便跟其他数据源隔离
    static final String PACKAGE = "com.dwc.web.study.mapper.workplan";
    static final String MAPPER_LOCATION = "classpath:mapping/workplan/*.xml";

//    @Value("${workplan.datasource.url}")
//    private String url;
//
//    @Value("${workplan.datasource.username}")
//    private String user;
//
//    @Value("${workplan.datasource.password}")
//    private String password;
//
//    @Value("${workplan.datasource.driverClassName}")
//    private String driverClass;

    @Bean(name = "workPlanDataSource")
    @ConfigurationProperties("spring.datasource.druid.workplan")
    public DataSource setDataSource() {
//        DruidDataSource dataSource = new DruidDataSource();
//        dataSource.setDriverClassName(driverClass);
//        dataSource.setUrl(url);
//        dataSource.setUsername(user);
//        dataSource.setPassword(password);
//        return dataSource;
        return DruidDataSourceBuilder.create().build();
    }


    @Bean(name="workPlanTransactionManager")
    public DataSourceTransactionManager TransactionManager(){
        return new DataSourceTransactionManager(setDataSource());
    }

    @Bean(name = "workPlanSqlSessionFactory")
    public SqlSessionFactory clusterSqlSessionFactory(@Qualifier("workPlanDataSource") DataSource dataSource)
            throws Exception{
        final SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver()
                .getResources(WorkPlanDataSourceConfig.MAPPER_LOCATION));
        return sessionFactoryBean.getObject();
    }





}