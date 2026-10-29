import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {theme} from '../src/theme';
export default function Layout(){return <><StatusBar style="dark"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:theme.background}}}/></>;}
