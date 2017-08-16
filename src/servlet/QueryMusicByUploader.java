package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javabean.MusicInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import service.MusicService;

public class QueryMusicByUploader extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username=request.getParameter("username");
		MusicService service=new MusicService();
		List<MusicInfo> musics=service.queryMusicByUploader(username);
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(musics));
		out.print(jsonString);
		out.flush();
		out.close();
	}
}
