declare module 'react-native-action-sheet-modal' {
  import { Component } from 'react';
  
  interface ActionSheetProps {
    visible: boolean;
    onRequestClose: () => void;
    // Add other props as needed
  }
  
  export default class ActionSheet extends Component<ActionSheetProps> {}
}