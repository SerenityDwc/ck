package com.dwc.web.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @Auther: dwc
 * @Date: 2018/9/11 14:01
 * @Description:
 */
@Controller
@RequestMapping("/tpsc")
public class TpscController {

    /**
     * 获取单文件上传页面
     *
     * @return
     */
    @GetMapping("single")
    public String index() {
        return "tpsc/tpsc";
    }

    /**
     * 实现文件上传
     */
    @RequestMapping("/fileUpload")
    @ResponseBody
    public String fileUpload(@RequestParam("fileName") MultipartFile file) {
        if (file.isEmpty()) {
            return "false";
        }
        String fileName = file.getOriginalFilename();
        int size = (int) file.getSize();
        System.out.println(fileName + "-->" + size);

        String path = "/Users/dwc/Desktop/TpRespository";
        File dest = new File(path + "/" + fileName);
        if (!dest.getParentFile().exists()) { //判断文件父目录是否存在
            dest.getParentFile().mkdir();
        }
        try {
            file.transferTo(dest); //保存文件
            return "true";
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "false";
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "false";
        }
    }

    /**
     * 获取多文件上传页面
     *
     * @return
     */
    @RequestMapping("/many")
    public String multifile() {
        return "tpsc/tpscs";
    }

    /**
     * 实现多文件上传
     */
    @RequestMapping(value = "/fileUploads", method = RequestMethod.POST)
    @ResponseBody
    public String multifileUpload(HttpServletRequest request) {

        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("fileName");

        if (files.isEmpty()) {
            return "false";
        }

        String path = "/Users/dwc/Desktop/TpRespository";

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            int size = (int) file.getSize();
            System.out.println(fileName + "-->" + size);

            if (file.isEmpty()) {
                return "false";
            } else {
                File dest = new File(path + "/" + fileName);
                if (!dest.getParentFile().exists()) { //判断文件父目录是否存在
                    dest.getParentFile().mkdir();
                }
                try {
                    file.transferTo(dest);
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                    return "false";
                }
            }
        }
        return "true";
    }


    public static void main(String[] args) throws IOException {
        File dir = new File("/Users/dwc/Desktop/TpRespository");

        System.out.println("1111");
    }
}
