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

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2018/1/30
 * \* @time: 上午10:02
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:主数据源配置
 */

@SuppressWarnings("AlibabaCommentsMustBeJavadocFormat")
@Configuration
@MapperScan(basePackages = ActivityDataSourceConfig.PACKAGE, sqlSessionFactoryRef = "activitiSqlSessionFactory")
public class ActivityDataSourceConfig {

    // 精确到 base 目录，以便跟其他数据源隔离
    static final String PACKAGE = "com.dwc.web.study.mapper.activiti";
    static final String MAPPER_LOCATION = "classpath:mapping/activiti/*.xml";

    @Bean(name = "activitiDataSource")
    @ConfigurationProperties("spring.datasource.druid.activiti")
    public DataSource setDataSource() {
        return DruidDataSourceBuilder.create().build();
    }

    @Bean(name="activitiTransactionManager")
    public DataSourceTransactionManager TransactionManager(){
        return new DataSourceTransactionManager(setDataSource());
    }

    @Bean(name = "activitiSqlSessionFactory")
    public SqlSessionFactory clusterSqlSessionFactory(@Qualifier("activitiDataSource") DataSource dataSource)
            throws Exception{
        final SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver()
                .getResources(ActivityDataSourceConfig.MAPPER_LOCATION));
        return sessionFactoryBean.getObject();
    }

}