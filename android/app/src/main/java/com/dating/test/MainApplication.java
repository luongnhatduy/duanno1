package com.dating.test;

import android.app.Application;

import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.ashideas.rnrangeslider.RangeSliderPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import java.util.Arrays;
import java.util.List;

import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;

public class MainApplication extends Application implements ReactApplication {

private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAndroidLocationEnablerPackage(),
           new RNFirebasePackage(),
            new PickerPackage(),
            new RNGoogleSigninPackage(),
            new RangeSliderPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNVersionCheckPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new RNGestureHandlerPackage(),
            new FastImageViewPackage(),
            new AsyncStoragePackage(),
            new RNFirebaseAuthPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
