import baseFunction from "../utils/common";
/**
 * 基本牌类型
 */
const allPokerType = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
//牌类大小
const mainPokerSize = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', 'SMALL JOKER', 'BIG JOKER'];
/**
 * 牌组 54张
 *
 * 小丑
 * 黑桃♠
 * 红心♥
 * 梅花♣
 * 方块♦
 */

let mainPokerPackage = [
  {
    name: '小丑',
    icon: 'JOKER',
    pokerList: [
      {
        name: 'BIG JOKER',
        type: 'BIG JOKER'
      },
      {
        name: 'SMALL JOKER',
        type: 'SMALL JOKER'
      }
    ]
  },
  {
    name: '黑桃',
    icon: '♠',
    pokerList: []
  },
  {
    name: '红心',
    icon: '♥',
    pokerList: []
  },
  {
    name: '梅花',
    icon: '♣',
    pokerList: []
  },
  {
    name: '方块',
    icon: '♦',
    pokerList: []
  }
];
let mainAllPoker = [];
for (let i = 0; i < mainPokerPackage.length; i++) {
  if (i !== 0) {
    for (let j = 0; j < allPokerType.length; j++) {
      mainPokerPackage[i].pokerList.push({
        name: allPokerType[j] + mainPokerPackage[i].icon,
        type: allPokerType[j]
      });
    }
  }
  mainAllPoker.push(mainPokerPackage[i].pokerList.map(item => item.name));
}
mainAllPoker = baseFunction.flatten(mainAllPoker);

export default {mainPokerPackage, mainAllPoker, mainPokerSize};
