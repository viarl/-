package commom;

public class PageUtil {

	public static final int PAGE_SIZE=12;  //ÿҳ��������
	
	//������ҳ��
	public static int pages(int total){
		
		return (int)Math.ceil(total/(double)PAGE_SIZE);
	}
	
	//����ÿҳ����ʼ����
	
	public static int startPosition(int currentPage){
		
		return (currentPage-1)*PAGE_SIZE;
	}	
}
