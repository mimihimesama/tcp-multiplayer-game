import { addUser } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getGameSession } from '../../session/game.session.js';
import { createUser, findUserByDeviceID, updateUserLogin } from '../../db/user/user.db.js';
import User from '../../classes/models/user.class.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;

    let user = await findUserByDeviceID(deviceId);
    const coords = {};

    if (!user) {
      await createUser(deviceId);
    } else {
      await updateUserLogin(deviceId);
      coords.x = user.xCoord;
      coords.y = user.yCoord;
    }

    user = new User(socket, deviceId, playerId, latency, coords);

    addUser(user);
    const gameSession = getGameSession();
    gameSession.addUser(user);

    // 유저 정보 응답 생성
    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
      userId: deviceId,
      x: user.x,
      y: user.y,
    });

    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;
