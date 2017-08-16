package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import service.UserService;

public class LockUserServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username=request.getParameter("username");
		String flag=request.getParameter("lock");
		
		UserService service=new UserService();
		boolean r=service.lockUser(username,flag);
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
	    out.println(r);		
		out.flush();
		out.close();
	}
}
