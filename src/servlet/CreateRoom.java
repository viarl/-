package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javabean.RoomInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;

import service.RoomService;

public class CreateRoom extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String roomname=request.getParameter("roomname");
		String roompwd=request.getParameter("roompwd");
		String num=request.getParameter("num");
		String src=request.getParameter("src");
		
		RoomInfo room=new RoomInfo();
		room.setNum(num);
		room.setRoomname(roomname);
		room.setPwd(roompwd);
		room.setSrc(src);
		RoomService service=new RoomService();
		String id=service.createRoom(room);
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		if(!id.equals("")){
			HttpSession session =request.getSession();
    		session.setAttribute("roompwd", roompwd);
			jsonString.append(id);
		}else{
			jsonString.append(false);
		}
		out.print(id);
		out.flush();
		out.close();
	}
}
