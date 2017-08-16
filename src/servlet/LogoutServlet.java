package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogoutServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		        //1.清楚session信息
				HttpSession session=request.getSession();
				session.invalidate();
				
				//2.删除cookie
				Cookie c=new Cookie("username","");
				c.setMaxAge(0);
				c.setPath("/");
				response.addCookie(c);
				
				Cookie c1=new Cookie("auto", "");
				c1.setMaxAge(0);
				c1.setPath("/");
				response.addCookie(c1);
				
				Cookie c2=new Cookie("power", "");
				c2.setMaxAge(0);
				c2.setPath("/");
				response.addCookie(c2);
				
				//3.跳转页面
				response.sendRedirect(request.getContextPath()+"/index.html");
	}
}
