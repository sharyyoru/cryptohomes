import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  StatusBar, 
  BackHandler, 
  Platform,
  ActivityIndicator,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

const APP_URL = 'https://cryptohomes-theta.vercel.app/';
const { width, height } = Dimensions.get('window');

export default function App() {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Handle Android back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleLoadEnd = async () => {
    setIsLoading(false);
    await SplashScreen.hideAsync();
  };

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  // Inject JavaScript to handle links internally and add app-specific styles
  const injectedJavaScript = `
    (function() {
      // Add webview-app class to body for app-specific styles
      document.body.classList.add('webview-app');
      
      // Intercept all link clicks to open internally
      document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && target.href) {
          const href = target.href;
          // Allow internal navigation
          if (href.startsWith('${APP_URL}') || href.startsWith('/') || !href.startsWith('http')) {
            return true;
          }
          // Open external links in WebView instead of external browser
          e.preventDefault();
          window.location.href = href;
          return false;
        }
      }, true);

      // Disable long press context menu
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });

      // Disable text selection for app-like feel
      document.documentElement.style.webkitUserSelect = 'none';
      document.documentElement.style.userSelect = 'none';
      
      // Notify React Native that page is ready
      window.ReactNativeWebView.postMessage('PAGE_LOADED');
    })();
    true;
  `;

  // Custom user agent to identify as mobile app
  const customUserAgent = Platform.select({
    android: 'CryptoHomesDXB/1.0 Android WebView',
    ios: 'CryptoHomesDXB/1.0 iOS WebView',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0a0a0f"
        translucent={false}
      />
      
      <WebView
        ref={webViewRef}
        source={{ uri: APP_URL }}
        style={styles.webview}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={handleNavigationStateChange}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsBackForwardNavigationGestures={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        userAgent={customUserAgent}
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"
        mixedContentMode="always"
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={(request) => {
          // Allow all requests to load internally
          return true;
        }}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D4AA" />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error:', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error:', nativeEvent.statusCode);
        }}
      />

      {isLoading && (
        <View style={styles.splashOverlay}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#00D4AA" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0f',
  },
  splashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0a0a0f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
