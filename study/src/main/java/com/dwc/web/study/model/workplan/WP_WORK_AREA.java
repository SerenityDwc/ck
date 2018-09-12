package com.dwc.web.study.model.workplan;

import java.util.Date;

public class WP_WORK_AREA {
    private Integer areaId;

    private String areaName;

    private String areaDesc;

    private String areaStr;

    private Object area;

    private Short disturb;

    private String owner;

    private String submitUser;

    private Date submitDate;

    private Short deleted;

    private String dymj;

    private String fjxm;

    private String leader;

    private String charter;

    private String charterPhone;

    private String note;

    private String userType;
    private int pageNumber;
    private int pageSize;


    private String areaNum;

    public String getAreaNum() {
        return areaNum;
    }

    public void setAreaNum(String areaNum) {
        this.areaNum = areaNum;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName == null ? null : areaName.trim();
    }

    public String getAreaDesc() {
        return areaDesc;
    }

    public void setAreaDesc(String areaDesc) {
        this.areaDesc = areaDesc == null ? null : areaDesc.trim();
    }

    public String getAreaStr() {
        return areaStr;
    }

    public void setAreaStr(String areaStr) {
        this.areaStr = areaStr == null ? null : areaStr.trim();
    }

    public Object getArea() {
        return area;
    }

    public void setArea(Object area) {
        this.area = area;
    }

    public Short getDisturb() {
        return disturb;
    }

    public void setDisturb(Short disturb) {
        this.disturb = disturb;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner == null ? null : owner.trim();
    }

    public String getSubmitUser() {
        return submitUser;
    }

    public void setSubmitUser(String submitUser) {
        this.submitUser = submitUser == null ? null : submitUser.trim();
    }

    public Date getSubmitDate() {
        return submitDate;
    }

    public void setSubmitDate(Date submitDate) {
        this.submitDate = submitDate;
    }

    public Short getDeleted() {
        return deleted;
    }

    public void setDeleted(Short deleted) {
        this.deleted = deleted;
    }

    public String getDymj() {
        return dymj;
    }

    public void setDymj(String dymj) {
        this.dymj = dymj == null ? null : dymj.trim();
    }

    public String getFjxm() {
        return fjxm;
    }

    public void setFjxm(String fjxm) {
        this.fjxm = fjxm == null ? null : fjxm.trim();
    }

    public String getLeader() {
        return leader;
    }

    public void setLeader(String leader) {
        this.leader = leader == null ? null : leader.trim();
    }

    public String getCharter() {
        return charter;
    }

    public void setCharter(String charter) {
        this.charter = charter == null ? null : charter.trim();
    }

    public String getCharterPhone() {
        return charterPhone;
    }

    public void setCharterPhone(String charterPhone) {
        this.charterPhone = charterPhone == null ? null : charterPhone.trim();
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType == null ? null : userType.trim();
    }
}