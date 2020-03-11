class ChessPiece {
  /**
   * 左上角为坐标（1,1）
   * @param {Number} x x坐标
   * @param {Number} y y坐标
   * @param {String} name 名称
   * @param {String} side 所属方（red or blue）
   */
  constructor(x, y, name, side){
    if(!Number.isInteger(x) || !Number.isInteger(y)
        || typeof name !== 'string'
        || name.length !== 1
        || typeof side !== 'string'
        || x < 1
        || x > 10
        || y < 1
        || y > 11) {
      throw new Error('【ChessPiece构造函数的参数不满足需求】');
    }
    this.x = x;
    this.y = y;
    this.name = name;
    this.side = side;
    this.selected = false;
  };

  /**
   * 创建32枚棋子
   * @returns {Array} 棋子数组
   */
  static createChess() {
    const chessPieces = [];
    // const chessBoardArray = [];
    // for(let i = 0; i < 11; i++) {
    //   chessBoardArray[i] = [];
    //   for(let j = 0; j < 10; j++) {
    //   }
    // }
    // 兵卒
    for(let i = 1; i < 10; i += 2) {
      chessPieces.push(new ChessPiece(i, 4, '卒', 'blue'));
      chessPieces.push(new ChessPiece(i, 7, '兵', 'red'));
    }
    // 炮
    for(let i = 2; i < 9; i += 6) {
      chessPieces.push(new ChessPiece(i, 3, '砲', 'blue'));
      chessPieces.push(new ChessPiece(i, 8, '炮', 'red'));
    }
    // 車
    for(let i = 1; i < 10; i += 8) {
      chessPieces.push(new ChessPiece(i, 1, '車', 'blue'));
      chessPieces.push(new ChessPiece(i, 10, '車', 'red'));
    }
    // 马
    for(let i = 2; i < 9; i += 6) {
      chessPieces.push(new ChessPiece(i, 1, '馬', 'blue'));
      chessPieces.push(new ChessPiece(i, 10, '馬', 'red'));
    }
    // 相
    for(let i = 3; i < 8; i += 4) {
      chessPieces.push(new ChessPiece(i, 1, '象', 'blue'));
      chessPieces.push(new ChessPiece(i, 10, '相', 'red'));
    }
    // 士
    for(let i = 4; i < 7; i += 2) {
      chessPieces.push(new ChessPiece(i, 1, '仕', 'blue'));
      chessPieces.push(new ChessPiece(i, 10, '士', 'red'));
    }
    // 将帅
    chessPieces.push(new ChessPiece(5, 1, '將', 'blue'));
    chessPieces.push(new ChessPiece(5, 10, '帥', 'red'));
    return chessPieces;
  };

  /**
   * @param {Number} unitLength 棋盘单元格宽度/高度
   * @returns {Object} canvas dom
   */
  static drawChessboard(unitLength) {
    if(!unitLength || isNaN(unitLength) || unitLength < 0)
      throw new Error('棋盘单元格长度必须是正数');
    // 绘制棋盘并存缓存
    const chessBoard = document.createElement('canvas');
    chessBoard.width = unitLength * 10;
    chessBoard.height = unitLength * 11;
    const context = chessBoard.getContext('2d');
    context.save();
    context.beginPath();
    // 纵线
    for (let i = 1; i < 10; i++) {
      context.moveTo(i * unitLength, unitLength);
      if(i != 1 && i != 9) {
        context.lineTo(i * unitLength, unitLength * 5);
        context.moveTo(i * unitLength, unitLength * 6);
      }
      context.lineTo(i * unitLength, unitLength * 10);
    }
    // 横线
    for (let i = 1; i < 11; i++) {
      context.moveTo(unitLength, i * unitLength);
      context.lineTo(9 * unitLength, i * unitLength);
    }
    // 九宫斜线
    context.moveTo(unitLength * 4, unitLength);
    context.lineTo(unitLength * 6, unitLength * 3);
    context.moveTo(unitLength * 4, unitLength * 3);
    context.lineTo(unitLength * 6, unitLength);
    context.moveTo(unitLength * 4, unitLength * 8);
    context.lineTo(unitLength * 6, unitLength * 10);
    context.moveTo(unitLength * 4, unitLength * 10);
    context.lineTo(unitLength * 6, unitLength * 8);
    // 兵卒四角
    const bingzuLineLength = unitLength / 5;
    const bingzuLineMargin = unitLength / 10;
    for(let j = 4; j < 8; j += 3) {
      const y = unitLength * j;
      for(let i = 1; i < 10; i += 2) {
        const x = unitLength * i;
        let startX;
        let startY;
        if(i !== 1) {
          // 非左边缘 左上角
          startX = x - bingzuLineMargin;
          startY = y - bingzuLineMargin - bingzuLineLength;
          context.moveTo(startX, startY);
          startY += bingzuLineLength;
          context.lineTo(startX, startY);
          startX -= bingzuLineLength;
          context.lineTo(startX, startY);
          // 左下角
          startY += (bingzuLineMargin * 2 + 1);
          context.moveTo(startX, startY);
          startX += bingzuLineLength;
          context.lineTo(startX, startY);
          startY += bingzuLineLength;
          context.lineTo(startX, startY);
        }
        if(i !== 9) {
          // 非右边缘 右上角
          startX = x + bingzuLineMargin;
          startY = y - bingzuLineMargin - bingzuLineLength;
          context.moveTo(startX, startY);
          startY += bingzuLineLength;
          context.lineTo(startX, startY);
          startX += bingzuLineLength;
          context.lineTo(startX, startY);
          // 左上角
          startY += (bingzuLineMargin * 2 + 1);
          context.moveTo(startX, startY);
          startX -= bingzuLineLength;
          context.lineTo(startX, startY);
          startY += bingzuLineLength;
          context.lineTo(startX, startY);
        }
      }
    }
    // 炮四角
    for(let i = 2; i < 9; i += 6) {
      for(let j = 3; j < 9; j += 5) {
        let startX = unitLength * i - bingzuLineMargin;
        let startY = unitLength * j - bingzuLineLength - bingzuLineMargin;
        // 左上角
        context.moveTo(startX, startY);
        startY += bingzuLineLength;
        context.lineTo(startX, startY);
        startX -= bingzuLineLength;
        context.lineTo(startX, startY);
        startY += (bingzuLineMargin * 2);
        // 左下角
        context.moveTo(startX, startY);
        startX += bingzuLineLength;
        context.lineTo(startX, startY);
        startY += bingzuLineLength;
        context.lineTo(startX, startY);
        startX += (bingzuLineMargin * 2);
        // 右下角
        context.moveTo(startX, startY);
        startY -= bingzuLineLength;
        context.lineTo(startX, startY);
        startX += bingzuLineLength;
        context.lineTo(startX, startY);
        startY -= (bingzuLineMargin * 2);
        // 右上角
        context.moveTo(startX, startY);
        startX -= bingzuLineLength;
        context.lineTo(startX, startY);
        startY -= bingzuLineLength;
        context.lineTo(startX, startY);
      }
    }
    context.lineWidth = 1;
    context.strokeStyle = '#888888';
    context.stroke();
    context.restore();
    context.save();
    context.rotate(Math.PI / 2);
    context.font = `${unitLength / 2}px 楷体`;
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText("楚",unitLength * 5.5, -unitLength * 8);
    context.fillText("河",unitLength * 5.5, -unitLength * 7);
    context.restore();
    context.save();
    context.translate(0, chessBoard.height);
    context.rotate(3 * Math.PI / 2);
    context.fillStyle = 'red';
    context.font = `${unitLength / 2}px 楷体`;
    context.textAlign = 'center';
    context.fillText("漢",unitLength * 5.5, unitLength * 2);
    context.fillText("界",unitLength * 5.5, unitLength * 3);
    context.restore();

    return chessBoard;
  };

  /**
   * 判断是否是同一方的棋子
   * @param {ChessPiece} cp 要判断的棋子
   * @returns {Boolean}
   */
  hasSameSideWith(cp) {
    if(cp instanceof ChessPiece) {
      return cp.side === this.side;
    }
    return false;
  };

  /**
   * @param {Number} radius 棋子半径
   */
  draw(radius) {
    if(!radius || isNaN(radius) || radius < 0)
    throw new Error('【 ChessPiece.draw(radius) 棋子半径{radius}必须是正数 】');
    const chessPieceCvs = document.createElement('canvas');
    this.image = chessPieceCvs;
    this.radius = radius;
    const context = chessPieceCvs.getContext('2d');
    chessPieceCvs.width = radius * 2 + 2;
    chessPieceCvs.height = radius * 2 + 2;
    context.beginPath();
    context.arc(radius + 1, radius + 1, radius, 0, Math.PI * 2);
    context.stroke();
    context.save();
    context.fillStyle = '#FFFFCC';
    context.fill();
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = this.side;
    context.font = `${radius * 1.5}px 楷体`;
    context.fillText(this.name, radius + 1, radius + 1);
  };

  /**
   * 判断棋子是否可以在直线内移动
   * @param {Number} x 目标横坐标
   * @param {Number} y 目标纵坐标
   * @param {Number} chessPieces 棋子数组
   * @returns {Boolean} true or false
   */
  _canMoveInLineTo(x, y, chessPieces) {
    let start, end;
    if(this.x === x) {
      // 纵线移动
      start = this.y;
      end = y;
      (start > end) && ([start, end] = [end, start]);
      start ++;
      end --;
      while(start <= end) {
        if(this._getChessPieceAt(x, start++, chessPieces)) return false;
      }
      return true;
    }
    if(this.y === y) {
      // 横线移动
      start = this.x;
      end = x;
      (start > end) && ([start, end] = [end, start]);
      start ++;
      end --;
      while(start <= end) {
        if(this._getChessPieceAt(start++, y, chessPieces)) return false;
      }
      return true;
    }
    return false;
  };

  /**
   * 统计指定纵线上y范围[start, end]出现的棋子总数
   * @param {Number} x 横坐标
   * @param {Number} start 纵坐标开始（包含）
   * @param {Number} end 纵坐标结束（包含）
   * @param {Array} chessPieces 棋子数组
   * @returns {Number} 棋子总数
   */
  _countPiecesWithConstantX(x, start, end, chessPieces) {
    let count = 0;
    while(start <= end) {
      if(this._getChessPieceAt(x, start++, chessPieces)) count++;
    }
    return count;
  };

  /**
   * 统计指定横线上y范围[start, end]出现的棋子总数
   * @param {Number} start 横坐标开始（包含）
   * @param {Number} end 横坐标结束（包含）
   * @param {Number} y 纵坐标
   * @param {Object} chessPieces 棋子数组
   * @returns {Number} 棋子总数
   */
  _countPiecesWithConstantY(start, end, y, chessPieces) {
    let count = 0;
    while(start <= end) {
      if(this._getChessPieceAt(start++, y, chessPieces)) count++;
    }
    return count;
  };

  /**
   * 判断棋子是否可以移动到点（x, y）
   * @param {Number} x 横坐标
   * @param {Number} y 纵坐标
   * @param {Array} chessPieces
   * @returns {Boolean} 可以移动到指定点return true; else return false
   */
  _canMoveTo(x, y, chessPieces) {
    if(!Number.isInteger(x) || !Number.isInteger(y) || x < 1 || x > 9 || y < 1 || y >10) {
      return false;
    }
    const targetPointCP = this._getChessPieceAt(x, y, chessPieces);
    // 指定点处不能有己方棋子
    if(targetPointCP && this.hasSameSideWith(targetPointCP)) return false;
    if(this.name === '兵' || this.name === '卒') {
      if(this.y <= 5) {
        // 已经过河
        if((Math.abs(x - this.x) === 1 && this.y === y) || (this.x === x && this.y - 1 === y)) {
          return true;
        }
      }else {
        // 未过河
        if(this.x === x && this.y - 1 === y) {
          return true;
        }
      }
    }else if(this.name === '炮' || this.name === '砲') {
      if(!targetPointCP) {
        return this._canMoveInLineTo(x, y, chessPieces);
      }
      let gunMountCount = 0, start, end;
      if(this.x === x) {
        start = this.y;
        end = y;
        (start > end) && ([start, end] = [end, start]);
        start ++;
        end --;
        gunMountCount = this._countPiecesWithConstantX(x, start, end, chessPieces);
      }
      if(this.y === y) {
        start = this.x;
        end = x;
        (start > end) && ([start, end] = [end, start]);
        start ++;
        end --;
        gunMountCount = this._countPiecesWithConstantY(start, end, y, chessPieces);
      }
      return gunMountCount === 1;
    }else if(this.name === '车' || this.name === '車') {
      return this._canMoveInLineTo(x, y, chessPieces);
    }else if(this.name === '马' || this.name === '馬') {
      if(Math.abs(this.x - x) === 2 && Math.abs(this.y - y) === 1
          && !this._getChessPieceAt(Math.round((this.x + x) / 2), this.y, chessPieces) ) {
        return true;
      } else if(Math.abs(this.x - x) === 1 && Math.abs(this.y - y) === 2
          && !this._getChessPieceAt(this.x, Math.round((this.y + y) / 2), chessPieces) ) {
        return true;
      }
    }else if(this.name === '相' || this.name === '象') {
      if(y > 5 && Math.abs(this.y - y) === 2 && Math.abs(this.x - x) === 2
           && !this._getChessPieceAt(Math.round((this.x + x) / 2),
                        Math.round((this.y + y) / 2), chessPieces))
        return true;
    }else if(this.name === '士' || this.name === '仕') {
      // 棋子在中央可以向四角移动 或 棋子在四角可以向中央移动
      if((this.x === 5 && Math.abs(this.x - x) === 1 &&  Math.abs(this.y - y) === 1)
          || ((this.x === 4 || this.x === 6) && (x === 5 && y === 9))) {
        return true;
      }
    }else if(this.name === '帥' || this.name === '將') {
      if(((x > 3 && x < 7 && y > 7 && y < 11)
          && ((Math.abs(x - this.x) === 1 && this.y === y)
              || (Math.abs(y - this.y) === 1 && this.x === x)))){
        return true;
      }
    }else {
      throw new Error('【 游戏出现不可解析的数据 】');
    }
    return false;
  };

  /**
   * 获取指定坐标的棋子
   * @param {Number} x 横坐标
   * @param {Number} y 纵坐标
   * @param {Array} chessPieces 棋子数组
   * @return {ChessPiece} 指定的棋子 或 null
   */
  _getChessPieceAt(x, y, chessPieces) {
    if(!Number.isInteger(x) || !Number.isInteger(y) || x > 10 || x < 1 || y > 11 || y < 1) {
      return null;
    }
    for (let cp of chessPieces) {
      if(cp.x === x && cp.y === y) {
        return cp;
      }
    }
    return null;
  }

  /**
   * 将棋子移动到点（x, y）处
   * @param {Number} x 横坐标
   * @param {Number} y 纵坐标
   * @param {Array} chessPieces 棋子数组
   * @return {String} 'win' or 'moved' or 'notMoved'
   */
  moveTo(x, y, chessPieces) {
    let moveState = 'notMoved';
    if(this._canMoveTo(x, y, chessPieces)) {
      moveState = 'moved';
      for(let i = 0; i < chessPieces.length; i++) {
        const chessPiece = chessPieces[i];
        if(chessPieces.side === this.side || chessPiece === this) continue;
        if(chessPiece.x === x && chessPiece.y === y) {
          if(chessPiece.name === '帥' || chessPiece.name === '將') {
            console.log('win');
            moveState = 'win';
          }
          chessPieces.splice(i, 1);
          break;
        }
      }
      this.x = x;
      this.y = y;
      this.selected = false;
    }
    return moveState;
  }
}

export default ChessPiece;
