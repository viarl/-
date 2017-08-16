package filter;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import commom.RoomUtil;

import service.RoomService;

public class PwdFilter implements Filter {

	public void destroy() {

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest req=(HttpServletRequest)request;
		HttpServletResponse resp=(HttpServletResponse)response;
		boolean result=false;
		String requestUrl =req.getRequestURI();//取出当前请求的URL
		
		HttpSession session=req.getSession();
		String roomid=(String)req.getParameter("roomid");
		String roompwd="";
		String username="";
		if(req.getParameter("username")!=null)
			username=(String)req.getParameter("username");
        if(username!="")
        	result=true;
        
        if(result){
        	if(RoomUtil.rooms.get(roomid)!=null){
        		Iterator<String> it = RoomUtil.rooms.get(roomid).iterator();
        		while(it.hasNext()) {
        			if(it.next().equals(username)){
        				resp.sendRedirect(req.getContextPath()+"/ErrorHtml.html");
        				result=false;
        				break;
        			}  			
        		}
        	}     	
    		
    		if(result){
    			if(session.getAttribute("roompwd")!=null)
     	           roompwd=(String)session.getAttribute("roompwd");
            	RoomService rservice=new RoomService();
    			int r=rservice.validatePwd(roomid, roompwd);
     		
    			if(r==0){
    				resp.sendRedirect(req.getContextPath()+"/ErrorHtml.html");
    				//WebUtil.forward(req, resp, "/login.jsp");
    			}else if(r!=0&&RoomUtil.rooms.get(roomid)!=null){
    				if(RoomUtil.rooms.get(roomid).size()>=r)
    					resp.sendRedirect(req.getContextPath()+"/ErrorHtml.html");
    				else
    					chain.doFilter(request, response);
    			}else{
    				chain.doFilter(request, response);
    			}    		
        }
	}else{
    	resp.sendRedirect(req.getContextPath()+"/ErrorHtml.html");
    }	
}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}
}
