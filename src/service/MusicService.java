package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import commom.PageUtil;

import dao.MusicDao;

import javabean.MusicInfo;

public class MusicService {

	MusicDao dao=new MusicDao();
	public  Map<String,Object> queryMusic(MusicInfo music,int startPosition){
		
		Map<String,Object> r=new HashMap<String, Object>();
		int t=dao.total(music);
		List<MusicInfo> musics=new ArrayList<MusicInfo>();
		if(t>0){
		startPosition=PageUtil.startPosition(startPosition);
		musics=dao.queryMusic(music, startPosition);
		}
		r.put("total", t);
		r.put("list",musics);
		return r;
	}
	
	public List<MusicInfo> queryMusicByUploader(String username){
		List<MusicInfo> musics=dao.queryMusicByUploader(username);
		return musics;
	}
	
	public boolean deleteMusic(String name){
		
		boolean r=dao.deleteMusic(name);
		return r;
	}
	
	public void addHost(String songname){
		dao.addHost(songname);
	}
	
	public boolean addMusic(MusicInfo music){
		boolean r=dao.addMusic(music);
		return r;
	}
	public boolean privateDeleteMusic(String songName,String username){
		return dao.privateDeleteMusic(songName, username);
	}
}
