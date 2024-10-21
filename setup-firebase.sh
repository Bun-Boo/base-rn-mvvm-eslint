#!/bin/bash

# Kiểm tra xem script có chạy từ thư mục dự án không
if [ ! -f "package.json" ]; then
  echo "Please run this script from the root of your React Native project."
  exit 1
fi

# Đường dẫn đến thư mục dự án
PROJECT_DIR=$(pwd)

# 1. Cài đặt các package Firebase
npm install --save @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore

# 2. Thông báo cài đặt hoàn tất
echo "Firebase packages installed."

# 3. Sao chép google-services.json vào android/app
if [ -f "google-services.json" ]; then
  cp google-services.json android/app/
  echo "google-services.json has been copied to android/app."
else
  echo "Error: google-services.json not found. Please place it in the project root."
  exit 1
fi

# 4. Sao chép GoogleService-Info.plist vào ios/[project_name]
if [ -f "GoogleService-Info.plist" ]; then
  cp GoogleService-Info.plist ios/$PROJECT_NAME/
  echo "GoogleService-Info.plist has been copied to ios/$PROJECT_NAME."
else
  echo "Error: GoogleService-Info.plist not found. Please place it in the project root."
  exit 1
fi

# 5. Cập nhật android/build.gradle
if ! grep -q "classpath 'com.google.gms:google-services:4.3.10'" android/build.gradle; then
  echo "Applying changes to android/build.gradle..."
  echo "classpath 'com.google.gms:google-services:4.3.10'" >> android/build.gradle
else
  echo "No changes needed in android/build.gradle."
fi

# 6. Cập nhật android/app/build.gradle
if ! grep -q "apply plugin: 'com.google.gms.google-services'" android/app/build.gradle; then
  echo "Applying changes to android/app/build.gradle..."
  echo "apply plugin: 'com.google.gms.google-services'" >> android/app/build.gradle
else
  echo "No changes needed in android/app/build.gradle."
fi

# 7. Hướng dẫn cài đặt CocoaPods cho iOS
echo "Don't forget to run 'cd ios && pod install' to install CocoaPods dependencies."

# 8. Thông báo hoàn tất
echo "Firebase setup completed. Please check the logs for any issues."
