# tcp-multiPlayer-game

## 패킷 구조

### • 바이트 배열의 구조

| 필드 명     | 타입     | 설명                 | 크기   |
| ----------- | -------- | -------------------- | ------ |
| totalLength | int      | 메세지의 전체 길이   | 4 Byte |
| packetType  | int      | 패킷의 타입          | 1 byte |
| protobuf    | protobuf | 프로토콜 버퍼 구조체 | 가변   |

### • 프로토버프

#### common

| 필드 명       | 타입   | 설명            |
| ------------- | ------ | --------------- |
| handlerId     | uint32 | 핸들러 ID       |
| userId        | string | 유저 ID (UUID)  |
| clientVersion | string | 클라이언트 버전 |
| payload       | bytes  | 실제 데이터     |

#### game

| 필드 명 | 타입  | 설명         |
| ------- | ----- | ------------ |
| x       | float | 유저의 x좌표 |
| y       | float | 유저의 y좌표 |

#### initial

| 필드 명  | 타입   | 설명                         |
| -------- | ------ | ---------------------------- |
| deviceId | string | 유저의 UUID 또는 디바이스 ID |
| playerId | uint32 | 유저의 캐릭터 종류           |
| latency  | float  | 유저의 응답 속도             |

#### gameNotification

| 필드 명  | 타입   | 설명               |
| -------- | ------ | ------------------ |
| id       | string | 유저 ID            |
| playerId | uint32 | 유저의 캐릭터 종류 |
| x        | float  | 유저의 x좌표       |
| y        | float  | 유저의 y좌표       |

#### response

| 필드 명      | 타입   | 설명                                     |
| ------------ | ------ | ---------------------------------------- |
| handlerId    | uint32 | 핸들러 ID                                |
| responseCode | uint32 | 응답 코드 (성공: 0, 실패: 에러 코드)     |
| timestamp    | int64  | 메시지 생성 타임스탬프 (Unix 타임스탬프) |
| data         | bytes  | 실제 응답 데이터                         |
