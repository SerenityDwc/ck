package com.dwc.web.study.model.psms;

public class SYS_PERMISSION {
    private String id;

    private String cPermisname;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getcPermisname() {
        return cPermisname;
    }

    public void setcPermisname(String cPermisname) {
        this.cPermisname = cPermisname == null ? null : cPermisname.trim();
    }
}