package com.dwc.web.study.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import com.dwc.web.study.supplement.shiro.AuthRealm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @Auther: dwc
 * @Date: 2018/8/20 14:07
 * @Description:Shiro配置
 */
@Configuration
public class ShiroConfig {

    /**
     * 创建ShiroFilterFactoryBean
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(@Qualifier("securityManager")DefaultWebSecurityManager securityManager){
        ShiroFilterFactoryBean shiroFilterFactoryBean=new ShiroFilterFactoryBean();
        //设置安全管理器
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        /**
         * Shiro内置过滤器，可以实现权限相关的拦截器
         * 常用的过滤器
         * anon：无需认证可以访问
         * authc：必须认证才可以访问
         * user：如果使用rememberme的功能可以直接访问
         * perms：该资源必须得到资源权限才可以访问
         * role：该资源必须得到角色权限才可以访问
         */
        Map<String,String> fileterMap=new LinkedHashMap<String,String>();
        //配置退出过滤器,其中的具体的退出代码Shiro已经替我们实现了
        fileterMap.put("/logout", "logout");
        fileterMap.put("/doLogin","anon");
//        fileterMap.put("/testGl","authc");
        fileterMap.put("/**","authc");

        //// 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
        shiroFilterFactoryBean.setLoginUrl("/loginin");
        // 登录成功后要跳转的链接
        shiroFilterFactoryBean.setSuccessUrl("/loginSy");
        //未授权的提示页面
        shiroFilterFactoryBean.setUnauthorizedUrl("/index");

        shiroFilterFactoryBean.setFilterChainDefinitionMap(fileterMap);
        return shiroFilterFactoryBean;
    }

    /**
     * 创建DefaultWebSecurityManager
     */
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("authRealm") AuthRealm authRealm){
        DefaultWebSecurityManager defaultWebSecurityManager=new DefaultWebSecurityManager();
        //关联realm
        defaultWebSecurityManager.setRealm(authRealm);
        return defaultWebSecurityManager;
    }

    /**
     * 创建Realm
     */
    @Bean(name = "authRealm")
    public AuthRealm authRealm(){
        return new AuthRealm();
    }

    /**
     * 添加ShiroDialect 为了在thymeleaf里使用shiro的标签的bean
     * @return
     */
    @Bean(name = "shiroDialect")
    public ShiroDialect shiroDialect(){
        return new ShiroDialect();
    }
}
