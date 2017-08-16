package service;

import java.util.List;

import dao.RecordDao;

import javabean.Record;

public class RecordService {

	RecordDao dao=new RecordDao();
	public List<Record> queryRecord(String username){
		List<Record> list=dao.queryRecord(username);
		return list;
	}
	public boolean addRecord(Record record){
		return dao.addRecord(record);
	}
	public boolean privateDeleteRecord(String songName,String username){
		return dao.privateDeleteRecord(songName, username);
	}
}
