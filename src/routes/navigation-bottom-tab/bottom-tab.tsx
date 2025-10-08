import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREEN } from '../../constants/screen-name';
import CustomBottomTabBar from './custom-bottom-tab-bar';
import LocalizeText from '@/localization/text-localize';
import { AccountScreen, HomeScreen } from '@/screens/bottom-tab-screens';
import { HomeIconFill, HomeIconUnfilled } from '@/assets/svg';
import { show_log } from '@/constants';

function BottomTab() {
  const { tabs } = LocalizeText;
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={props => <CustomBottomTabBar {...props} />}
      >
        <Tab.Screen
          name={SCREEN.homeScreen}
          component={HomeScreen}
          options={{
            tabBarLabel: tabs.tabHome,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeIconFill fill="#fff" />
              ) : (
                <HomeIconUnfilled fill="#fff" />
              ),
          }}
        />
        <Tab.Screen
          name={SCREEN.accountScreen}
          component={AccountScreen}
          options={{
            tabBarLabel: tabs.account,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeIconFill fill="#fff" />
              ) : (
                <HomeIconUnfilled fill="#fff" />
              ),
          }}
        />
        <Tab.Screen
          name={SCREEN.aboutUsScreen}
          component={AccountScreen}
          options={{
            tabBarLabel: tabs.account,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeIconFill fill="#fff" />
              ) : (
                <HomeIconUnfilled fill="#fff" />
              ),
          }}
        />
        <Tab.Screen
          name={SCREEN.changePasswordScreen}
          component={AccountScreen}
          options={{
            tabBarLabel: tabs.account,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeIconFill fill="#fff" />
              ) : (
                <HomeIconUnfilled fill="#fff" />
              ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default BottomTab;
