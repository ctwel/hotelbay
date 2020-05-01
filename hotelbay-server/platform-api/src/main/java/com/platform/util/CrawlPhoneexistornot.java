package com.platform.util;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.apache.xerces.util.SynchronizedSymbolTable;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Evaluator.Id;
import org.junit.experimental.theories.FromDataPoints;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.NicelyResynchronizingAjaxController;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlInput;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class CrawlPhoneexistornot {
	public static boolean isExist(String number) throws IOException {
		String testnumber = number.substring(7, 11);
		final WebClient webClient = new WebClient(BrowserVersion.CHROME);// 新建一个模拟谷歌Chrome浏览器的浏览器客户端对象
		webClient.getOptions().setThrowExceptionOnScriptError(false);// 当JS执行出错的时候是否抛出异常, 这里选择不需要
		webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);// 当HTTP的状态非200时是否抛出异常, 这里选择不需要
		webClient.getOptions().setActiveXNative(false);
		webClient.getOptions().setCssEnabled(false);// 是否启用CSS, 因为不需要展现页面, 所以不需要启用
		webClient.getOptions().setJavaScriptEnabled(true); // 很重要，启用JS
		webClient.setAjaxController(new NicelyResynchronizingAjaxController());// 很重要，设置支持AJAX
		HtmlPage page = null;
		HtmlPage page2 = null;
		try {
			String url = "http://texu.10039.cc/txhhr/webSelNumber/webSelNumberGradeList?phoneNumber=17053779555";
			String myurl = "http://texu.10039.cc/txhhr/webSelNumber/webSelNumberList?type=1";
			// "http://texu.10039.cc/txhhr/webSelNumber/webSelNumberList?type=1";
			webClient.getPage(url);// 尝试加载上面图片例子给出的网页
			page = webClient.getPage(myurl);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			webClient.close();
		}
		HtmlInput hi = (HtmlInput) page.getElementById("mobile_end");
		hi.setValueAttribute(testnumber);
		HtmlElement hb = (HtmlElement) page.getByXPath("//input").get(9);
		page2 = hb.click();
		//System.out.println(page2.asXml());
		HtmlElement pageNum = (HtmlElement) page2.getElementById("pageNum");
		int x = Integer.parseInt(pageNum.asText());
		//System.out.println("x="+x);
		String pageXml = page2.asXml();
		Document document = Jsoup.parse(pageXml);
		for (int i = 0; i < x; i++) {
			List<Element> infoListEle = document.getElementById("mobilelist").getElementsByTag("li");
			for(Element element : infoListEle) {
				String temp = element.getElementsByTag("p").text();
				String[] phonelist = temp.split(" ");
				String name = phonelist[0];
				if(name.equals(number)) {
					return true;
				}
			}
			HtmlElement bu = (HtmlElement) page2.getByXPath("//button").get(1);
			page2 = bu.click();
			pageXml = page2.asXml();
			document = Jsoup.parse(pageXml);
		}
		return false;
	}

//	public static void main(String[] args) throws IOException {
//		String number = "17089908504";
//		System.out.println(isExist(number));
//
//	}

}
