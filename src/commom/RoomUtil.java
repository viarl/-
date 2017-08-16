package commom;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.HashMap;
import java.util.Set;

public class RoomUtil {
	public static HashMap<String,Set<String>> rooms=new HashMap<String,Set<String>>();
	//public static HashMap<String,Integer> num=new HashMap<String, Integer>();
	public static int num;
	public static HashMap<String,String> playing=new HashMap<String,String>();
}
