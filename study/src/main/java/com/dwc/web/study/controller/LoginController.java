package com.dwc.web.study.controller;


import io.swagger.annotations.Api;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * @Author: Dwc
 * @Date: 2018/8/14 16:26
 *
*/
@Api(value = "登录验证", description = "登录验证Api")
@Controller
//@RequestMapping("/login1")
public class LoginController {

    @RequestMapping("/loginSy")
    public String ccc(){
        System.out.print("登陆后进入首页");
        return "login/index";
    }

    @GetMapping("/loginin")
    public String login(){
        return "login/login";
    }

    @RequestMapping("/logout")
    public String logout(){
        System.out.print("进入退出首页");
        return "login/logout";
    }

    //测试
    @RequestMapping("/testGl")
    public String testGl(){
        System.out.print("测试过滤");
        return "login/testGl";
    }

    @PostMapping("/doLogin")
    public String doLogin(@RequestParam("username") String username, @RequestParam("password") String password, Model model){
        /**
         * 登陆Shiro认证
         */
        //获取subject
        Subject subject= SecurityUtils.getSubject();
        //封装用户数据
        UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
        //执行登陆的方法
        String url="";
        try {
            subject.login(usernamePasswordToken);
            //登陆成功
            return "redirect:loginSy";
        } catch (UnknownAccountException e) {
            //登陆失败
            model.addAttribute("msg","用户名不存在");
            url= "login/login";
        } catch (IncorrectCredentialsException e){
            //登陆失败，密码错误
            model.addAttribute("msg","密码错误");
            url= "login/login";
        }
        return url;
    }
}
