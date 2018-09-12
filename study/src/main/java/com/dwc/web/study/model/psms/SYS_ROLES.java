package com.dwc.web.study.model.psms;

public class SYS_ROLES {
    private String id;

    private String cRolename;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getcRolename() {
        return cRolename;
    }

    public void setcRolename(String cRolename) {
        this.cRolename = cRolename == null ? null : cRolename.trim();
    }
}