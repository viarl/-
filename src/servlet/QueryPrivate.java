package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import service.UserService;

public class QueryPrivate extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username =request.getParameter("username");
		UserService service = new UserService();
		UserInfo user = service.userQueryByName(username);
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(user));
		out.print(jsonString);
		out.flush();
		out.close();
	}
}
