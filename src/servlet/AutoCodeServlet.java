package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import commom.ImageCodeUtil;

public class AutoCodeServlet extends HttpServlet {

	private static final long serialVersionUID = 5225185955711424724L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//…Ë÷√‰Ø¿¿∆˜≤ª“™ª∫¥Ê
		response.setHeader("pragma", "no-cache");
		response.setHeader("cache-control", "no-cache");
		response.setHeader("expires", "0");
		response.setContentType("image/jpeg");
		HttpSession session = request.getSession();
		ServletOutputStream sos = response.getOutputStream();
		String code = ImageCodeUtil.generateSimpleImageCode(sos);
		session.setAttribute("imageCode", code);
	}
}
