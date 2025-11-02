import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/routers";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import * as types from '@redux/actions/action-list'
import { asyncStorageRemove, STORE_KEY } from "@/utils";

// Firebase / API
import { getAllUsers, getPostCategory } from "@/utils/firebase-db-helper";
import {getRequest, TRAIL_URLS} from "@/api-services";

//Component
import { BaseContainer } from "@/components/utilities";

// Utils | Constants
import { USER_ROLE_NAME } from "@/utils/app-enum";
import { SCREEN } from "@/utils/screen-name";
import { APP } from "@/utils/constants";
import { COLORS } from "@/theme";

export default function LandingScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const KEY = route?.params;

  const [loading, setLoading] = useState(true);
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const isUserLoginDone = useSelector((v) => v?.userInfoReducer?.isUserLogin);
  const userRole = useSelector((v) => v?.appReducer?.userRole);

  useEffect(() => {
    checkLandingFlow();
  }, []);

  function checkLandingFlow() {
    if (KEY === "RESET") {
      console.log("reset");
      cleanUp();
      storageCleanUp();
      navigateTo(SCREEN.LoginScreen);
    } else {
        console.log('isUserLoginDone', isUserLoginDone);
      console.log("userRole", userRole);
      if (isUserLoginDone) {
        getMasterData();
      } else {
        navigateTo(SCREEN.LoginScreen);
      }
    }
  }

  function getMasterData() {
    getPostCategory(onResponse);
    getAllUsers(onAllUserResponse);
  }

  function onResponse(res) {
    console.log('*** On Master Data Res:', res);
    const allKeys = Object.keys(res);
    const allCategory = [];
    allKeys.forEach((key, index) => {
      const object = res[key];
      allCategory.push(object);
    });
    dispatch({ type: types.APP_MASTER_DATA, data: allCategory });
  }

  function onAllUserResponse(res) {
    console.log('*** On All User res:', res);
    dispatch({ type: types.APP_USERS_DATA, data: res });

    dbConnectionStart();
    if (userRole === USER_ROLE_NAME.Owner) {
      navigateTo(SCREEN.AdminDashboardScreen);
    } else {
      navigateTo(SCREEN.AdminDashboardScreen);
      //navigateTo(SCREEN.CustomerOnboardingScreen);
    }
  }

  function dbConnectionStart() {
    if (netConnected) {
      const param = {};
      let api = `${TRAIL_URLS.startConnection}`;
      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log(
              "***> DB CONNECTION response ==>",
              JSON.stringify(response)
            );
          }
          if (response?.success == true) {
          }
        })
        .catch((e) => {
          console.log("*** Error", e);
        });
    } else {
      console.log("*** INTERNET NOT AVAILABLE");
    }
  }

  async function cleanUp() {
    dispatch({ type: types.CLEAR_DATA });
    dispatch({ type: types.IS_USER_LOGIN, data: false });
  }

  async function storageCleanUp() {
    await asyncStorageRemove(STORE_KEY.LOGIN_TOKEN);
  }

  function navigateTo(routeName) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  }

  if (loading) {
    return (
      <BaseContainer isTopSafeArea={false} isBottomSafeArea={false}>
        <ActivityIndicator
          size="large"
          color={COLORS.black}
          style={styles.container}
        />
      </BaseContainer>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
