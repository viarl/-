package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import service.RoomService;

public class ValidatePwd extends HttpServlet {

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String id=request.getParameter("roomid");
		String pwd=request.getParameter("roompwd");
		RoomService rservice=new RoomService();
    	int r=rservice.validatePwd(id, pwd);
    	if(r!=0){
    		HttpSession session =request.getSession();
    		session.setAttribute("roompwd", pwd);
    	}
    		
		PrintWriter out = response.getWriter();
		out.print(r);
		out.flush();
		out.close();
	}
}
