package com.dwc.web.study.util.result;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2017/11/30
 * \* @time: 下午2:57
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:
 */
public class ResultUtil {
    public static Result sucess(Object data){
        Result result = new Result();
        result.setCode(Constant.SUCCESS);
        result.setMessage("请求返回正常");
        result.setData(data);
        return result;
    }

    public static Result sucess(String message,Object data){
        Result result = new Result();
        result.setCode(Constant.SUCCESS);
        result.setMessage(message);
        result.setData(data);
        return result;
    }


    public static Result sucess(String message){
        return sucess(message,null);
    }

    public static Result sucess(){
        return sucess(null);
    }

    public static Result error(Integer code,String message){
        Result result = new Result();
        result.setCode(code);
        result.setMessage(message);
        result.setData(null);
        return result;
    }
}