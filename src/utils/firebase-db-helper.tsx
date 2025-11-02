import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';


//Database
const usersTableRef = database().ref('/users');
const prodCategoryTableRef = database().ref('/category');
const postTableRef = database().ref('/posts');
const bannerTableRef = database().ref('/banner');

// Storage
const storagePkg = storage();

// ******* Users *******
const getUserDetail = (userId, onUserDetailCallBack) => {
  console.log('Fetch user Detail-*>', userId);
  usersTableRef
    .child(userId)
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
      if (snapshot.val()) {
        onUserDetailCallBack(snapshot.val());
      }
    });
};

const saveUserDetail = (info, userId) => {
  console.log('info****', info);
  database()
    .ref(`/users/${userId}`)
    .set(info)
    .then(snap => console.log('Data updated:', snap));
};

const getAllUsers = onResponse => {
  usersTableRef.once('value').then(snapshot => {
    const snapObj = snapshot.val();

    const allKeys = Object.keys(snapObj);
    var allPost = [];
    allKeys.forEach(item => {
      const itemData = snapObj[item];
      allPost.push(itemData);
    });
    console.log('Get All Users data: ', allPost);
    onResponse(allPost);
  });
};

const getAllUsersCount = onResponse => {
  usersTableRef.once('value').then(snapshot => {
    const snapObj = snapshot.numChildren();
    //console.log('All post data: ', snapObj);
    onResponse(snapObj);
  });
};

const logoutUser = async () => {
  try {
    await auth().signOut();
  } catch (e) {
    console.log(e);
  }
};

// ******* Category *******
const addNewCategory = (categoryName, onRecordUpdate) => {
  const newReference = prodCategoryTableRef.push();
  const keyObj = newReference.key;
  console.log('Auto generated key: ', keyObj);

  const catInfo = {
    category_id: keyObj,
    categoryName: categoryName,
  };

  newReference.set(catInfo).then(snap => {
    console.log('Category added.', snap);
    onRecordUpdate(snap);
  });

  // prodCategoryTableRef.once('value').then(snapshot => {
  //   console.log('Category data: ', snapshot.val());
  // });
};

const getPostCategory = onResponse => {
  prodCategoryTableRef.once('value').then(snapshot => {
    //console.log('Category data: ', snapshot.val());
    onResponse(snapshot.val());
  });
};

const deleteCategory = (cateId, onCompletion) => {
  console.log('cateId', cateId);
  const newReference = prodCategoryTableRef.child(cateId);
  newReference.remove().then(snap => {
    console.log('Data Deleted.', snap);
    onCompletion(snap);
  });
};

// ******* Posts *******
const savePostDetail = (info, onCompletion) => {
  const newReference = postTableRef.push();
  const keyObj = newReference.key;
  console.log('Auto generated key: ', newReference.key);
  const updatedInfo = info;
  updatedInfo.postId = keyObj;
  console.log('updatedInfo', updatedInfo);
  newReference
    .set(updatedInfo)
    .then((snap) => {
      console.log('Data Added.', snap);
      onCompletion('New', snap);
    })
    .catch(e => {
      console.log('Error', e);
    });
};

const updateUserDetail = (userId, info, onCompletion) => {
  const newReference = usersTableRef.child(userId);
  newReference.update(info).then(snap => {
    console.log('Data updated.', snap);
    onCompletion('Updated', snap);
  });
};

const updatePostDetail = (postId, info, onCompletion) => {
  const newReference = postTableRef.child(postId);
  newReference.update(info).then(snap => {
    console.log('Data updated.', snap);
    onCompletion('Updated', snap);
  });
};

const getAllPost = onResponse => {
  postTableRef.once('value').then(snapshot => {
    //console.log('All post data: ', snapObj);
    if (snapshot.val()) {
      const snapObj = snapshot.val();
      onResponse(snapObj);
    }
  });
};

const totalPostCount = onResponse => {
  postTableRef.once('value').then(snapshot => {
    const snapObj = snapshot.numChildren();
    //console.log('All post data: ', snapObj);
    onResponse(snapObj);
  });
};

