package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javabean.MusicInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import service.MusicService;

public class QueryRecordBZ extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String name=request.getParameter("name");
		String style=request.getParameter("style");
		String singer=request.getParameter("singer");
		String host=request.getParameter("host");
		int page=Integer.parseInt(request.getParameter("page"));
		MusicInfo music = new MusicInfo();
		music.setName(name);
		music.setStyle(style);
		music.setSinger(singer);
		music.setHost(host);
		MusicService service = new MusicService();
		Map<String, Object> r = service.queryMusic(music,page);
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(r));
		out.print(jsonString);
		out.flush();
		out.close();
	}
}
