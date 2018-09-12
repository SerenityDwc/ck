package com.dwc.web.study.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class StringUtils {
	

	/**
	 * 判断字符串非空
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(String str) {
		boolean flag = false;
		if (str != null && !str.trim().equals(""))
			flag = true;
		return flag;
	}
	
	/**
	 * 判断字符串为空
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		return !isNotEmpty(str);
	}
	

	

	
	public static boolean isBlank(String string) {
		return string == null || string.trim().equals("");
	}
	
	public static boolean isNotBlank(String string) {
		return !isBlank(string);
	}
	
	public static boolean match(String string, String regex) {
		Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(string);
		return matcher.matches();
	}
	
	public static boolean isNumeric(String str) {
		if (str == null)
			return false;
		for (int i = str.length(); --i >= 0;) {
			int chr = str.charAt(i);
			if (chr < 48 || chr > 57)
				return false;
		}
		return true;
	}
	
	public static int toInt(String value, int defaultValue) {
		try {
			if (value == null || "".equals(value.trim()))
				return defaultValue;
			value = value.trim();
			if (value.startsWith("N") || value.startsWith("n"))
				return -Integer.parseInt(value.substring(1));
			return Integer.parseInt(value);
		} catch (Exception e) {
		}
		return defaultValue;
	}
	
	public static boolean areNotEmpty(String... strings) {
		if (strings == null || strings.length == 0)
			return false;

		for (String string : strings) {
			if (string == null || "".equals(string)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 获取5位随机数
	 * @return
	 */
	public static String getRandomFor8() {
		String randomNo = (int) (Math.random() * 100000000) + "";
		StringBuffer sb = new StringBuffer("00000000" + randomNo);
		return sb.substring(sb.length() - 8, sb.length());
	}

	/**
	 * 一个字符串匹配数组是否包含
	 * @param strs
	 * @param str
	 * @return
	 */
	public static boolean isContainStr(String[] strs,String str){
		for (int i = 0; i <strs.length ; i++) {
			if(str.equals(strs[i])){
				return true;
			}
		}
		return false;
	}

	public static void main(String[] args) {
		System.out.println(getRandomFor8());
	}
}
