# Mockup Photo
-  [unsplash](https://source.unsplash.com/random)

# Add shadcn components
- [shadcn - components](https://ui.shadcn.com/docs/components)
```shell
pnpm dlx shadcn-ui@latest add calendar
```
# Set NEXTAUTH_SECRET
- `.env`
```shell
openssl rand -base64 32
```
# Create Firebase Secret Key
- `console` > `プロジェクトの設定` > `サービスアカウント` > `新しい秘密鍵を生成`
- `gitignore`にファイル名を追加
```
# Firebase
secretKey.json # ←ダウンロードした秘密鍵
```

# error??
- 2023/9/19 firebase auth のログインエラーが`auth/invalid-login-credentials` のみ

# deploy Firebase Admin SDK 
- [How to add Firebase service account json files to Vercel](https://dev.to/vvo/how-to-add-firebase-service-account-json-files-to-vercel-ph5)