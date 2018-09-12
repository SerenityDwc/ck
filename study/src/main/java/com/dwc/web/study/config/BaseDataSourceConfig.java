package com.dwc.web.study.config;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: dwc
 * \* @date: 2018/8/18
 * \* @time: 下午19:23
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:主数据源配置
 */

@Configuration
@MapperScan(basePackages = BaseDataSourceConfig.PACKAGE, sqlSessionFactoryRef = "baseSqlSessionFactory")
public class BaseDataSourceConfig {

    // 精确到 base 目录，以便跟其他数据源隔离
    static final String PACKAGE = "com.dwc.web.study.mapper.psms";
    static final String MAPPER_LOCATION = "classpath:mapping/psms/*.xml";

//    @Value("${base.datasource.url}")
//    private String url;
//
//    @Value("${base.datasource.username}")
//    private String user;
//
//    @Value("${base.datasource.password}")
//    private String password;
//
//    @Value("${base.datasource.driverClassName}")
//    private String driverClass;

    @Bean(name = "baseDataSource")
    @Primary
    @ConfigurationProperties("spring.datasource.druid.base")
    public DataSource setDataSource() {
//        DruidDataSource dataSource = new DruidDataSource();
//        dataSource.setDriverClassName(driverClass);
//        dataSource.setUrl(url);
//        dataSource.setUsername(user);
//        dataSource.setPassword(password);
//        return dataSource;
        return DruidDataSourceBuilder.create().build();
    }

    @Bean(name="baseTransactionManager")
    @Primary
    public DataSourceTransactionManager TransactionManager(){
        return new DataSourceTransactionManager(setDataSource());
    }

    @Bean(name = "baseSqlSessionFactory")
    @Primary
    public SqlSessionFactory clusterSqlSessionFactory(@Qualifier("baseDataSource") DataSource dataSource)
            throws Exception{
        final SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver()
                .getResources(BaseDataSourceConfig.MAPPER_LOCATION));
        return sessionFactoryBean.getObject();
    }




}