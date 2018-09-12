package com.dwc.web.study.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: dwc
 * @Date: 2018/9/10 10:12
 * @Description:
 */
public class StudyHashmap {

    public static void main(String[] args) {
        Map map=new HashMap();
        List list=new ArrayList();
        Object object=new Object();
        list.add("aaaa");
//        object.
        list.add("bbb");
        map.put("no1",list);
        System.out.printf("测试map");

    }

}
