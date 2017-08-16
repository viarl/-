package commom;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WebUtil {

	public static void forward(HttpServletRequest request,HttpServletResponse response,String url) throws ServletException, IOException{
		
		RequestDispatcher dis=request.getRequestDispatcher(url);
		
		dis.forward(request, response);
	}
}
