# Инструкции по развёртыванию и сборке APK
## Установка
1. Клонируйте репозиторий:
```
git clone https://github.com/Annianara/cocktail-app
cd cocktail-app
```
2. Установите зависимости:
```
npm install
```
## Запуск в браузере (режим разработки)
```
ionic serve
```
## Сборка Android Debug APK
### Требования
- Node.js (версия 16+)
- npm
- Ionic CLI:
```
npm install -g @ionic/cli
```
- Capacitor:
```
npm install @capacitor/core @capacitor/cli
```
- Android Studio (для эмулятора/подписей/ADB)
- Java JDK 11+
### Шаги
1. Соберите проект:
```
ionic build
```
2. Синхронизируйте с платформой Android:
```
npx cap add android
npx cap sync
```
3. Откройте Android Studio (опционально):
```
npx cap open android
```
4. Перейдите в папку Android:
```
cd android
```
5. Соберите debug APK:
```
./gradlew assembleDebug
```
6. Готовый APK будет находиться по пути:
```
android/app/build/outputs/apk/debug/app-debug.apk
```