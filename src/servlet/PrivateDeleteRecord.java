package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.MusicService;
import service.RecordService;

public class PrivateDeleteRecord extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		 String username=request.getParameter("username");
         String songName=request.getParameter("songName");
         RecordService service=new RecordService();
         boolean r=service.privateDeleteRecord(songName, username);
         
         PrintWriter out = response.getWriter();
 		 out.print(r);
 		 out.flush();
 		 out.close();
	}
}
