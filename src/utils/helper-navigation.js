import * as React from 'react';
import {StackActions} from '@react-navigation/native';


export const globalNavigationRef = React.createRef();

export function globalNavigate(name, param) {
  globalNavigationRef?.current?.dispatch(StackActions.replace(name, param));
}

export function NavigateTo(screenName, screenParam) {
  globalNavigationRef?.current?.navigate(screenName, screenParam);
}
export function PushTo(screenName, screenParam) {
  globalNavigationRef?.current?.dispatch(
    StackActions.push(screenName, screenParam),
  );
}

export async function navigateFromRoute(notificationPayLoads) {
  const {data = {}, userInteraction = false} = notificationPayLoads;
  const {payload = '', type = ''} = data;
  const screenJsonData = JSON.parse(payload);

  if (userInteraction === true) {
    // switch (type) {
    //   case NOTIFICATION_TYPES.email: {
    //     globalNavigationRef?.current?.navigate(SCREEN.emailDetailsScreen, {
    //       itemData: {...{screenJsonData}, id: screenJsonData?.email_id},
    //     });

    //     break;
    //   }
    //   case NOTIFICATION_TYPES.condition:
    //   case NOTIFICATION_TYPES.possession:
    //     if (screenJsonData?.type === 'buyer') {
    //       globalNavigationRef?.current?.navigate(SCREEN.dealsScreen, {
    //         screen: SCREEN.buyerScreen,
    //         params: {...data, payload: screenJsonData},
    //       });
    //     } else if (data?.payload?.type === 'seller') {
    //       globalNavigationRef?.current?.navigate(SCREEN.dealsScreen, {
    //         screen: SCREEN.sellerScreen,
    //         params: {...data, payload: screenJsonData},
    //       });
    //     } else if (data?.payload?.type === 'referral') {
    //       globalNavigationRef?.current?.navigate(SCREEN.dealsScreen, {
    //         screen: SCREEN.myReferralScreen,
    //         params: {...data, payload: screenJsonData},
    //       });
    //     }
    //     break;
    //   case NOTIFICATION_TYPES.birthday:
    //     globalNavigationRef?.current?.navigate(
    //       SCREEN.peopleDetailScreen,
    //       screenJsonData,
    //     );
    //   case NOTIFICATION_TYPES.task:
    //   case NOTIFICATION_TYPES.schedule:
    //     const taskAssignee = screenJsonData?.taskAssignee || [];
    //     const guests = screenJsonData?.guests || [];

    //     const clientId = taskAssignee[0]?.assignee?.id || guests[0]?.client?.id;
    //     if (clientId) {
    //       globalNavigationRef?.current?.navigate(SCREEN.peopleDetailScreen, {
    //         id: clientId,
    //       });
    //     } else {
    //       globalNavigationRef?.current?.navigate(SCREEN.calendarScreen, {
    //         screen: SCREEN.taskScreen,
    //         params: {
    //           ...data,
    //           customDate:
    //             screenJsonData?.due_date ||
    //             screenJsonData?.meeting_datetime ||
    //             new Date(),
    //         },
    //       });
    //     }

    //     break;
    //   case NOTIFICATION_TYPES.lead_assigned:
    //   case 'lead-assigned':
    //     if (screenJsonData?.client_id) {
    //       globalNavigationRef?.current?.navigate(SCREEN.peopleDetailScreen, {
    //         id: screenJsonData?.client_id,
    //       });
    //     } else {
    //       globalNavigationRef?.current?.navigate(SCREEN.peopleScreen);
    //     }

    //     break;

    //   default: {
    //     break;
    //   }
    // }
  }
}
