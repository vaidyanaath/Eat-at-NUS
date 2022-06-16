import * as Font from "expo-font";
    
export default useFonts = async () => {
    await Font.loadAsync({
        "SourceSansPro-Light": require("../assets/fonts/SourceSansPro-Light.ttf"),
        "SourceSansPro-Regular": require("../assets/fonts/SourceSansPro-Regular.ttf"),
        "SourceSansPro-SemiBold": require("../assets/fonts/SourceSansPro-SemiBold.ttf"),
        "SourceSansPro-Bold": require("../assets/fonts/SourceSansPro-Bold.ttf"),
    });
};