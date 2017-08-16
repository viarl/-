package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.UserService;

public class CheckNameServlet extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String username=request.getParameter("username");
		UserService service=new UserService();
		boolean result=service.checkUser(username);
		PrintWriter out = response.getWriter();
		
		if(result){
			out.print("true");
		}else{
			out.print("false");
		}
		out.flush();
		out.close();
	}
}
