package servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.MusicService;

public class DeleteMusic extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String name=request.getParameter("musicname");
		MusicService service=new MusicService();
		boolean r=service.deleteMusic(name);
		PrintWriter out = response.getWriter();
		if(r){
			String path=request.getSession().getServletContext().getRealPath("/");
			File file=new File(path+"musics/"+name+".mp3");
			if(file.exists())
				if(file.delete())
				    out.print(true);
				else
					out.print(true);
			else
				out.print(false);
		}else{
			out.print(false);
		}
		out.flush();
		out.close();
	}
}
