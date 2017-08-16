package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import commom.JdbcUtil;
import commom.WebUtil;

import service.UserService;

public class QueryUserByName extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String username =request.getParameter("username");
		UserService service = new UserService();
		UserInfo user = service.userQueryByName(username);
		request.setAttribute("user", user);	
		WebUtil.forward(request, response, "/User/left.jsp");
	}
}
