package com.dwc.web.study.supplement.shiro;

import com.dwc.web.study.model.psms.USERS;
import com.dwc.web.study.service.psms.UsersInterface;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Auther: dwc
 * @Date: 2018/8/20 14:07
 * @Description:自定义Realm
 */
public class AuthRealm extends AuthorizingRealm {

	@Autowired
	private UsersInterface usersInterface;

	/**
	 * 执行授权逻辑
	 * @param principalCollection
	 * @return
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
		System.out.println("执行授权逻辑 = [" + principalCollection + "]");
		SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
		//添加资源的授权字符串
		info.addStringPermission("user:add");
		info.addStringPermission("user:update");
		return info;
	}

	/**
	 * 执行认证逻辑
	 * @param authenticationToken
	 * @return
	 * @throws AuthenticationException
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
		System.out.println("执行认证逻辑 = [" + authenticationToken + "]");
		UsernamePasswordToken usernamePasswordToken= (UsernamePasswordToken) authenticationToken;
		USERS users=usersInterface.findByName(usernamePasswordToken.getUsername());
		if(users==null){
			//用户名不存在
			return null;//shiro底层抛除UnknownAccountException
		}
		//判断密码
		return new SimpleAuthenticationInfo("",users.getcPwd(),"");
	}
}
