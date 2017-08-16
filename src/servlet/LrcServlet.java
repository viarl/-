package servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javabean.Lrc;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

public class LrcServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String music=request.getParameter("songName");
		String songName="";
		if(music.length()>3 && music.substring(music.length()-7).equals("_BZ.lrc")){
			music=music.substring(0,music.length()-7);
			songName="lrc/"+music+".lrc";
		}else{
			songName="lrc/"+music;
		}
		 
		String path=request.getSession().getServletContext()
				.getRealPath("/");
		path=path+songName;
		Map<String, Object> map = parseLrc(path);	
		if (map.size()>0) {
			response.setCharacterEncoding("utf-8");
			PrintWriter outPrintWriter =  response.getWriter();
			outPrintWriter.println(JSON.toJSONString(map));
		 
			outPrintWriter.flush();
			outPrintWriter.close();
		}else {
			response.getWriter().println(false);
		}
	}
	
	private Map<String, Object> parseLrc(String path) {
		BufferedReader bufferedReader = null;	
		try {
			File file = new File (path); 			
			FileReader fileReader;
			fileReader = new FileReader(file);
			bufferedReader = new BufferedReader(fileReader);
		} catch (Exception e2) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			return map;
		} 
		String line = null;
		int key = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		StringBuffer sb = new StringBuffer();
		int f=-1;
		try {
			while ((line = bufferedReader.readLine()) != null) {
				if (!line.equals("")) {
					sb.append(line).append("@");//判断整行不为null或者""并加入到StringBuffer中
					f++;
					continue;
				}
				String[] parseSrtArray = sb.toString().split("@");
				if(f<2)
					deal(parseSrtArray[f],parseSrtArray[f],f,map);
				if(f>2)
				  deal(parseSrtArray[f-1],parseSrtArray[f],f,map);	
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return map;
	}

	private void deal(String nowLine,String nextLine,int flag,Map map){
		nextLine=nextLine.trim(); 
		nowLine=nowLine.trim();
		Lrc lrc = new Lrc();
		
		switch (flag) {
		case 0:
			String singer = nowLine.substring(4, nowLine.length() - 1);
			lrc.setSinger(singer);
			map.put("singer", lrc.getSinger());
			break;
		case 1:
			String name=nowLine.substring(4,nowLine.length()-1);
			lrc.setName(name);
			map.put("name", lrc.getName());
			break;
		default:
			// 解析开始和结束时间
			String timeTotime = nowLine;
			
			//[00:00.62]忽然间有一点心酸
			//获得时分秒和毫秒
			int begin_mintue = Integer.parseInt(timeTotime.substring(1, 3));
			int begin_scend = Integer.parseInt(timeTotime.substring(4, 6));
			int begin_milli = Integer.parseInt(timeTotime.substring(7, 9));
			//得到开始时间的毫秒值
			int beginTime = (begin_mintue * 60 + begin_scend)
					* 1000 + begin_milli;
			
			timeTotime = nextLine;
			//[00:05.38]和很多胆怯
			//获得时分秒和毫秒
			int end_mintue = Integer.parseInt(timeTotime.substring(1, 3));
			int end_scend = Integer.parseInt(timeTotime.substring(4, 6));
			int end_milli = Integer.parseInt(timeTotime.substring(7, 9));
			//获取结束时间的毫秒值
			int endTime = (end_mintue * 60 + end_scend) * 1000
					+ end_milli;
			// 解析字幕文字
			String srtBody = "";
			srtBody = nowLine.substring(10,nowLine.length());
		
			//保存到实体中
			lrc.setsrtBody(srtBody);
			lrc.setBeginTime(beginTime);
			lrc.setEndTime(endTime);
			map.put("key"+(flag-1), lrc);
			Lrc lrc2=new Lrc();
			lrc2.setBeginTime(endTime);
			lrc2.setEndTime(endTime+1000);
			lrc2.setsrtBody(nextLine.substring(10,nextLine.length()));
			map.put("key"+flag,lrc2);
			break;
		}			
	}
}
