package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import service.MusicService;

public class PrivateDeleteMusic extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
           String username=request.getParameter("username");
           String songName=request.getParameter("songName");
           MusicService service=new MusicService();
           boolean r=service.privateDeleteMusic(songName, username);
           
           PrintWriter out = response.getWriter();
   		   out.print(r);
   		   out.flush();
   		   out.close();
	}
}
