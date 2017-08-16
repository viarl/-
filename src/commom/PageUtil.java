package commom;

public class PageUtil {

	public static final int PAGE_SIZE=12;  //每页的数据量
	
	//计算总页数
	public static int pages(int total){
		
		return (int)Math.ceil(total/(double)PAGE_SIZE);
	}
	
	//计算每页的起始数据
	
	public static int startPosition(int currentPage){
		
		return (currentPage-1)*PAGE_SIZE;
	}	
}
