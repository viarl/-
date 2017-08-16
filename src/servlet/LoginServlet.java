package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;

import service.UserService;

public class LoginServlet extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		Map<String,String> m=new HashMap<String, String>();
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String code=request.getParameter("code");
		String autoLogin=request.getParameter("autoLogin");

		String imagecode=(String)session.getAttribute("imageCode");
		
		if(code!=null&&code.equalsIgnoreCase(imagecode)){
			UserInfo user = new UserInfo();
			user.setUsername(username);
			user.setPwd(password);

			UserService service = new UserService();

			String r=service.Login(user);	
			if (!r.equals("3")) {	
				if(service.checkLock(username)){
					session.setAttribute("username", user.getUsername());
					session.setAttribute("power", r);
					
					Cookie c = new Cookie("username", username);
					c.setMaxAge(60 * 60 * 24 * 7);// 单位是秒
					c.setPath("/");
					response.addCookie(c);							
					
					if(autoLogin.equals("true")){
						
						Cookie c1 = new Cookie("auto", autoLogin);
						c1.setMaxAge(60 * 60 * 24 * 7);// 单位是秒
						c1.setPath("/");
						response.addCookie(c1);
						
						Cookie c2 = new Cookie("power", r);
						c2.setMaxAge(60 * 60 * 24 * 7);// 单位是秒
						c2.setPath("/");
						response.addCookie(c2);		
					}						
					
					user = service.userQueryByName(username);
					jsonString.append(JSON.toJSONString(user));
					out.print(jsonString);
				}else{
					m.put("flag", "lock");
					out.print(JSON.toJSONString(m));
				}
			} else {
				out.print("false");
			}
		}else{
			m.put("flag", "codeFail");
			out.print(JSON.toJSONString(m));
		}							
		out.flush();
		out.close();
	}
}
