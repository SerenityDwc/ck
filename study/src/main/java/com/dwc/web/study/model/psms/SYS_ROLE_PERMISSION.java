package com.dwc.web.study.model.psms;

public class SYS_ROLE_PERMISSION {
    private String id;

    private String nPermissionId;

    private String nRoleId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getnPermissionId() {
        return nPermissionId;
    }

    public void setnPermissionId(String nPermissionId) {
        this.nPermissionId = nPermissionId == null ? null : nPermissionId.trim();
    }

    public String getnRoleId() {
        return nRoleId;
    }

    public void setnRoleId(String nRoleId) {
        this.nRoleId = nRoleId == null ? null : nRoleId.trim();
    }
}