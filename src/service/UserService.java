package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import commom.Md5Utils;

import dao.UserDao;
import javabean.UserInfo;

public class UserService {

	UserDao dao=new UserDao();
	
	public String Login(UserInfo user){
		String result="3";
		user.setPwd(Md5Utils.md5(user.getPwd()));
		result=dao.Login(user);
		return result;
	}
	
	public boolean checkLock(String username){
		boolean r=dao.checkLock(username);
		return r;
	}
	
	public UserInfo userQueryByName(String username){
		UserInfo result;
		result=dao.userQueryByName(username);
		if(result.getSex()!=null)
			if(result.getSex().equals("0"))
				result.setSex("男");
			else
				result.setSex("女");
		if(result.getCenterContent()==null||result.getCenterContent().equals(""))
			result.setCenterContent("他很懒，这里竟然也什么都没有留下QAQ");
		return result;
	}
	
	public boolean Register(UserInfo user){
		
		boolean result=false;
		result=dao.Register(user);
		return result;
	}
	
	public boolean checkUser(String username){
		
		boolean result=false;
		result=dao.checkUser(username);
		return result;
	}
	
	public boolean updateFlag(String username,String flag){
		
		boolean result=false;
		result=dao.updateFlag(username,flag);
		return result;	
	}
	
	public List<UserInfo> queryFriendByNickName(String nickname,String username){
		List<UserInfo> friends=new ArrayList<UserInfo>();
		friends=dao.queryFriendByNickName(nickname,username);
		return friends;
	}
	
	public boolean UserUpdate(UserInfo user) {
		boolean result = false;
		int r = dao.UserUpdate(user);
		if (r == 1 )
			result = true;
		return result;
	}
	
	public String photoQueryByName(String username){
		String photo="";
		photo=dao.photoQueryByName(username);		
		return photo;
	}
	
	public Map<String,Object> queryUserList(UserInfo user,int startPosition){
		Map<String,Object> r=new HashMap<String, Object>();		
		int total=dao.totalPage(user);
		List<UserInfo> users=dao.queryUserList(user, startPosition);
		r.put("total", total);
		r.put("list", users);
		return r;
	}
	
	public boolean lockUser(String username,String flag){
		boolean result = false;
		result = dao.lockUser(username,flag);
		return result;
	}
	
	public boolean tip(String name){
		return dao.tip(name);
	}
}
