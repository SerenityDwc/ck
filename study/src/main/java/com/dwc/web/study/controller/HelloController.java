package com.dwc.web.study.controller;

import io.swagger.annotations.Api;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Auther: dwc
 * @Date: 2018/8/18 18:46
 * @Description:
 */
@Api(value = "测试", description = "Hello World")
@RestController
@RequestMapping("/hello")
public class HelloController {
    @RequestMapping("/hello")
    public String hello(){
        System.out.print("Hello World");
        return "Hello World";
    }
}