const deletePosts = (postId, onCompletion) => {
  console.log('postId', postId);
  const newReference = postTableRef.child(postId);
  newReference.remove().then(snap => {
    console.log('Post Deleted.', snap);
    onCompletion(snap);
  });
};

const parsingPostData = (snapObj, allCategory, allUsers) => {
  const allKeys = Object.keys(snapObj);
  var allPost = [];
  allKeys.forEach(item => {
    const itemData = snapObj[item];
    const catObj = allCategory.filter(
      category => category.category_id === itemData.category,
    );
    const companyObj = allUsers.filter(user => user.uid === itemData.createdBy);
    itemData.categoryName = catObj[0]?.categoryName ?? '';
    itemData.companyName = companyObj[0].displayName ?? '';
    itemData.address = companyObj[0].address ?? '';
    itemData.phoneNumber = companyObj[0].phoneNumber ?? '';
    allPost.push(itemData);
  });

  const sorted = allPost.sort((a, b) => {
    const datea = new Date(a.createdAt);
    const dateb = new Date(b.createdAt);
    if (datea < dateb) {
      return 1; // return -1 here for desc order
    }
    return -1; // return 1 here for desc order
  });

  return sorted;
};

// ******* Banner *******
const createNewBannerRequest = (fileObj, onRecordUpdate) => {
  const newReference = bannerTableRef.push();
  const keyObj = newReference.key;
  console.log('Auto generated key: ', keyObj);

  const bannerInfo = {
    bannerId: keyObj,
  };

  let mergedBanner = {...bannerInfo, ...fileObj};

  newReference.set(mergedBanner).then(snap => {
    console.log('Category added.', snap);
    onRecordUpdate(snap);
  });
};

const getAllBanners = onResponse => {
  bannerTableRef.once('value').then(snapshot => {
    var allBanner = [];
    if (snapshot.val()) {
      const snapObj = snapshot.val();
      const allKeys = Object.keys(snapObj);

      allKeys.forEach(item => {
        const itemData = snapObj[item];
        allBanner.push(itemData);
      });
    }
    onResponse(allBanner);
  });
};

const firebaseDeleteBanner = (bannerId, onCompletion) => {
  console.log('bannerId', bannerId);
  const newReference = bannerTableRef.child(bannerId);
  newReference.remove().then(snap => {
    console.log('Post Deleted.', snap);
    onCompletion(snap);
  });
};

// ******* Storage *******
const storeFilePath = async (pathToFile, fileName, onFileUpload) => {
  console.log('pathToFile:***', pathToFile);
  console.log('fileName:****', fileName);
  const task = storagePkg.ref(fileName).putFile(pathToFile);

  // set progress state
  task.on('state_changed', snapshot => {
    const progress =
      Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000;
    console.log('progress', progress);
  });
  task.then(async snap => {
    console.log('Image uploaded to the bucket!', snap);
    const fullPath = snap.metadata.fullPath;
    const downloadUrl = await storagePkg
      .ref(snap.metadata.fullPath)
      .getDownloadURL();
    console.log('Download file url', downloadUrl);
    onFileUpload(fullPath, downloadUrl);
  });
};

const removeFileFromStorage = (fileName, onFileDelete) => {
  console.log('Call remove file:', fileName);
  const task = storagePkg.ref(fileName).delete();

  task
    .then(async snap => {
      console.log('Image File Deleted!', snap);
      onFileDelete();
    })
    .catch(err => {
      console.log('Delete file error', err);
      onFileDelete();
    });
};


// Firebase permission (mainly for iOS)
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
    await getFcmToken();
  } else {
    console.log('Notification permission denied.');
  }
};

export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      // Optionally send token to backend
    }
  } catch (error) {
    console.log('Error fetching FCM token:', error);
  }
};

export {
  usersTableRef,
  saveUserDetail,
  getUserDetail,
  logoutUser,
  storeFilePath,
  removeFileFromStorage,
  savePostDetail,
  getPostCategory,
  addNewCategory,
  getAllPost,
  totalPostCount,
  parsingPostData,
  updatePostDetail,
  updateUserDetail,
  getAllUsers,
  getAllUsersCount,
  deleteCategory,
  deletePosts,
  createNewBannerRequest,
  getAllBanners,
  firebaseDeleteBanner,
};
