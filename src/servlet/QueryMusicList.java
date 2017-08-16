package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javabean.MusicInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.MusicService;

import com.alibaba.fastjson.JSON;
import commom.PageUtil;

public class QueryMusicList extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String musicname=request.getParameter("musicname");
		String style=request.getParameter("style");
		String singer=request.getParameter("singer");
		int start=Integer.parseInt(request.getParameter("page"));
		
		MusicInfo music=new MusicInfo();
		music.setName(musicname);
		music.setStyle(style);
		music.setSinger(singer);
		
		MusicService service=new MusicService();	
		Map<String,Object> r=service.queryMusic(music, start);
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(r));
		out.print(jsonString);
		out.flush();
		out.close();
	}
}
