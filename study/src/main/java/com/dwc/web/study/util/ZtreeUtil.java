package com.dwc.web.study.util;

import com.dwc.web.study.model.psms.TP_USERS;
import com.dwc.web.study.model.workplan.WP_DEPART;
import com.dwc.web.study.model.workplan.WP_USER;
import com.dwc.web.study.model.workplan.WP_WORK_AREA;
import com.xiaoleilu.hutool.json.JSONArray;
import com.xiaoleilu.hutool.json.JSONException;
import com.xiaoleilu.hutool.json.JSONObject;

import java.util.List;

/**
 * \* @created with IntelliJ IDEA.
 * \* @author: chenjian
 * \* @date: 2018/2/28
 * \* @time: 上午9:22
 * \* @to change this template use File | Settings | File Templates.
 * \* @description:ztree相关工具类 主要是用于转换数据
 */
public class ZtreeUtil {
    public static Object convertData(List<WP_DEPART> departList, List<WP_USER> userList, String _departId) throws JSONException {

        JSONArray jsonArray = new JSONArray();

        for(WP_DEPART depart:departList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",depart.getJgbm());
            jsonObject.put("pId",depart.getSjjgbm());
            jsonObject.put("name",depart.getJgjc());
            jsonObject.put("isParent",depart.getIsparent());
            jsonArray.add(jsonObject);
        }
        for(WP_USER user:userList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",user.getUserId());
            jsonObject.put("pId",_departId);
            jsonObject.put("name",user.getUserName());
            jsonObject.put("isParent","false");
            jsonObject.put("iconSkin","police");
            jsonArray.add(jsonObject);
        }

        return jsonArray;
    }

    public static Object convertDataForYh(List<WP_DEPART> departList, List<TP_USERS> userList, String _departId) throws JSONException {

        JSONArray jsonArray = new JSONArray();

        for(WP_DEPART depart:departList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",depart.getJgbm());
            jsonObject.put("pId",depart.getSjjgbm());
            jsonObject.put("name",depart.getJgjc());
            jsonObject.put("isParent",depart.getIsparent());
            jsonArray.add(jsonObject);
        }
        for(TP_USERS user:userList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",user.getMjjh());
            jsonObject.put("pId",_departId);
            jsonObject.put("name",user.getMjxm());
            jsonObject.put("isParent","false");
            jsonObject.put("iconSkin","police");
            jsonArray.add(jsonObject);
        }

        return jsonArray;
    }


    public static Object convertDataZrq(List<WP_DEPART> departList, List<WP_WORK_AREA> areaList, String _departId) throws JSONException {

        JSONArray jsonArray = new JSONArray();

        for(WP_DEPART depart:departList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",depart.getJgbm());
            jsonObject.put("pId",depart.getSjjgbm());
            jsonObject.put("name",depart.getJgjc());
            jsonObject.put("isParent",depart.getIsparent());
            //jsonObject.put("iconSkin","zrq");
            jsonArray.add(jsonObject);
        }
        for(WP_WORK_AREA area:areaList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",area.getAreaId());
            jsonObject.put("pId",_departId);
            jsonObject.put("name","民警网格:"+area.getAreaName());
            jsonObject.put("isParent","false");
            //jsonObject.put("iconSkin","zrq");
            jsonArray.add(jsonObject);
        }

        return jsonArray;
    }


}