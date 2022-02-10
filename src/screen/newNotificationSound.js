const newNotificationSound = senderName => {
    const sound = new Audio('/light.mp3');
  
    sound && sound.play();
  
    if (senderName) {
      document.title = `New Notification from ${senderName}`;
  
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          document.title = "Notification";
        }, 5000);
      }
    }
  };
  
  export default newNotificationSound;