package com.dwc.web.study.model.workplan;

public class WP_DEPART {
    private String jgbm;

    private String jgmc;

    private String jgjc;

    private String pxyj;

    private String sjjgbm;

    private String isparent;

    public String getJgbm() {
        return jgbm;
    }

    public void setJgbm(String jgbm) {
        this.jgbm = jgbm == null ? null : jgbm.trim();
    }

    public String getJgmc() {
        return jgmc;
    }

    public void setJgmc(String jgmc) {
        this.jgmc = jgmc == null ? null : jgmc.trim();
    }

    public String getJgjc() {
        return jgjc;
    }

    public void setJgjc(String jgjc) {
        this.jgjc = jgjc == null ? null : jgjc.trim();
    }

    public String getPxyj() {
        return pxyj;
    }

    public void setPxyj(String pxyj) {
        this.pxyj = pxyj == null ? null : pxyj.trim();
    }

    public String getSjjgbm() {
        return sjjgbm;
    }

    public void setSjjgbm(String sjjgbm) {
        this.sjjgbm = sjjgbm == null ? null : sjjgbm.trim();
    }

    public String getIsparent() {
        return isparent;
    }

    public void setIsparent(String isparent) {
        this.isparent = isparent == null ? null : isparent.trim();
    }
}