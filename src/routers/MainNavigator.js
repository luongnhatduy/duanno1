import { createStackNavigator ,createBottomTabNavigator} from 'react-navigation';
import ChangePasswordSrceen from './..//features/src/screen/login/ChangePasswordSrceen'
import ForgotPasswordScreen from './..//features/src/screen/login/ForgotPasswordScreen'
import InputOTPScreen from './..//features/src/screen/login/InputOTPScreen'
import SignInScreen from './..//features/src/screen/login/SignInScreen'
import SignUpScreen from './..//features/src/screen/login/SignUpScreen'
import HomeScreen from './..//features/src/screen/main/home/HomeScreen'
import Detail from './..//features/src/screen/main/home/Detail'
import MessengerScreen from './..//features/src/screen/main/messenger/MessengerScreen'
import ProFileScreen from './..//features/src/screen/main/profile/ProFileScreen';
import ChatDetail from './..//features/src/screen/main/messenger/ChatDetail'
import EditInfo from './..//features/src/screen/main/profile/EditInfo';
import FavoriteDetail from './..//features/src/screen/main/profile/FavoriteDetail';
import Vip from './..//features/src/screen/main/profile/Vip/Vip';
import UpgradeVip from './..//features/src/screen/main/profile/Vip/UpgradeVip';
import SplashScreen from './..//features/src/screen/Splash/SplashScreen';
import Local from './..//features/src/screen/local/local';
import Fillter from './..//features/src/screen/main/home/Fillter';
import PersonalInformation from './..//features/src/screen/local/PersonalInformation/PersonalInformation';
import Birdth from './..//features/src/screen/local/PersonalInformation/birdth';
import Gender from './..//features/src/screen/local/PersonalInformation/gender';
import Username from './..//features/src/screen/local/PersonalInformation/username';
import Hobbies from './..//features/src/screen/local/PersonalInformation/hobbies';
import Information from './..//features/src/screen/local/PersonalInformation/infomation';
import Setting from './..//features/src/screen/main/profile/Setting/Setting';
import Aboutme from './..//features/src/screen/main/profile/Aboutme/Aboutme';
import Protect from './..//features/src/screen/main/profile/Protect/Protect';
import Infordetail from './..//features/src/libraries/component/infordetail';
import InforDetaillangue from './..//features/src/libraries/component/infodetaillangue'
import Registrationform from './..//features/src/screen/login/registrationform'
const TabBar = createBottomTabNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    MessengerScreen: { screen: MessengerScreen },
    ProFileScreen: { screen: ProFileScreen },
  },
  {
    tabBarOptions: {
      activeTintColor: '#FFCB78',
      inactiveTintColor: 'white',
      showLabel: false,
      tabStyle: {
        backgroundColor: '#183D57',
      },
    },
  }
);

const MainNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Local: {
    screen: Local,
    navigationOptions: {
      header: null,
    },
  },
  
  
  Birdth: {
    screen: Birdth,
    navigationOptions: {
      header: null,
    },
  },
  Information: {
    screen: Information,
    navigationOptions: {
      header: null,
    },
  },
  Username: {
    screen: Username,
    navigationOptions: {
      header: null,
    },
  },
 
  
 
    
  Registrationform: {
    screen: Registrationform,
    navigationOptions: {
      header: null,
    },
  },
 
  Aboutme: {
    screen: Aboutme,
    navigationOptions: {
      header: null,
    },
  },
  
 
  Hobbies: {
    screen: Hobbies,
    navigationOptions: {
      header: null,
    },
  },
  
  TabBar: {
    screen: TabBar,
    navigationOptions: {
      header: null,
    },
  },
 
  
  
 
  EditInfo: {
    screen: EditInfo,
    navigationOptions: {
      header: null,
    },
  },
  InforDetaillangue: {
    screen: InforDetaillangue,
    navigationOptions: {
      header: null,
    },
  },
  
  
  
  Infordetail: {
    screen: Infordetail,
    navigationOptions: {
      header: null,
    },
  },
  
  PersonalInformation: {
    screen: PersonalInformation,
    navigationOptions: {
      header: null,
    },
  },
  Gender: {
    screen: Gender,
    navigationOptions: {
      header: null,
    },
  },
  
  
  Protect: {
    screen: Protect,
    navigationOptions: {
      header: null,
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      header: null,
    },
  },

  Detail: {
    screen: Detail,
    navigationOptions: {
      header: null,
    },
  },
  
  Fillter: {
    screen: Fillter,
    navigationOptions: {
      header: null,
    },
  },
  

  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
    },
  },
  FavoriteDetail: {
    screen: FavoriteDetail,
    navigationOptions: {
      header: null,
    },
  },
  UpgradeVip: {
    screen: UpgradeVip,
    navigationOptions: {
      header: null,
    },
  },
  Vip: {
    screen: Vip,
    navigationOptions: {
      header: null,
    },
  },


  ChatDetail: {
    screen: ChatDetail,
    navigationOptions: {
      header: null,
    },
  },

  ChangePasswordSrceen: {
    screen: ChangePasswordSrceen,
    navigationOptions: {
      header: null,
    },
  },

  ForgotPasswordScreen: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
  InputOTPScreen: {
    screen: InputOTPScreen,
    navigationOptions: {
      header: null,
    },
  },
}
);
export default MainNavigator;
