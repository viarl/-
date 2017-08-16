package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.taglibs.standard.tag.common.core.SetSupport;

import commom.JdbcUtil;
import commom.PageUtil;

import javabean.MusicInfo;


public class MusicDao {

	public List<MusicInfo> queryMusic(MusicInfo music,int startPosition){
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		con=JdbcUtil.getConnection();
		
		List<MusicInfo> musics=new ArrayList<MusicInfo>();
		
		StringBuilder sql = new StringBuilder(
				"select name,singer,style from musicinfo where 1=1");
		if(music.getHost()!=null&&music.getHost().equals("1"))
			sql.append(" order by host desc");
		else{
			
			if (music.getName() != null && !music.getName().equals("")) {

				sql.append(" and name like ?");
			}
			if (music.getStyle()!=null&& !music.getStyle().equals("")) {

				sql.append(" and style like ?");
			}
			if (music.getSinger()!=null&&!music.getSinger().equals("")) {

				sql.append(" and singer like ?");
			}
		}
				
		sql.append(" limit ?,?");
		
		try {
			st = con.prepareStatement(sql.toString());

			int index = 1;
			if (music.getHost()==null||!music.getHost().equals("1")) {
				if (music.getName() != null && !music.getName().equals("")) {

					st.setString(index++,"%"+music.getName()+"%" );
				}
				if (music.getStyle() != null && !music.getStyle().equals("")) {

					st.setString(index++,"%"+music.getStyle()+"%" );
				}
				if (music.getSinger() != null && !music.getSinger().equals("")) {

					st.setString(index++,"%"+music.getSinger()+"%" );
				}
			}
			
			st.setInt(index++, startPosition);
			st.setInt(index++, PageUtil.PAGE_SIZE);
			
			rs = st.executeQuery();

			while (rs.next()) {
				MusicInfo m = new MusicInfo();
				m.setName(rs.getString("name"));
				m.setSinger(rs.getString("singer"));
				m.setStyle(rs.getString("style"));

				musics.add(m);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}		
		return musics;	
	}
	
	public int total(MusicInfo music){
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		con=JdbcUtil.getConnection();
		
		int total=0;
		
		StringBuilder sql = new StringBuilder(
				"select count(*) from musicinfo where 1=1");
		if(music.getHost()!=null&&music.getHost().equals("1"))
			sql.append(" order by host desc");
		else{
			
			if (music.getName() != null && !music.getName().equals("")) {

				sql.append(" and name like ?");
			}
			if (music.getStyle()!=null&& !music.getStyle().equals("")) {

				sql.append(" and style like ?");
			}
			if (music.getSinger()!=null&&!music.getSinger().equals("")) {

				sql.append(" and singer like ?");
			}
		}				
		
		try {
			st = con.prepareStatement(sql.toString());

			int index = 1;
			if (music.getHost()==null||!music.getHost().equals("1")) {
				if (music.getName() != null && !music.getName().equals("")) {

					st.setString(index++,"%"+music.getName()+"%" );
				}
				if (music.getStyle() != null && !music.getStyle().equals("")) {

					st.setString(index++,"%"+music.getStyle()+"%" );
				}
				if (music.getSinger() != null && !music.getSinger().equals("")) {

					st.setString(index++,"%"+music.getSinger()+"%" );
				}
			}			
			
			rs = st.executeQuery();

			if (rs.next()) {

				total=rs.getInt(1);
				total=PageUtil.pages(total);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}		
		return total;	
	}
	
	public boolean deleteMusic(String name){
		
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		boolean r=false;
		try {
			st = con.prepareStatement("delete from musicinfo where name=? ");

			st.setString(1,name);			
			
			int n = st.executeUpdate();

			if(n==1)
				r=true;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}		
		return r;
	}
	
	public void addHost(String songname){
		
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();

		try {
			st = con.prepareStatement("update musicinfo set host=host+1 where name=? ");

			st.setString(1,songname);						
            st.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}		
	}
	
	public List<MusicInfo> queryMusicByUploader(String username){
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		con=JdbcUtil.getConnection();
		
		List<MusicInfo> musics=new ArrayList<MusicInfo>();
		try {
			st = con.prepareStatement("select name,style,singer from musicinfo where uploader=? ");

			st.setString(1,username);						
			rs = st.executeQuery();

			while (rs.next()) {
				MusicInfo m = new MusicInfo();
				m.setName(rs.getString("name"));
				m.setSinger(rs.getString("singer"));
				m.setStyle(rs.getString("style"));
				musics.add(m);
			}			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(rs, st, con);
		}			
		return musics;
	}
	
	public boolean addMusic(MusicInfo music){
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		boolean r=false;
		try {
			st = con.prepareStatement("insert into musicinfo(name,style,singer,uploader) values(?,?,?,?)");

			st.setString(1,music.getName());
			st.setString(2,music.getStyle());
			st.setString(3,music.getSinger());
			st.setString(4,music.getUploader());
            int i=st.executeUpdate();
            
            if(i==1)
            	r=true;
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}	
		return r;
	}
	
	public boolean privateDeleteMusic(String songName,String username){
		Connection con=null;
		PreparedStatement st=null;
		con=JdbcUtil.getConnection();
		boolean r=false;
		try {
			st = con.prepareStatement("delete from musicinfo where name=? and uploader=?");

			st.setString(1,songName);
			st.setString(2,username);
            int i=st.executeUpdate();
            
            if(i==1)
            	r=true;
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.closeAll(st, con);
		}	
		return r;
	}
}
