package servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.alibaba.fastjson.JSON;

import service.UserService;

public class UpdateInfoServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		String nickname = "";
		String sex = "";
		String content = "";
		String path = "";
		String filename = "";

		DiskFileItemFactory factory = new DiskFileItemFactory(1024 * 1024,
				new File("E:/temp"));
		ServletFileUpload upload = new ServletFileUpload(factory);

		try {
			List<FileItem> items = upload.parseRequest(request);

			for (FileItem item : items) {

				if (item.isFormField()) {
					// 普通的表单元素
					if (item.getFieldName().equals("nickname")){
						nickname = item.getString();
						nickname= new String(nickname.getBytes("ISO-8859-1"),
								"UTF-8");
					}
					if (item.getFieldName().equals("sex"))
						sex = item.getString();
					if (item.getFieldName().equals("content")) {
						content = item.getString();
						content = new String(content.getBytes("ISO-8859-1"),
								"UTF-8");
					}

				} else {
					// 上传的文件
					if (!item.getName().equals("")) {
						String suffix = item.getName().substring(
								item.getName().lastIndexOf('.'));
						filename = username + suffix;

						// 得到当前应用磁盘上的绝对路径
						path = request.getSession().getServletContext()
								.getRealPath("/");
						path = path + "photos/";
						item.write(new File(path + "" + filename));
					} else
						filename = "";

				}
			}
		} catch (Exception e) {

			e.printStackTrace();
		}

		UserInfo user = new UserInfo();
		user.setPhoto(filename);
		user.setUsername(username);
		user.setNickname(nickname);
		user.setSex(sex);
		user.setContent(content);
		UserService service = new UserService();
		boolean r = service.UserUpdate(user);

		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(r));
		out.print(jsonString);
		out.flush();
		out.close();
	}
}
