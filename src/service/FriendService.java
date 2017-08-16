package service;

import java.util.List;

import dao.FriendDao;

import javabean.Friends;

public class FriendService {

	FriendDao dao=new FriendDao();
	
public List<Friends> friendsQuery(String username){
		
		List<Friends> result=null;
		result=dao.friendsQuery(username);
		return result;
	}

public boolean addFriend(String username,String friendname){
	
	boolean result=dao.addFriend(username, friendname);
	return result;
}

public boolean deleteFriend(String username,String friendname){
	
	boolean result=dao.deleteFriend(username, friendname);
	return result;
}
}
