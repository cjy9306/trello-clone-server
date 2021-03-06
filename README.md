# Trello-clone server
포트폴리오용으로 제작된 Trello 클론 코딩 프로젝트의 서버입니다.  
  
서버는 Nodejs + Express를 사용하여 RESTful API 서버로 작성되었습니다.  

클라이언트 Repo: [https://github.com/cjy9306/trello-clone](https://github.com/cjy9306/trello-clone)


## 프로젝트 설치
```
git clone https://github.com/cjy9306/trello-clone-server.git
npm install
```

## 프로젝트 설치 및 실행
시작
```
npm start
```
빌드 환경의 경우 package.json의 NODE_ENV 환경변수를 변경하여 설정하실 수 있습니다.

## 프로젝트 구조
root
 - app.js: 프로젝트 root
 - utils: 공통 util
 - api: RESTful API 코드
   - controllers: route에서 사용하는 controller들
   - routes: 메인 route 파일들
   - services: 실제 DB를 조작하는 메인 로직들
 - config: 각종 환경 설정 폴더
 - models: DB관련 스키마 및 기본 설정
 
## 사용법
해당 프로젝트가 필요하신 분들은 아래 내용을 수정하신 후 사용하시면 됩니다.
1. mysql에 'trello' database 생성
2. 'trello' database에 root 폴더에 있는 schema.sql 스크립트를 이용하여 스키마 생성
3. root 폴더에 .env 파일 생성
4. config 폴더의 environment.js 파일의 DB설정
