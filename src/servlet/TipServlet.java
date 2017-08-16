package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.UserService;

public class TipServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username=request.getParameter("username");
		UserService service=new UserService();
		boolean r=service.tip(username);
        PrintWriter out = response.getWriter();
		
		if(r){
			out.print("true");
		}else{
			out.print("false");
		}
		out.flush();
		out.close();
	}
}
