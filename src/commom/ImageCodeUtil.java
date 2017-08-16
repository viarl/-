package commom;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;

/**
 * ͼ���빤����
 * @author zq
 */
public class ImageCodeUtil {
	
	/**
	 * �������õ���Щ��������õİ취����ͨ�������ļ�����ȡ������ֱ��д����
	 */
	
	/**
	 * ͼ����Ŀ�
	 */
	private static final int IMAGE_CODE_WIDTH = 80;
	
	/**
	 * ͼ����ĸ�
	 */
	private static final int IMAGE_CODE_HEIGHT = 24;
	
	/**
	 * ͼ�������
	 */
	private static final int IMAGE_CODE_NUM = 4;
	
	/**
	 * ͼ����������������
	 */
	private static final int IMAGE_CODE_MAX_LINE_NUM = 4;
	
	/**
	 * ͼ������С����������
	 */
	private static final int IMAGE_CODE_MIN_LINE_NUM = 2;
	
	/**
	 * ͼƬ����
	 */
	private static final String IMAGE_TYPE = "jpg";
	
	/**
	 * ͼ����ȡ��
	 */
	private static final String IMAGE_CODE_DATA = "ABCDEFGHIJKLMNOPQRSJUVWXYZabcdefghijklmnopqrsjuvwxyz0123456789";
	
	private static final Random rand = new Random();
	
	
	/**
	 * ����ͼ����
	 * @param os OutputStream ���� ��
	 * @return String ͼ����
	 */
	public static String generateSimpleImageCode(OutputStream os){
		return generateSimpleImageCode(os, true);
	}
	
	/**
	 * ����ͼ����
	 * @param os OutputStream ���� ��
	 * @param drawLine boolean �Ƿ񻭸�����
	 * @return String ͼ����
	 */
	public static String generateSimpleImageCode(OutputStream os, boolean drawLine){
		StringBuilder code = new StringBuilder();
		try {
			//����һ��ͼƬ
			BufferedImage image = new BufferedImage(IMAGE_CODE_WIDTH, IMAGE_CODE_HEIGHT, BufferedImage.TYPE_INT_RGB);
			
			//�õ�����
			Graphics g = image.getGraphics();
			
			//���߿�
			g.drawRect(0, 0, IMAGE_CODE_WIDTH, IMAGE_CODE_HEIGHT);
			g.setColor(Color.WHITE);
			g.fillRect(0, 0, IMAGE_CODE_WIDTH, IMAGE_CODE_HEIGHT);
			
			//���������
			for(int i = 0; i < IMAGE_CODE_NUM; i++){
				int index = rand.nextInt(IMAGE_CODE_DATA.length());
				String str = String.valueOf(IMAGE_CODE_DATA.charAt(index));
				code.append(str);
				
				g.setFont(new Font("����", Font.PLAIN, 30));
				g.setColor(new Color(rand.nextInt(255), rand.nextInt(255), rand.nextInt(255)));
				g.drawString(str, 5 + 20 * i, 24);
			}
			
			if (drawLine) {
				int randLineNum = IMAGE_CODE_MIN_LINE_NUM + 
						rand.nextInt(IMAGE_CODE_MAX_LINE_NUM - IMAGE_CODE_MIN_LINE_NUM);
				//��������
				for(int i = 0; i < randLineNum; i++){
					g.setColor(new Color(rand.nextInt(255), rand.nextInt(255), rand.nextInt(255)));
					g.drawLine(rand.nextInt(IMAGE_CODE_WIDTH), 
							rand.nextInt(IMAGE_CODE_HEIGHT), 
							rand.nextInt(IMAGE_CODE_WIDTH), 
							rand.nextInt(IMAGE_CODE_HEIGHT));
				}
			}
			ImageIO.write(image, IMAGE_TYPE, os);
			return code.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static void main(String[] args) throws Exception{
		System.out.println(IMAGE_CODE_DATA.length());
		FileOutputStream fos = new FileOutputStream("c:\\imagecode.jpg");
		String code  = generateSimpleImageCode(fos);
		fos.close();
		System.out.println(code);
	}
}
