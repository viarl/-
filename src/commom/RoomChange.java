package commom;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class RoomChange {

	public static PropertyChangeSupport changes = new PropertyChangeSupport(new RoomUtil()); 
	public static void addPropertyChangeListener(PropertyChangeListener listener) {
		changes.addPropertyChangeListener(listener) ;
	}
	public static void removePropertyChangeListener(PropertyChangeListener listener) {
		changes.removePropertyChangeListener(listener) ;
	}	
}
