package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import commom.PageUtil;

import service.UserService;

public class QueryUserList extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username=request.getParameter("username");
		String nickname=request.getParameter("nickname");
		String lock=request.getParameter("lock");
		int tip=Integer.parseInt(request.getParameter("tip"));
		int page=Integer.parseInt(request.getParameter("page"));
		int start=PageUtil.startPosition(page);
		
		UserInfo user=new UserInfo();
		user.setUsername(username);
		user.setNickname(nickname);
		user.setLock(lock);
		user.setTip(tip);
		
		UserService service=new UserService();		
		Map<String,Object> r=service.queryUserList(user,start);
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(r));
		out.print(jsonString);
		out.flush();
		out.close();
	}

}
