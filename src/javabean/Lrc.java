package javabean;

public class Lrc {

	private String singer;
	public String getSinger() {
		return singer;
	}
	public void setSinger(String singer) {
		this.singer = singer;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSrtBody() {
		return srtBody;
	}
	public void setSrtBody(String srtBody) {
		this.srtBody = srtBody;
	}
	private String name;
	/**
	 * ��ʼʱ��
	 */
	private int beginTime;
	/**
	 * ����ʱ��
	 */
	private int endTime;
	/**
	 * ��Ļ����
	 */
	private String srtBody;
	public int getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(int beginTime) {
		this.beginTime = beginTime;
	}
	public int getEndTime() {
		return endTime;
	}
	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}
	public String getsrtBody() {
		return srtBody;
	}
	public void setsrtBody(String srtBody) {
		this.srtBody = srtBody;
	}
}
