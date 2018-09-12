package com.dwc.web.study.util.result;

public enum ResultEnum {
    UNKOWN(0,"未知错误"),
    SUCCESS(1,"成功")
    ;
    private Integer code;
    private String message;

    ResultEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
