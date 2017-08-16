package servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javabean.Record;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import service.RecordService;

public class UploadRecord extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		boolean r=false;
		String filename="";
		String username="";
		String music="";
		DiskFileItemFactory factory = new DiskFileItemFactory(1024 * 1024,
				new File("E:/temp"));
		ServletFileUpload upload = new ServletFileUpload(factory);
		
		try {
			List<FileItem> items = upload.parseRequest(request);

			for (FileItem item : items) {

				if (item.isFormField()) {
					if (item.getFieldName().equals("username")){
						username = item.getString();
						username= new String(username.getBytes("ISO-8859-1"),
								"UTF-8");
					}
					if (item.getFieldName().equals("music")) {
						music = item.getString();
						music = new String(music.getBytes("ISO-8859-1"),
								"UTF-8");
					}

				} else {
					// 上传的文件
					if (!item.getName().equals("")) {
						System.out.println(item.getFieldName());						
						String path = request.getSession().getServletContext()
								.getRealPath("/");
						filename=item.getFieldName();
						item.write(new File(path + "record/"+item.getFieldName()+".wav"));
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();			
		}
		
		RecordService service=new RecordService();
		Record record=new Record();
		record.setUsername(username);
		record.setRecord(music);
		record.setMusic(music);
		r=service.addRecord(record);
	}
}
