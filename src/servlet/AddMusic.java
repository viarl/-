package servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javabean.MusicInfo;
import javabean.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import service.MusicService;
import service.UserService;

import com.alibaba.fastjson.JSON;

public class AddMusic extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String username = "";
		String music = "";
		String bz = "";
		String lrc = "";
		String style = "";
		String singer = "";
		String path="";

		DiskFileItemFactory factory = new DiskFileItemFactory(1024 * 1024,
				new File("E:/temp"));
		ServletFileUpload upload = new ServletFileUpload(factory);

		try {
			List<FileItem> items = upload.parseRequest(request);

			for (FileItem item : items) {

				if (item.isFormField()) {
					// 普通的表单元素
					if (item.getFieldName().equals("style")){
						style = item.getString();
						style= new String(style.getBytes("ISO-8859-1"),
								"UTF-8");
					}
					if (item.getFieldName().equals("singer")) {
						singer = item.getString();
						singer = new String(singer.getBytes("ISO-8859-1"),
								"UTF-8");
					}
					if (item.getFieldName().equals("username")) {
						username = item.getString();
						username = new String(username.getBytes("ISO-8859-1"),
								"UTF-8");
					}

				} else {
					// 上传的文件
					if (!item.getName().equals("")) {
						String suffix = item.getName().substring(
								item.getName().lastIndexOf('.'));
						path = request.getSession().getServletContext()
								.getRealPath("/");
						if(suffix.equals(".lrc")){
							lrc=item.getName();
							path = path + "lrc/";
						}
						else{							
							String b=item.getName().substring(item.getName().lastIndexOf('.')-3,item.getName().lastIndexOf('.'));
						    if(b.equals("_BZ"))
						    	bz=item.getName();
						    else
						    	music=item.getName().substring(0,item.getName().lastIndexOf('.'));
						    path = path + "musics/";
						}												
						item.write(new File(path + "" + item.getName()));
					} 
				}
			}
		} catch (Exception e) {

			e.printStackTrace();
		}

		MusicInfo m;
		boolean r=true;
		if(!music.equals("")){
			m=new MusicInfo();
			m.setName(music);
			m.setSinger(singer);
			m.setStyle(style);
			m.setUploader(username);
			MusicService service=new MusicService();
			r=service.addMusic(m);
		}
		
		PrintWriter out = response.getWriter();
		StringBuilder jsonString = new StringBuilder();
		jsonString.append(JSON.toJSONString(r));
		out.print(jsonString);
		out.flush();
		out.close();
	
	}
}
