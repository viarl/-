package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.UserService;

import commom.Default;

public class RegisterServlet extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String username=request.getParameter("username");
		String pwd=request.getParameter("password");
		String nickname=request.getParameter("nickname");
		String sex=request.getParameter("sex");
		
		UserInfo user=new UserInfo();
		user.setUsername(username);
		user.setPwd(pwd);
		user.setNickname(nickname);
		user.setSex(sex);
		user.setPower("1");
		user.setPhoto(Default.PHOTO_SRC);
		user.setContent(Default.CONTENT);
		
		UserService service=new UserService();
		boolean result=service.Register(user);
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
