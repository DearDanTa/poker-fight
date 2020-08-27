<template>
  <div class="poker-main">
    <h2 class="poker-logo">斗锤子地主</h2>
    <el-card class="poker-base" v-loading="pokerLoading" :element-loading-text="pokerLoadingText">
      <div class="poker-base-get" v-if="!isOver">
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step title="基本牌组"></el-step>
          <el-step title="洗牌"></el-step>
          <el-step title="发牌"></el-step>
        </el-steps>
        <div class="step-active" v-if="active === 0">
          <p>54张基本牌组：</p>
          <p class="poker-list-item">{{mainPoker.toString().replace(/\,/g, '，')}}</p>
          <div class="step-active-btn">
            <el-button @click="goActive(1)" type="primary">进行洗牌</el-button>
          </div>
        </div>
        <div class="step-active" v-if="active === 1">
          <p>洗牌结果：
            <el-button @click="shuffling" type="primary">手动重新洗牌</el-button>
          </p>
          <p v-if="poker.length > 0">{{poker.toString().replace(/\,/g, '，')}}</p>
          <div class="step-active-btn">
            <el-button @click="goActive(0)">上一步</el-button>
            <el-button @click="goActive(2)" type="primary">选择这一副牌</el-button>
          </div>
        </div>
        <div class="step-active" v-if="active === 2">
          <p>玩家数量：
            <el-input-number v-model="player" controls-position="right" :min="2" :max="4" disabled></el-input-number>
          </p>
          <p>启动地主：
            <el-switch
              v-model="isBoss"
              active-text="有地主"
              inactive-text="无地主">
            </el-switch>
          </p>
          <div class="step-active-btn">
            <el-button @click="goActive(1)">上一步</el-button>
            <el-button @click="goPushPoker" type="primary">进行发牌</el-button>
          </div>
        </div>
      </div>
      <div class="poker-base-tips" v-if="isOver">
        <p v-if="!isBoss">无地主局 人数：{{player}}</p>
        <p v-if="isBoss">有地主局 人数：{{player}}</p>
        <p>发牌完毕</p>
        <p v-if="isBoss">地主：<span class="red-tips">{{boss}}</span></p>
        <p v-if="isBoss">地主牌：<span class="red-tips">{{bossSinglePoker}}</span>，3张底牌：<span class="red-tips">{{bossPoker.toString().replace(/\,/g, '，')}}</span>
        </p>
        <el-button @click="refresh" type="primary">重置牌局</el-button>
      </div>
    </el-card>
    <div class="left-player player-list">
      <div class="header">
        <h2>player1：地主</h2>
        <p>豆子：4000万</p>
      </div>
      <div class="poker-view">
        <p>牌数量：{{playerPokerList[0].pokerList.length}}</p>
        <p v-if="playerPokerList[0].pokerList.length > 0">{{playerPokerList[0].pokerList.toString().replace(/\,/g,
          '，')}}</p>
      </div>
    </div>
    <div class="right-player player-list">
      <div class="header">
        <h2>player2：阿姨</h2>
        <p>豆子：3990万</p>
      </div>
      <div class="poker-view">
        <p>牌数量：{{playerPokerList[1].pokerList.length}}</p>
        <p v-if="playerPokerList[1].pokerList.length > 0">{{playerPokerList[1].pokerList.toString().replace(/\,/g,
          '，')}}</p>
      </div>
    </div>
    <div class="bottom-player player-list">
      <div class="header">
        <h2>player3：卢本伟</h2>
        <p>豆子：3700万</p>
        <el-button @click="getCoffee">技能：给阿姨倒一杯卡布奇诺</el-button>
      </div>
      <div class="poker-view">
        <p>牌数量：{{playerPokerList[2].pokerList.length}}</p>
        <p v-if="playerPokerList[2].pokerList.length > 0">{{playerPokerList[2].pokerList.toString().replace(/\,/g,
          '，')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import mainData from "../config/config";
  import baseFunction from "../utils/common";

  export default {
    name: "poker",
    data() {
      return {
        poker: [],
        mainPoker: mainData.mainAllPoker,
        //发牌步骤
        active: 0,
        isOver: false,
        //玩家数
        player: 3,
        isBoss: false,
        boss: '',
        bossSinglePoker: '',
        bossPoker: [],
        //加载
        pokerLoading: false,
        pokerLoadingText: '',
        //用户数据
        playerPokerList: [
          {
            name: '地主',
            pokerList: []
          },
          {
            name: '阿姨',
            pokerList: []
          },
          {
            name: '卢本伟',
            pokerList: []
          }
        ]
      }
    },
    methods: {
      //洗牌
      shuffling() {
        this.poker = baseFunction.superShuffling(this.mainPoker);
      },
      //下一节点
      goActive(active) {
        if (this.active === 0) {
          this.shuffling();
        }
        this.active = active;
      },
      //发牌
      goPushPoker() {
        this.playerPokerList.forEach(item => {
          item.pokerList = [];
        });
        //开始发牌
        this.pokerLoading = true;
        let poker = JSON.parse(JSON.stringify(this.poker));
        if (this.isBoss) {
          this.bossPoker = poker.slice(poker.length - 3, poker.length);
          poker.splice(poker.length - 3, poker.length - 1);
          this.bossSinglePoker = poker[Math.floor(Math.random() * 52)];
        }
        for (let i = 0; i < poker.length; i++) {
          setTimeout(() => {
            for (let j = 0; j < this.playerPokerList.length; j++) {
              if (i % this.player === j) {
                this.playerPokerList[j].pokerList.push(poker[i]);
                this.pokerLoadingText = '正在发牌给：' + this.playerPokerList[j].name;
              }
              if (this.bossSinglePoker && this.bossPoker) {
                if (this.playerPokerList[j].pokerList.includes(this.bossSinglePoker) && !this.playerPokerList[j].pokerList.includes(this.bossPoker[0])) {
                  this.playerPokerList[j].pokerList.push(this.bossPoker);
                  this.playerPokerList[j].pokerList = baseFunction.flatten(this.playerPokerList[j].pokerList);
                  this.boss = this.playerPokerList[j].name;
                }
              }
              if (this.playerPokerList[j].pokerList.length >= 18) {
                this.pokerLoading = false;
                this.isOver = true;
              }
            }
          }, i * 100);
        }
      },
      //重置牌局
      refresh() {
        this.playerPokerList.forEach(item => {
          item.pokerList = [];
        });
        this.isOver = false;
        this.poker = [];
        this.isBoss = false;
        this.boss = '';
        this.bossSinglePoker = '';
        this.bossPoker = [];
        this.active = 0;
      },
      getCoffee() {
        this.$message.success('卢本伟给阿姨倒了一杯卡布奇诺')
      }
    }
  }
</script>

<style scoped lang="scss">
  .poker-main {
    width: 100%;
    height: 100%;
    position: relative;

    .poker-logo {
      margin: 0;
      padding-top: 10px;
      text-align: center;
    }

    .poker-base {
      width: 600px;
      height: 350px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -80%);

      /deep/ .el-card__body {
        height: 100%;
      }

      .poker-base-get {
        height: 100%;

        .step-active {
          width: 100%;
          height: calc(100% - 140px);
          position: relative;
          margin-top: 30px;

          .step-active-btn {
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }

      .red-tips {
        color: #f56c6c;
      }
    }

    .player-list {
      box-sizing: border-box;
      padding: 15px;

      .header {
        color: #ccc;
      }
    }


    .left-player {
      width: 300px;
      height: calc(100% - 200px);
      border-right: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 0;
    }

    .right-player {
      width: 300px;
      height: calc(100% - 200px);
      border-left: 1px solid #ccc;
      position: absolute;
      right: 0;
      top: 0;
    }

    .bottom-player {
      width: 100%;
      height: 200px;
      border-top: 1px solid #ccc;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;

      .poker-view {
        margin-left: 30px;
      }
    }
  }
</style>
