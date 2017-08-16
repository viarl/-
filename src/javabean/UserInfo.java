package javabean;

public class UserInfo {

	private int userid;
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getPower() {
		return power;
	}
	public void setPower(String power) {
		this.power = power;
	}
	public String getRoomid() {
		return roomid;
	}
	public void setRoomid(String roomid) {
		this.roomid = roomid;
	}
	private String username;
	private String pwd;
	private String nickname;
	private String sex;
	private String content;
	private String photo;
	private String power;
	private String roomid;
	private String onlineflag;
	private String centerContent;
	private int tip;
	public int getTip() {
		return tip;
	}
	public String getCenterContent() {
		return centerContent;
	}
	public void setCenterContent(String centerContent) {
		this.centerContent = centerContent;
	}
	public void setTip(int tip) {
		this.tip = tip;
	}
	public String getLock() {
		return lock;
	}
	public void setLock(String lock) {
		this.lock = lock;
	}
	private String lock;
	public String getOnlineflag() {
		return onlineflag;
	}
	public void setOnlineflag(String onlineflag) {
		this.onlineflag = onlineflag;
	}
}
