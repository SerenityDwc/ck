package com.dwc.web.study.model.psms;

public class USERS {
    private String id;

    private String cUsername;

    private String cPwd;

    private String cPhone;

    private String nAge;

    private String nSex;

    private String cCreatedate;

    private String nCreater;

    private String cUpdatedate;

    private String nUpdater;

    private String nDeleted;

    private String nStatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getcUsername() {
        return cUsername;
    }

    public void setcUsername(String cUsername) {
        this.cUsername = cUsername == null ? null : cUsername.trim();
    }

    public String getcPwd() {
        return cPwd;
    }

    public void setcPwd(String cPwd) {
        this.cPwd = cPwd == null ? null : cPwd.trim();
    }

    public String getcPhone() {
        return cPhone;
    }

    public void setcPhone(String cPhone) {
        this.cPhone = cPhone == null ? null : cPhone.trim();
    }

    public String getnAge() {
        return nAge;
    }

    public void setnAge(String nAge) {
        this.nAge = nAge == null ? null : nAge.trim();
    }

    public String getnSex() {
        return nSex;
    }

    public void setnSex(String nSex) {
        this.nSex = nSex == null ? null : nSex.trim();
    }

    public String getcCreatedate() {
        return cCreatedate;
    }

    public void setcCreatedate(String cCreatedate) {
        this.cCreatedate = cCreatedate == null ? null : cCreatedate.trim();
    }

    public String getnCreater() {
        return nCreater;
    }

    public void setnCreater(String nCreater) {
        this.nCreater = nCreater == null ? null : nCreater.trim();
    }

    public String getcUpdatedate() {
        return cUpdatedate;
    }

    public void setcUpdatedate(String cUpdatedate) {
        this.cUpdatedate = cUpdatedate == null ? null : cUpdatedate.trim();
    }

    public String getnUpdater() {
        return nUpdater;
    }

    public void setnUpdater(String nUpdater) {
        this.nUpdater = nUpdater == null ? null : nUpdater.trim();
    }

    public String getnDeleted() {
        return nDeleted;
    }

    public void setnDeleted(String nDeleted) {
        this.nDeleted = nDeleted == null ? null : nDeleted.trim();
    }

    public String getnStatus() {
        return nStatus;
    }

    public void setnStatus(String nStatus) {
        this.nStatus = nStatus == null ? null : nStatus.trim();
    }
}