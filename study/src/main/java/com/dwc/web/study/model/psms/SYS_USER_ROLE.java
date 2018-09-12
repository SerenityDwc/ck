package com.dwc.web.study.model.psms;

public class SYS_USER_ROLE {
    private String id;

    private String nUserid;

    private String nRoleid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getnUserid() {
        return nUserid;
    }

    public void setnUserid(String nUserid) {
        this.nUserid = nUserid == null ? null : nUserid.trim();
    }

    public String getnRoleid() {
        return nRoleid;
    }

    public void setnRoleid(String nRoleid) {
        this.nRoleid = nRoleid == null ? null : nRoleid.trim();
    }
}