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
 * 图形码工具类
 * @author zq
 */
public class ImageCodeUtil {
	
	/**
	 * 下面配置的这些常量，最好的办法就是通过配置文件来获取，下面直接写死了
	 */
	
	/**
	 * 图形码的宽
	 */
	private static final int IMAGE_CODE_WIDTH = 80;
	
	/**
	 * 图形码的高
	 */
	private static final int IMAGE_CODE_HEIGHT = 24;
	
	/**
	 * 图形码个数
	 */
	private static final int IMAGE_CODE_NUM = 4;
	
	/**
	 * 图形码最多干扰线数量
	 */
	private static final int IMAGE_CODE_MAX_LINE_NUM = 4;
	
	/**
	 * 图形码最小干扰线数量
	 */
	private static final int IMAGE_CODE_MIN_LINE_NUM = 2;
	
	/**
	 * 图片类型
	 */
	private static final String IMAGE_TYPE = "jpg";
	
	/**
	 * 图形码取数
	 */
	private static final String IMAGE_CODE_DATA = "ABCDEFGHIJKLMNOPQRSJUVWXYZabcdefghijklmnopqrsjuvwxyz0123456789";
	
	private static final Random rand = new Random();
	
	
	/**
	 * 生成图形码
	 * @param os OutputStream 接受 流
	 * @return String 图形码
	 */
	public static String generateSimpleImageCode(OutputStream os){
		return generateSimpleImageCode(os, true);
	}
	
	/**
	 * 生成图形码
	 * @param os OutputStream 接受 流
	 * @param drawLine boolean 是否画干扰线
	 * @return String 图形码
	 */
	public static String generateSimpleImageCode(OutputStream os, boolean drawLine){
		StringBuilder code = new StringBuilder();
		try {
			//创建一张图片
			BufferedImage image = new BufferedImage(IMAGE_CODE_WIDTH, IMAGE_CODE_HEIGHT, BufferedImage.TYPE_INT_RGB);
			
			//拿到画笔
			Graphics g = image.getGraphics();
			
			//画边框
			g.drawRect(0, 0, IMAGE_CODE_WIDTH, IMAGE_CODE_HEIGHT);
			g.setColor(Color.WHITE);
			g.fillRect(0, 0, IMAGE_CODE_WIDTH, IMAGE_CODE_HEIGHT);
			
			//产生随机码
			for(int i = 0; i < IMAGE_CODE_NUM; i++){
				int index = rand.nextInt(IMAGE_CODE_DATA.length());
				String str = String.valueOf(IMAGE_CODE_DATA.charAt(index));
				code.append(str);
				
				g.setFont(new Font("宋体", Font.PLAIN, 30));
				g.setColor(new Color(rand.nextInt(255), rand.nextInt(255), rand.nextInt(255)));
				g.drawString(str, 5 + 20 * i, 24);
			}
			
			if (drawLine) {
				int randLineNum = IMAGE_CODE_MIN_LINE_NUM + 
						rand.nextInt(IMAGE_CODE_MAX_LINE_NUM - IMAGE_CODE_MIN_LINE_NUM);
				//画干扰线
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
