package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javabean.MusicInfo;
import javabean.Record;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.MusicService;
import service.RecordService;

import com.alibaba.fastjson.JSON;

public class QueryRecord extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username=request.getParameter("username");
		RecordService service=new RecordService();
		List<Record> record=service.queryRecord(username);
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(record));
		out.print(jsonString);
		out.flush();
		out.close();
	}
}
